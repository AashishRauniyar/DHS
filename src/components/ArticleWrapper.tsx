/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import {
  useState,
  useEffect,
  useMemo
} from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { formatDistanceToNow } from "date-fns"
import { AlertCircle, User, Star, CheckCircle, XCircle, ChevronRight } from "lucide-react"
import { FAQBlock } from "./article-blocks/faq-block"
import Link from "next/link"

interface ArticleWrapperProps {
  slug?: string
}

export function ArticleWrapper({ slug: propSlug }: ArticleWrapperProps) {
  const params = useParams()
  const slug = propSlug || (params?.slug as string)

  const [article, setArticle] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch article data
  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) {
        setError("No article slug provided")
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)

        const response = await fetch(`/api/articles/${slug}`)

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Article not found")
          }
          throw new Error(`Failed to load article: ${response.status} ${response.statusText}`)
        }

        const data = await response.json()
        console.log("Fetched article data:", data)

        if (data.success && data.article) {
          setArticle(data.article)
        } else {
          throw new Error("Invalid article data received")
        }
      } catch (err) {
        console.error("Error fetching article:", err)
        setError(err instanceof Error ? err.message : "Failed to load article")
      } finally {
        setLoading(false)
      }
    }

    fetchArticle()
  }, [slug])

  // Flatten sections into blocks for easier processing
  const allBlocks = useMemo(() => {
    if (!article?.sections) return []

    return article.sections.flatMap((section: any) =>
      section.blocks.map((block: any) => ({
        ...block,
        sectionTitle: section.title,
        sectionOrder: section.order,
      })),
    )
  }, [article])

  // Organize content sections from the new section-based structure
  const organizedContent = useMemo(() => {
    if (!article?.sections) return []

    return article.sections
      .sort((a: any, b: any) => a.order - b.order)
      .map((section: any) => ({
        id: section.id,
        title: section.title,
        order: section.order,
        blocks: section.blocks.sort((a: any, b: any) => a.order - b.order),
        content: section.blocks.filter((block: any) => block.type === "paragraph"),
      }))
  }, [article])

  // Extract special blocks from all sections
  const specialBlocks = useMemo(() => {
    if (!allBlocks.length) return {}

    return {
      rating: allBlocks.find((block: any) => block.type === "rating"),
      prosCons: allBlocks.find((block: any) => block.type === "pros-cons"),
      ingredients: allBlocks.find((block: any) => block.type === "ingredients"),
      specifications: allBlocks.find((block: any) => block.type === "specifications"),
      faq: allBlocks.find((block: any) => block.type === "faq"),
      cta: allBlocks.filter((block: any) => block.type === "cta"),
    }
  }, [allBlocks])

  // Helper function to render stars
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
        ))}
        {hasHalfStar && <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />}
        {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
          <Star key={`empty-${i}`} className="h-5 w-5 text-gray-300" />
        ))}
        <span className="ml-2 font-semibold">{rating.toFixed(1)}</span>
      </div>
    )
  }

  // Get section by title (case insensitive)
  const getSectionByTitle = (titlePattern: string) => {
    return organizedContent.find((section: { title: string }) =>
      section.title.toLowerCase().includes(titlePattern.toLowerCase()),
    )
  }

  // Get content from a specific section
  const getSectionContent = (titlePattern: string) => {
    const section = getSectionByTitle(titlePattern)
    return section?.content || []
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="aspect-video w-full rounded-lg" />
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-600">Article not found</h1>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* HERO SECTION */}
      <header className="mb-6">
        <nav className="flex items-center space-x-2 text-xs md:text-sm text-gray-500 mb-2" aria-label="Breadcrumb">
          <Link href="/" className="hover:underline">Home</Link>
          <ChevronRight className="h-3 w-3 md:h-4 md:w-4" />
          <Link href="/ArticleListing" className="hover:underline">Articles</Link>
          {article.category && (
            <>
              <ChevronRight className="h-3 w-3 md:h-4 md:w-4" />
              <Link href={`/?category=${article.category.slug}`} className="hover:underline">{article.category.name}</Link>
            </>
          )}
        </nav>
        <div className="flex flex-col items-center text-center mb-4">
          <span className="inline-block bg-purple-100 text-purple-700 text-xs font-semibold rounded px-3 py-1 mb-2 uppercase tracking-wide">{article.category?.name}</span>
          <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-2" id="article-title">{article.title}</h1>
          <p className="text-base md:text-lg text-gray-600 mb-2 max-w-2xl" id="meta-description">{article.metaDescription || "Comprehensive review and analysis of this product."}</p>
          <div className="flex flex-wrap justify-center gap-2 text-xs md:text-sm text-gray-500 mb-2">
            <span>By {article.user?.name}</span>
            <span className="hidden md:inline">|</span>
            <span>{new Date(article.updatedAt).toLocaleDateString()}</span>
            <span className="hidden md:inline">|</span>
            <span>{article.readingTime} min read</span>
          </div>
        </div>
        {article.imageUrl && (
          <div className="mb-6 flex justify-center">
            <Image src={article.imageUrl || "/placeholder.svg"} alt={article.title} width={800} height={320} className="rounded-xl shadow-lg object-cover w-full max-w-3xl aspect-[16/6]" />
          </div>
        )}
      </header>

      {/* FLOATING PRODUCT CARD */}
      {specialBlocks.rating && (
        <aside className="relative z-10 mx-auto max-w-2xl w-full -mt-16 mb-8">
          <div className="rounded-2xl shadow-xl bg-white border border-gray-100 flex flex-col md:flex-row items-center p-6 gap-6">
            <div className="flex-shrink-0 w-28 h-28 md:w-36 md:h-36 rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center">
              {article.imageUrl ? (
                <Image src={article.imageUrl} alt={article.title} width={144} height={144} className="object-cover w-full h-full" />
              ) : (
                <span className="text-gray-400">No Image</span>
              )}
            </div>
            <div className="flex-1 flex flex-col items-center md:items-start">
              <h2 className="text-lg md:text-xl font-bold mb-1">{article.title}</h2>
              <div className="flex items-center gap-2 mb-1">{renderStars(specialBlocks.rating.overallRating || 4.5)}</div>
              <div className="flex flex-wrap gap-1 mb-2">
                {specialBlocks.prosCons?.pros?.slice(0, 2).map((pro: any) => (
                  <span key={pro.id} className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-medium">+ {pro.content}</span>
                ))}
                {specialBlocks.prosCons?.cons?.slice(0, 2).map((con: any) => (
                  <span key={con.id} className="bg-red-100 text-red-800 px-2 py-0.5 rounded text-xs font-medium">- {con.content}</span>
                ))}
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg font-bold text-green-600">{specialBlocks.rating.price || "$--.--"}</span>
                <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-semibold">Best Deal</span>
              </div>
              {specialBlocks.cta?.[0]?.ctaButtonText && (
                <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-2 px-6 rounded-xl shadow-lg transition-all" onClick={() => window.open(specialBlocks.cta[0].ctaButtonLink, "_blank")}>{specialBlocks.cta[0].ctaButtonText}</Button>
              )}
              <div className="flex gap-2 mt-2">
                {specialBlocks.rating.medicallyReviewed && <span className="flex items-center text-xs text-blue-600"><CheckCircle className="h-4 w-4 mr-1" />Medically Reviewed</span>}
                {specialBlocks.rating.factChecked && <span className="flex items-center text-xs text-green-600"><CheckCircle className="h-4 w-4 mr-1" />Fact Checked</span>}
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* TABLE OF CONTENTS */}
      {organizedContent.length > 1 && (
        <nav className="mb-8 p-4 bg-blue-50 rounded-xl border border-blue-100 max-w-3xl mx-auto" id="table-of-contents">
          <h2 className="text-base font-bold mb-3 text-blue-700 flex items-center gap-2"><span className="text-lg">🗂️</span> In This Article</h2>
          <ul className="flex flex-wrap gap-2">
            {organizedContent.map((section: any, idx: number) => (
              <li key={section.id}>
                <button className="text-blue-700 hover:underline text-xs md:text-sm font-medium" onClick={() => document.getElementById(`section-${section.id}`)?.scrollIntoView({ behavior: "smooth" })}>{idx + 1}. {section.title}</button>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* MAIN CONTENT */}
      <main className="space-y-10 md:space-y-16" id="main-content">
        {/* Overview Section */}
        {getSectionByTitle("overview") && (
          <section id={`section-${getSectionByTitle("overview")?.id}`} className="bg-blue-50 rounded-2xl p-6 md:p-10 shadow max-w-3xl mx-auto">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-blue-700 flex items-center gap-2"><span>📖</span> Overview</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              {getSectionContent("overview").map((block: any) => (
                <p key={block.id} className="mb-4">{block.content}</p>
              ))}
            </div>
          </section>
        )}

        {/* Rating Section */}
        {specialBlocks.rating && (
          <section id="rating-section" className="bg-gradient-to-r from-green-400 to-blue-400 rounded-2xl p-6 md:p-10 shadow max-w-3xl mx-auto text-white">
            <h2 className="text-xl md:text-2xl font-bold mb-4 flex items-center gap-2"><span>⭐</span> How Does It Rate?</h2>
            <div className="text-center mb-6">
              <div className="text-4xl font-extrabold mb-2">{specialBlocks.rating.overallRating || 4.5}</div>
              <div className="text-lg font-medium">Overall Score (out of 5)</div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {specialBlocks.rating.ratings &&
                Object.entries(specialBlocks.rating.ratings).map(([key, value]: [string, any]) => (
                  <div key={key} className="flex flex-col items-center bg-white/20 rounded-lg p-3">
                    <span className="font-semibold capitalize text-sm md:text-base">{key}</span>
                    <div className="flex items-center mt-1">{renderStars(value || 4.5)}</div>
                  </div>
                ))}
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-base font-semibold mb-2">Why This Product Leads the Market</h3>
                <ul className="list-disc pl-5 space-y-1 text-white/90">
                  {specialBlocks.rating.highlights?.map((highlight: any) => (
                    <li key={highlight.id}>{highlight.content}</li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-3 justify-center">
                {specialBlocks.cta.length > 0 && (
                  <Button className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-xl shadow-lg text-lg" onClick={() => window.open(specialBlocks.cta[0].ctaButtonLink, "_blank")}>{specialBlocks.cta[0].ctaButtonText || "SHOP NOW"}</Button>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Key Ingredients Section */}
        {getSectionByTitle("ingredients") && (
          <section id={`section-${getSectionByTitle("ingredients")?.id}`} className="bg-purple-50 rounded-2xl p-6 md:p-10 shadow max-w-3xl mx-auto">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-purple-700 flex items-center gap-2"><span>🧬</span> Scientifically-Proven Ingredients Analysis</h2>
            {specialBlocks.ingredients ? (
              <div className="space-y-6">
                {specialBlocks.ingredients.ingredientsList?.map((ingredient: any) => (
                  <div key={ingredient.id} className="flex flex-col md:flex-row gap-4 bg-white rounded-xl p-4 shadow border border-purple-100">
                    <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-purple-100 flex items-center justify-center">
                      <Image src={ingredient.imageUrl || "/placeholder.svg"} alt={ingredient.name} width={64} height={64} className="object-cover w-full h-full rounded-lg" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1 text-purple-800">{ingredient.name}</h3>
                      <p className="text-gray-700 mb-1">{ingredient.description}</p>
                      {ingredient.studyDescription && (
                        <p className="text-xs text-blue-600 italic">{ingredient.studyDescription}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="prose prose-lg max-w-none">
                {getSectionContent("ingredients").map((block: any) => (
                  <p key={block.id} className="text-gray-700 leading-relaxed mb-4">{block.content}</p>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Pros and Cons */}
        {specialBlocks.prosCons && (
          <section id="pros-cons-section" className="max-w-3xl mx-auto">
            <h2 className="text-xl md:text-2xl font-bold mb-4 flex items-center gap-2"><span>⚖️</span> Honest Pros & Cons Analysis</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Pros */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 shadow">
                <div className="flex items-center mb-4">
                  <div className="bg-green-500 text-white rounded-full p-2 mr-3">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-green-800">PROS</h3>
                </div>
                <ul className="space-y-3">
                  {specialBlocks.prosCons.pros?.map((pro: any) => (
                    <li key={pro.id} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{pro.content}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Cons */}
              <div className="bg-red-50 border border-red-200 rounded-xl p-6 shadow">
                <div className="flex items-center mb-4">
                  <div className="bg-red-500 text-white rounded-full p-2 mr-3">
                    <XCircle className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-red-800">CONS</h3>
                </div>
                <ul className="space-y-3">
                  {specialBlocks.prosCons.cons?.map((con: any) => (
                    <li key={con.id} className="flex items-start">
                      <XCircle className="h-5 w-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{con.content}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* Specifications Section */}
        {specialBlocks.specifications && (
          <section id="specifications-section" className="bg-indigo-50 rounded-2xl p-6 md:p-10 shadow max-w-3xl mx-auto">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-indigo-700 flex items-center gap-2"><span>📋</span> Complete Product Specifications</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-indigo-100">
                    <th className="px-4 py-2 text-left text-xs md:text-sm font-semibold text-indigo-700">Specification</th>
                    <th className="px-4 py-2 text-left text-xs md:text-sm font-semibold text-indigo-700">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {specialBlocks.specifications.specifications?.map((spec: any) => (
                    <tr key={spec.id} className="even:bg-white odd:bg-indigo-50">
                      <td className="px-4 py-2 font-medium text-gray-700 text-xs md:text-sm">{spec.name}</td>
                      <td className="px-4 py-2 text-gray-600 text-xs md:text-sm">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* All Other Sections in Order */}
        {organizedContent
          .filter(
            (section: { title: string }) =>
              !section.title.toLowerCase().includes("overview") &&
              !section.title.toLowerCase().includes("ingredients") &&
              !section.title.toLowerCase().includes("faq"),
          )
          .map((section: any) => (
            <section key={section.id} id={`section-${section.id}`} className="bg-white rounded-2xl p-6 md:p-10 shadow max-w-3xl mx-auto">
              <h2 className="text-xl md:text-2xl font-bold mb-4 text-blue-700">{section.title}</h2>
              <div className="prose prose-lg max-w-none">
                {section.blocks.map((block: any) => {
                  switch (block.type) {
                    case "paragraph":
                      return <p key={block.id} className="text-gray-700 leading-relaxed mb-4">{block.content}</p>
                    case "heading":
                      return <h3 key={block.id} className="text-xl font-semibold mb-3 mt-6">{block.content}</h3>
                    case "bullet-list":
                      return (
                        <ul key={block.id} className="list-disc pl-6 space-y-2">
                          {block.bulletPoints?.map((point: any) => <li key={point.id} className="text-gray-700">{point.content}</li>)}
                        </ul>
                      )
                    case "image":
                      return (
                        <div key={block.id} className="my-6">
                          <Image src={block.imageUrl || "/placeholder.svg"} alt={block.imageAlt || block.content || "Image"} width={600} height={400} className="w-full h-auto rounded-lg" />
                          {block.imageCaption && <p className="text-sm text-gray-500 text-center mt-2">{block.imageCaption}</p>}
                        </div>
                      )
                    case "cta":
                      return (
                        <div key={block.id} className="my-8 p-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl text-center shadow-lg">
                          {block.ctaText && <p className="mb-4 text-lg font-semibold">{block.ctaText}</p>}
                          {block.ctaButtonText && <Button className="bg-white text-blue-600 hover:bg-gray-100 font-bold" onClick={() => window.open(block.ctaButtonLink, "_blank")}>{block.ctaButtonText}</Button>}
                        </div>
                      )
                    default:
                      return null
                  }
                })}
              </div>
            </section>
          ))}

        {/* FAQ Section */}
        {specialBlocks.faq && (
          <section id="faq-section" className="bg-yellow-50 rounded-2xl p-6 md:p-10 shadow max-w-3xl mx-auto">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-yellow-700 flex items-center gap-2"><span>❓</span> Frequently Asked Questions</h2>
            <FAQBlock block={specialBlocks.faq} />
          </section>
        )}
      </main>

      {/* CTA (repeated at end) */}
      {specialBlocks.cta?.[0] && (
        <div className="my-12 text-center">
          <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg text-lg" onClick={() => window.open(specialBlocks.cta[0].ctaButtonLink, "_blank")}>{specialBlocks.cta[0].ctaButtonText}</Button>
        </div>
      )}

      {/* Author Bio */}
      {article.user && (
        <aside className="mt-12 mb-8 flex items-center gap-4 bg-gray-50 rounded-xl p-6 max-w-3xl mx-auto shadow" id="author-bio">
          <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
            <User className="h-8 w-8 text-gray-600" />
          </div>
          <div>
            <p className="font-semibold text-gray-900">{article.user.name}</p>
            <p className="text-sm text-gray-500">Editor</p>
            <p className="text-xs text-gray-400">{article.user.email}</p>
          </div>
        </aside>
      )}

      {/* Related Articles (placeholder) */}
      <aside className="mt-12 mb-8" id="related-articles">
        <h3 className="text-lg font-semibold mb-4">Related Articles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* TODO: Map related articles here */}
          <div className="bg-white border rounded-lg p-4">Coming soon...</div>
        </div>
      </aside>

      {/* Comments (placeholder) */}
      <section className="mt-12 mb-8" id="comments-section">
        <h3 className="text-lg font-semibold mb-4">Comments</h3>
        <div className="bg-white border rounded-lg p-4">Coming soon...</div>
      </section>

      {/* Sidebar (desktop)/Below content (mobile) (placeholder) */}
      <aside className="hidden lg:block fixed right-0 top-24 w-80 p-6 bg-gray-50 border-l border-gray-200 h-full overflow-y-auto" id="sidebar">
        <div className="mb-6">
          <input type="text" placeholder="Search..." className="w-full px-3 py-2 border rounded" />
        </div>
        <div className="mb-6">
          <h4 className="font-semibold mb-2">Categories</h4>
          {/* TODO: Map categories here */}
          <div>Coming soon...</div>
        </div>
        <div className="mb-6">
          <h4 className="font-semibold mb-2">Newsletter</h4>
          <div>Coming soon...</div>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Product Highlights</h4>
          <div>Coming soon...</div>
        </div>
      </aside>

      {/* Footer */}
      <footer className="mt-12 pt-8 border-t border-gray-200 text-center text-xs md:text-sm text-gray-500" id="footer">
        <p>Last updated: {formatDistanceToNow(new Date(article.updatedAt))} ago</p>
        <p className="mt-2">{article.wordCount} words • {article.readingTime} min read • {organizedContent.length} sections</p>
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          <Link href="/PrivacyPolicy" className="hover:underline">Privacy Policy</Link>
          <Link href="/Terms" className="hover:underline">Terms</Link>
          <Link href="/ContactUs" className="hover:underline">Contact</Link>
        </div>
      </footer>
    </div>
  )
}
