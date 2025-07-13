/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import {
  useState,
  useEffect,
  useMemo,
  type JSXElementConstructor,
  type Key,
  type ReactElement,
  type ReactNode,
  type ReactPortal,
} from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { formatDistanceToNow } from "date-fns"
import { AlertCircle, User, Star, CheckCircle, XCircle, ChevronRight, Award, Shield } from "lucide-react"
import { FAQBlock } from "./article-blocks/faq-block"

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
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
        <span>Home</span>
        <ChevronRight className="h-4 w-4" />
        <span>Reviews</span>
        <ChevronRight className="h-4 w-4" />
        {article.category && (
          <>
            <ChevronRight className="h-4 w-4" />
            <span>{article.category.name}</span>
          </>
        )}
      </nav>

      {/* Article Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-4 leading-tight text-gray-900">{article.title}</h1>

        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
          {article.metaDescription || "Comprehensive review and analysis of this product."}
        </p>

        {/* Author and Meta Info */}
        <div className="bg-blue-50 rounded-lg p-6 mb-8">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-gray-600" />
              </div>
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-6">
                <div>
                  <p className="font-semibold text-gray-900">Written By</p>
                  <p className="text-blue-600 font-medium">{article.user?.name}</p>
                  <p className="text-sm text-gray-500">Reviewed by Dr. Jane Doe, M.D., Ph.D.</p>
                  <p className="text-sm text-gray-500">Updated: {new Date(article.updatedAt).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-500">Reading time: {article.readingTime} minutes</p>
                </div>

                {specialBlocks.rating && (
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {specialBlocks.rating.overallRating || 4.5}
                      </div>
                      <div className="text-sm text-gray-500">Overall Rating</div>
                      {renderStars(specialBlocks.rating.overallRating || 4.5)}
                    </div>

                    <div className="text-center">
                      <Award className="h-8 w-8 text-yellow-500 mx-auto mb-1" />
                      <div className="text-sm font-medium">Specs</div>
                    </div>

                    <div className="text-center">
                      <Shield className="h-8 w-8 text-green-500 mx-auto mb-1" />
                      <div className="text-sm font-medium">Write a Review</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Review Navigation */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h3 className="font-semibold text-lg mb-4">In This Review</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {organizedContent.slice(0, 12).map(
              (
                section: {
                  id: Key | null | undefined
                  title:
                    | string
                    | number
                    | bigint
                    | boolean
                    | ReactElement<unknown, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | ReactPortal
                    | Promise<
                        | string
                        | number
                        | bigint
                        | boolean
                        | ReactPortal
                        | ReactElement<unknown, string | JSXElementConstructor<any>>
                        | Iterable<ReactNode>
                        | null
                        | undefined
                      >
                    | null
                    | undefined
                },
                index: number,
              ) => (
                <Badge
                  key={section.id}
                  variant="outline"
                  className="cursor-pointer hover:bg-blue-50 text-xs p-2 justify-start"
                  onClick={() => {
                    const element = document.getElementById(`section-${section.id}`)
                    element?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  {index + 1}. {section.title}
                </Badge>
              ),
            )}
          </div>
        </div>
      </header>

      {/* Featured Image */}
      {article.imageUrl && (
        <div className="mb-8">
          <Image
            src={article.imageUrl || "/placeholder.svg"}
            alt={article.title}
            width={800}
            height={400}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      )}

      {/* Main Content */}
      <div className="space-y-12">
        {/* Overview Section */}
        {getSectionByTitle("overview") && (
          <section id={`section-${getSectionByTitle("overview")?.id}`}>
            <h2 className="text-2xl font-bold mb-6 text-blue-600">Overview</h2>
            <div className="prose prose-lg max-w-none">
              {getSectionContent("overview").map((block: any) => (
                <p key={block.id} className="text-gray-700 leading-relaxed mb-4">
                  {block.content}
                </p>
              ))}
            </div>
          </section>
        )}

        {/* Rating Section */}
        {specialBlocks.rating && (
          <section id="rating-section">
            <h2 className="text-2xl font-bold mb-6">How Does It Rate?</h2>
            <div className="bg-blue-600 text-white p-6 rounded-lg mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">
                  Overall Rating: {specialBlocks.rating.overallRating || 4.5}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                {specialBlocks.rating.ratings &&
                  Object.entries(specialBlocks.rating.ratings).map(([key, value]: [string, any]) => (
                    <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span className="font-medium capitalize">{key}</span>
                      <div className="flex items-center">{renderStars(value || 4.5)}</div>
                    </div>
                  ))}
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-blue-600">Brand Highlights</h3>
                <ul className="space-y-2">
                  {specialBlocks.rating.highlights?.map((highlight: any) => (
                    <li key={highlight.id} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{highlight.content}</span>
                    </li>
                  ))}
                </ul>

                {specialBlocks.cta.length > 0 && (
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3">
                    {specialBlocks.cta[0].ctaButtonText || "SHOP NOW"}
                  </Button>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Key Ingredients Section */}
        {getSectionByTitle("ingredients") && (
          <section id={`section-${getSectionByTitle("ingredients")?.id}`}>
            <h2 className="text-2xl font-bold mb-6">Key Ingredients</h2>
            {specialBlocks.ingredients ? (
              <div className="space-y-6">
                {specialBlocks.ingredients.ingredientsList?.map((ingredient: any) => (
                  <div key={ingredient.id} className="border rounded-lg p-4">
                    <h3 className="font-semibold text-lg mb-2">{ingredient.name}</h3>
                    <p className="text-gray-700 mb-2">{ingredient.description}</p>
                    {ingredient.studyDescription && (
                      <p className="text-sm text-blue-600 italic">{ingredient.studyDescription}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="prose prose-lg max-w-none">
                {getSectionContent("ingredients").map((block: any) => (
                  <p key={block.id} className="text-gray-700 leading-relaxed mb-4">
                    {block.content}
                  </p>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Pros and Cons */}
        {specialBlocks.prosCons && (
          <section id="pros-cons-section">
            <h2 className="text-2xl font-bold mb-6">Pros and Cons</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Pros */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
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
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
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
          <section id="specifications-section">
            <h2 className="text-2xl font-bold mb-6">Specifications</h2>
            <div className="overflow-x-auto bg-white rounded-lg shadow">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left">Specification</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {specialBlocks.specifications.specifications?.map((spec: { id: Key | null | undefined; name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; value: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined }) => (
                    <tr key={spec.id}>
                      <td className="border border-gray-300 px-4 py-2 font-medium">{spec.name}</td>
                      <td className="border border-gray-300 px-4 py-2">{spec.value}</td>
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
          .map(
            (section: {
              id: Key | null | undefined
              title:
                | string
                | number
                | bigint
                | boolean
                | ReactElement<unknown, string | JSXElementConstructor<any>>
                | Iterable<ReactNode>
                | ReactPortal
                | Promise<
                    | string
                    | number
                    | bigint
                    | boolean
                    | ReactPortal
                    | ReactElement<unknown, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | null
                    | undefined
                  >
                | null
                | undefined
              blocks: any[]
            }) => (
              <section key={section.id} id={`section-${section.id}`}>
                <div className="prose prose-lg max-w-none">
                  {section.blocks.map((block: any) => {
                    switch (block.type) {
                      case "paragraph":
                        return (
                          <p key={block.id} className="text-gray-700 leading-relaxed mb-4">
                            {block.content}
                          </p>
                        )
                      case "heading":
                        return (
                          <h3 key={block.id} className="text-xl font-semibold mb-3 mt-6">
                            {block.content}
                          </h3>
                        )
                      case "bullet-list":
                        return (
                          <div key={block.id} className="my-6">
                            {block.bulletPoints && block.bulletPoints.length > 0 && (
                              <ul className="space-y-3 bg-gray-50 rounded-lg p-6">
                                {block.bulletPoints
                                  .sort((a: any, b: any) => a.order - b.order)
                                  .map((bulletPoint: any) => (
                                    <li key={bulletPoint.id} className="flex items-start">
                                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                      <span className="text-gray-700 leading-relaxed">{bulletPoint.content}</span>
                                    </li>
                                  ))}
                              </ul>
                            )}
                          </div>
                        )
                      case "image":
                        return (
                          <div key={block.id} className="my-6">
                            <Image
                              src={block.imageUrl || "/placeholder.svg"}
                              alt={block.imageAlt || block.content || "Image"}
                              width={600}
                              height={400}
                              className="w-full h-auto rounded-lg"
                            />
                            {block.imageCaption && (
                              <p className="text-sm text-gray-500 text-center mt-2">{block.imageCaption}</p>
                            )}
                          </div>
                        )
                      case "cta":
                        return (
                          <div key={block.id} className="my-8 p-6 bg-blue-600 text-white rounded-lg text-center">
                            {block.ctaText && <p className="mb-4 text-lg">{block.ctaText}</p>}
                            {block.ctaButtonText && (
                              <Button
                                className="bg-white text-blue-600 hover:bg-gray-100"
                                onClick={() => window.open(block.ctaButtonLink, "_blank")}
                              >
                                {block.ctaButtonText}
                              </Button>
                            )}
                          </div>
                        )
                      default:
                        return null
                    }
                  })}
                </div>
              </section>
            ),
          )}

        {/* FAQ Section */}
        {specialBlocks.faq && (
          <section id="faq-section">
            <h2 className="text-2xl font-bold mb-6 text-blue-600">Frequently Asked Questions</h2>
            <FAQBlock block={specialBlocks.faq} />
          </section>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-12 pt-8 border-t border-gray-200">
        <div className="text-center">
          <p className="text-gray-600">Last updated: {formatDistanceToNow(new Date(article.updatedAt))} ago</p>
          <p className="text-sm text-gray-500 mt-2">
            {article.wordCount} words • {article.readingTime} minute read • {organizedContent.length} sections
          </p>
        </div>
      </footer>
    </div>
  )
}
