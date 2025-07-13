import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArticleWrapper } from "@/components/ArticleWrapper"
import type { Article } from "@/types/article"
import { ArrowLeft, Edit } from "lucide-react"

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

      {/* Use ArticleWrapper for consistent rendering */}
      <ArticleWrapper slug={resolvedParams.slug} />
    </main>
  )
}
