/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Star, StarHalf, ExternalLink, Info } from "lucide-react"
import type { Section, Block } from "@/types/article"
import type { JSX } from "react/jsx-runtime"

interface ArticleRendererProps {
  sections?: Section[] // Updated to accept sections
  blocks?: Block[] // Keep for backward compatibility
}

export function ArticleRenderer({ sections, blocks }: ArticleRendererProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({})

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  // Convert sections to flat blocks for processing, or use provided blocks
  const allBlocks = sections ? sections.flatMap((section) => section.blocks) : blocks || []

  // Generate table of contents from sections or blocks
  const tableOfContents = sections
    ? sections.map((section) => ({
        id: section.id,
        title: section.title,
      }))
    : allBlocks
        .filter((block) => block.type === "heading" && block.level === 2)
        .map((block) => ({
          id: block.id,
          title: block.content || "Untitled Section",
        }))

  // Helper function to render star ratings
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    const stars = []

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="w-5 h-5 fill-yellow-400 text-yellow-400" />)
    }

    const emptyStars = 5 - stars.length
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />)
    }

    return stars
  }

  // Calculate overall rating if rating block exists
  const ratingBlock = allBlocks.find((block) => block.type === "rating")
  const ratings = ratingBlock?.ratings
  const overallRating =
    ratings && Object.keys(ratings).length > 0
      ? ((Object.values(ratings).reduce((sum: number, val: any) => sum + (val || 0), 0) /
          Object.keys(ratings).length) as number)
      : 0

  // Render a single block
  const renderBlock = (block: Block) => {
    switch (block.type) {
      case "heading":
        const HeadingTag = `h${block.level || 2}` as keyof JSX.IntrinsicElements
        return (
          <div key={block.id} id={block.id} className="scroll-mt-16 mb-4">
            <HeadingTag
              className={`font-bold ${
                block.level === 1
                  ? "text-3xl mb-6"
                  : block.level === 2
                    ? "text-2xl mb-4 pb-2 border-b border-gray-200 dark:border-gray-700"
                    : "text-xl mb-3"
              }`}
            >
              {block.content}
            </HeadingTag>
          </div>
        )

      case "paragraph":
        return (
          <div key={block.id} className="mb-6">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{block.content}</p>
          </div>
        )

      case "image":
        return (
          <div key={block.id} className="mb-8">
            <div className="rounded-lg overflow-hidden">
              <Image
                src={block.imageUrl || "/placeholder.svg"}
                alt={block.imageAlt || block.content || "Image"}
                width={800}
                height={450}
                className="w-full h-auto"
              />
            </div>
            {block.imageCaption && (
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center">{block.imageCaption}</p>
            )}
          </div>
        )

      case "list":
        const items = (block.content || "").split("\n").filter(Boolean)
        return (
          <div key={block.id} className="mb-6">
            {block.listType === "ordered" ? (
              <ol className="list-decimal pl-6 space-y-2">
                {items.map((item, i) => (
                  <li key={i} className="text-gray-700 dark:text-gray-300">
                    {item}
                  </li>
                ))}
              </ol>
            ) : (
              <ul className="list-disc pl-6 space-y-2">
                {items.map((item, i) => (
                  <li key={i} className="text-gray-700 dark:text-gray-300">
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )

      case "bullet-list":
        return (
          <div key={block.id} className="mb-6">
            <ul className="list-disc pl-6 space-y-2">
              {block.bulletPoints?.map((point) => (
                <li key={point.id} className="text-gray-700 dark:text-gray-300">
                  {point.content}
                </li>
              ))}
            </ul>
          </div>
        )

      case "quote":
        return (
          <div key={block.id} className="mb-6">
            <blockquote className="border-l-4 border-blue-500 pl-4 py-2 italic text-gray-700 dark:text-gray-300">
              {block.content}
              {block.author && <footer className="mt-2 text-sm font-medium">— {block.author}</footer>}
            </blockquote>
          </div>
        )

      case "code":
        return (
          <div key={block.id} className="mb-6">
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
              <code className="text-sm font-mono">{block.content}</code>
            </pre>
          </div>
        )

      case "pros-cons":
        return (
          <div key={block.id} className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pros */}
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-100 dark:border-green-800">
                <h3 className="text-lg font-bold text-green-800 dark:text-green-300 mb-3 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Pros
                </h3>
                <ul className="space-y-2">
                  {block.pros?.map((pro) => (
                    <li key={pro.id} className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{pro.content}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cons */}
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-100 dark:border-red-800">
                <h3 className="text-lg font-bold text-red-800 dark:text-red-300 mb-3 flex items-center">
                  <XCircle className="w-5 h-5 mr-2" />
                  Cons
                </h3>
                <ul className="space-y-2">
                  {block.cons?.map((con) => (
                    <li key={con.id} className="flex items-start">
                      <XCircle className="w-4 h-4 text-red-600 dark:text-red-400 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{con.content}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )

      case "ingredients":
        return (
          <div key={block.id} className="mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold">{block.productName || "Ingredients"}</h3>
                {block.ingredientsIntroduction && (
                  <p className="mt-2 text-gray-700 dark:text-gray-300">{block.ingredientsIntroduction}</p>
                )}
              </div>

              <div className="p-4">
                {block.ingredientsList?.map((ingredient) => (
                  <div
                    key={ingredient.id}
                    className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700 last:border-0 last:mb-0 last:pb-0"
                  >
                    <div className="flex flex-col md:flex-row gap-4">
                      {ingredient.imageUrl && (
                        <div className="w-full md:w-1/4 flex-shrink-0">
                          <div className="rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                            <Image
                              src={ingredient.imageUrl || "/placeholder.svg"}
                              alt={ingredient.name}
                              width={200}
                              height={200}
                              className="w-full h-auto object-cover"
                            />
                          </div>
                        </div>
                      )}
                      <div className="flex-grow">
                        <h4 className="text-lg font-bold mb-2">{ingredient.name}</h4>
                        <p className="text-gray-700 dark:text-gray-300 mb-3">{ingredient.description}</p>
                        {(ingredient.studyYear || ingredient.studySource || ingredient.studyDescription) && (
                          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                            <div className="flex items-center mb-2">
                              <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 mr-2" />
                              <span className="font-medium text-blue-800 dark:text-blue-300">Research</span>
                            </div>
                            {ingredient.studyDescription && (
                              <p className="text-sm mb-1">{ingredient.studyDescription}</p>
                            )}
                            {(ingredient.studyYear || ingredient.studySource) && (
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                {ingredient.studySource}
                                {ingredient.studyYear && ingredient.studySource && ", "}
                                {ingredient.studyYear}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case "faq":
        return (
          <div key={block.id} className="mb-8">
            <div className="space-y-4">
              {block.faqItems?.map((faq) => (
                <div
                  key={faq.id}
                  className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4"
                >
                  <h4 className="font-bold text-lg mb-2">{faq.question}</h4>
                  <p className="text-gray-700 dark:text-gray-300">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )

      case "specifications":
        return (
          <div key={block.id} className="mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold">Specifications</h3>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {block.specifications?.map((spec) => (
                    <div
                      key={spec.id}
                      className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700 last:border-0"
                    >
                      <span className="font-medium">{spec.name}:</span>
                      <span className="text-gray-700 dark:text-gray-300">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      case "rating":
        // Skip here as we already display the overall rating at the top
        if (block.highlights?.length) {
          return (
            <div key={block.id} className="mb-8">
              <h3 className="text-xl font-bold mb-4">Brand Highlights</h3>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
                <ul className="space-y-3">
                  {block.highlights.map((highlight) => (
                    <li key={highlight.id} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{highlight.content}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )
        }
        return null

      case "cta":
        return (
          <div
            key={block.id}
            className="mb-8 p-6 rounded-lg text-center"
            style={{ backgroundColor: block.backgroundColor || "#2563eb" }}
          >
            <div className="max-w-2xl mx-auto">
              {block.ctaText && <p className="text-white text-lg mb-4 font-medium">{block.ctaText}</p>}
              {block.ctaButtonText && block.ctaButtonLink && (
                <Button
                  asChild
                  className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-6 rounded-full shadow-lg"
                >
                  <a href={block.ctaButtonLink} target="_blank" rel="noopener noreferrer">
                    {block.ctaButtonText}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="article-content">
      {/* Medical Verification Badges */}
      {allBlocks.some((block) => block.medicallyReviewed || block.factChecked) && (
        <div className="flex flex-wrap gap-4 mb-6">
          {allBlocks.some((block) => block.medicallyReviewed) && (
            <div className="flex items-center text-sm text-blue-600">
              <div className="w-5 h-5 mr-2 rounded-full bg-blue-100 flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-blue-600" />
              </div>
              <span>Medically Reviewed</span>
            </div>
          )}
          {allBlocks.some((block) => block.factChecked) && (
            <div className="flex items-center text-sm text-green-600">
              <div className="w-5 h-5 mr-2 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <span>Fact Checked</span>
            </div>
          )}
        </div>
      )}

      {/* Table of Contents */}
      {tableOfContents.length > 0 && (
        <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-bold mb-3">In This Review</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {tableOfContents.map((item, index) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-blue-600 dark:text-blue-400 hover:underline flex items-center"
              >
                <span className="mr-2 text-sm">{index + 1}.</span>
                {item.title}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Overall Rating Display (if rating block exists) */}
      {ratingBlock && overallRating > 0 && (
        <div className="mb-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold mb-2">Overall Rating</h2>
              <div className="flex items-center gap-2">
                <div className="flex">{renderStars(overallRating)}</div>
                <span className="text-2xl font-bold">{overallRating.toFixed(1)}/5</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {ratings?.effectiveness && (
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-medium min-w-[100px]">Effectiveness:</span>
                  <div className="flex">{renderStars(ratings.effectiveness)}</div>
                </div>
              )}
              {ratings?.ingredients && (
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-medium min-w-[100px]">Ingredients:</span>
                  <div className="flex">{renderStars(ratings.ingredients)}</div>
                </div>
              )}
              {ratings?.value && (
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-medium min-w-[100px]">Value:</span>
                  <div className="flex">{renderStars(ratings.value)}</div>
                </div>
              )}
              {ratings?.safety && (
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-medium min-w-[100px]">Safety:</span>
                  <div className="flex">{renderStars(ratings.safety)}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Render content by sections or flat blocks */}
      {sections
        ? // Render by sections
          sections.map((section) => (
            <div key={section.id} className="mb-8">
              <div className="mb-4">
                <h2 className="text-2xl font-bold pb-2 border-b border-gray-200 dark:border-gray-700">
                  {section.title}
                </h2>
              </div>
              <div className="space-y-4">{section.blocks.map((block) => renderBlock(block))}</div>
            </div>
          ))
        : // Render flat blocks for backward compatibility
          allBlocks.map((block) => renderBlock(block))}
    </div>
  )
}
