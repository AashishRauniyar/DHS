import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArticleRenderer } from "@/components/article-renderer"
import type { Article } from "@/types/article"
import Image from "next/image"
import { User, Calendar, Folder, ArrowLeft, Edit, Clock, FileText } from "lucide-react"

async function getArticle(slug: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/articles/${slug}`, {
    cache: "no-store",
  })

  if (!res.ok) {
    return null
  }

  const data = await res.json()
  return data.success ? data.article : null
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const article: Article | null = await getArticle(resolvedParams.slug)

  if (!article) {
    notFound()
  }

  // Calculate reading time from sections
  const calculateReadingTime = () => {
    if (!article.sections) return 1

    const totalWords = article.sections.reduce((total, section) => {
      return (
        total +
        section.blocks.reduce((sectionTotal, block) => {
          if (block.content && typeof block.content === "string") {
            return sectionTotal + block.content.split(/\s+/).filter((word) => word.length > 0).length
          }
          return sectionTotal
        }, 0)
      )
    }, 0)

    return Math.max(1, Math.ceil(totalWords / 200))
  }

  // Calculate total word count
  const calculateWordCount = () => {
    if (!article.sections) return 0

    return article.sections.reduce((total, section) => {
      return (
        total +
        section.blocks.reduce((sectionTotal, block) => {
          if (block.content && typeof block.content === "string") {
            return sectionTotal + block.content.split(/\s+/).filter((word) => word.length > 0).length
          }
          return sectionTotal
        }, 0)
      )
    }, 0)
  }

  const readingTime = article.readingTime || calculateReadingTime()
  const wordCount = article.wordCount || calculateWordCount()
  const sectionCount = article.sections?.length || 0

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4 max-w-6xl">
          <div className="flex justify-between items-center">
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to articles
            </Link>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/admin/articles/edit/${resolvedParams.slug}`}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Article
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Featured Image */}
        {article.imageUrl && (
          <div className="aspect-video w-full overflow-hidden rounded-xl mb-8 shadow-lg">
            <Image
              src={article.imageUrl || "/placeholder.svg"}
              alt={article.title}
              width={1200}
              height={675}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        )}

        {/* Article Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 mb-8 shadow-sm border border-gray-200 dark:border-gray-700">
          {/* Category Badge */}
          {article.category && (
            <div className="mb-4">
              <Badge variant="secondary" className="inline-flex items-center gap-1">
                <Folder className="w-3 h-3" />
                {article.category.name}
              </Badge>
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Meta Description */}
          {article.metaDescription && (
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{article.metaDescription}</p>
          )}

          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-300">
            {/* Author */}
            {article.user && (
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="font-medium">{article.user.name}</span>
                {article.user.role === "ADMINISTRATOR" && (
                  <Badge variant="outline" className="text-xs">
                    Admin
                  </Badge>
                )}
              </div>
            )}

            {/* Publish Date */}
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>
                {new Date(article.publishDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            {/* Reading Time */}
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{readingTime} min read</span>
            </div>

            {/* Word Count */}
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>{wordCount.toLocaleString()} words</span>
            </div>

            {/* Section Count */}
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>{sectionCount} sections</span>
            </div>
          </div>

          {/* Keywords */}
          {article.keywords && article.keywords.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap gap-2">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mr-2">Keywords:</span>
                {article.keywords.slice(0, 5).map((keyword, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {typeof keyword === "string" ? keyword : keyword.keyword}
                  </Badge>
                ))}
                {article.keywords.length > 5 && (
                  <Badge variant="outline" className="text-xs">
                    +{article.keywords.length - 5} more
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Table of Contents */}
        {article.sections && article.sections.length > 1 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-8 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Table of Contents</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {article.sections.map((section, index) => (
                <a
                  key={section.id}
                  href={`#section-${section.id}`}
                  className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                    {(index + 1).toString().padStart(2, "0")}.
                  </span>
                  <span className="truncate">{section.title}</span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Article Content */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-8">
            <ArticleRenderer sections={article.sections} />
          </div>
        </div>

        {/* Article Footer */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <div className="flex flex-wrap items-center gap-4">
                <span>
                  Last updated:{" "}
                  {new Date(article.updatedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                {article.seo?.seoScore && <span>SEO Score: {article.seo.seoScore}/100</span>}
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/articles">View All Articles</Link>
              </Button>

              {article.category && (
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/articles?category=${article.category.slug}`}>More in {article.category.name}</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
