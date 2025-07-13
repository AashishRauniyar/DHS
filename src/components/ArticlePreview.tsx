/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArticleRenderer } from "@/components/article-renderer"
import type { Block } from "@/types/article"
import Image from "next/image"
import { CheckCircle, Eye, Star, StarHalf } from "lucide-react"

interface ArticlePreviewProps {
  title: string
  imageUrl?: string
  blocks: Block[]
  publishDate: Date
  isNew?: boolean
  author?: {
    name: string
    role: string
  }
  category?: {
    name: string
    slug: string
  }
  metaDescription?: string
  focusKeyword?: string
  readingTime?: number
}

export function ArticlePreview({
  title,
  imageUrl,
  blocks,
  publishDate,
  isNew = false,
  author,
  category,
  metaDescription,
  focusKeyword,
  readingTime,
}: ArticlePreviewProps) {
  // Calculate reading time if not provided
  const calculateReadingTime = () => {
    if (readingTime) return readingTime

    const wordCount = blocks
      .filter((block) => block.content)
      .reduce((count, block) => {
        return count + (block.content?.split(" ").length || 0)
      }, 0)

    return Math.max(1, Math.ceil(wordCount / 200)) // 200 words per minute
  }

  const estimatedReadingTime = calculateReadingTime()

  // Calculate word count
  const wordCount = blocks
    .filter((block) => block.content)
    .reduce((count, block) => count + (block.content?.split(" ").length || 0), 0)

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
  const ratingBlock = blocks.find((block) => block.type === "rating")
  const ratings = ratingBlock?.ratings
  const overallRating =
    ratings && Object.keys(ratings).length > 0
      ? ((Object.values(ratings).reduce((sum: number, val: any) => sum + (val || 0), 0) /
          Object.keys(ratings).length) as number)
      : 0

  // Find medical review info
  const medicallyReviewed = blocks.some((block) => block.medicallyReviewed)
  const factChecked = blocks.some((block) => block.factChecked)

  return (
    <div className="max-w-4xl mx-auto">
      {/* Preview Header */}
      <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <div className="flex items-center gap-2 mb-2">
          <Eye className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <span className="text-sm font-medium text-blue-800 dark:text-blue-200">Article Preview</span>
        </div>
        <p className="text-xs text-blue-600 dark:text-blue-400">
          This is how your article will appear to readers. Switch back to edit mode to make changes.
        </p>
      </div>

      {/* Article Content */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          {/* Article Header */}
          <div className="p-8 pb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
              {title || "Untitled Article"}
            </h1>

            {/* Meta Description */}
            {metaDescription && (
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">{metaDescription}</p>
            )}

            {/* Author and Review Info */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
              {/* Author Info */}
              {author && (
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden flex-shrink-0">
                    <div className="w-full h-full flex items-center justify-center bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-lg font-bold">
                      {author.name.charAt(0)}
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      Written By <span className="text-blue-600 dark:text-blue-400">{author.name}</span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {author.role === "ADMINISTRATOR" ? "Senior Editor" : "Health Writer"}
                    </div>
                  </div>
                </div>
              )}

              {/* Review Info */}
              <div className="flex flex-col sm:ml-auto">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {isNew ? "Published" : "Updated"}: {publishDate.toLocaleDateString()}
                </div>
                {medicallyReviewed && (
                  <div className="flex items-center text-sm text-blue-600 dark:text-blue-400">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Medically Reviewed
                  </div>
                )}
                {factChecked && (
                  <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Fact Checked
                  </div>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Reading Time */}
              <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{estimatedReadingTime}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Min Read</div>
              </div>

              {/* Overall Rating */}
              {overallRating > 0 && (
                <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg text-center">
                  <div className="flex justify-center">{renderStars(overallRating)}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Overall Rating</div>
                </div>
              )}

              {/* Word Count */}
              <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{wordCount}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Words</div>
              </div>

              {/* Category */}
              {category && (
                <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg text-center">
                  <div className="text-sm font-bold text-gray-900 dark:text-white truncate">{category.name}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Category</div>
                </div>
              )}
            </div>
          </div>

          {/* Featured Image */}
          {imageUrl && (
            <div className="px-8 mb-8">
              <div className="aspect-video w-full overflow-hidden rounded-lg">
                <Image
                  src={imageUrl || "/placeholder.svg"}
                  alt={title}
                  width={1200}
                  height={675}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>
          )}

          {/* Article Content */}
          <div className="px-8 pb-8">
            {blocks.length > 0 ? (
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <ArticleRenderer blocks={blocks} />
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <p className="text-lg mb-2">No content yet</p>
                <p className="text-sm">Start adding content blocks to see your article preview</p>
              </div>
            )}
          </div>

          {/* Article Footer */}
          <div className="px-8 py-6 bg-gray-50 dark:bg-gray-800/50 border-t">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <p>
                  Article contains {blocks.length} content block{blocks.length !== 1 ? "s" : ""}
                </p>
              </div>

              {/* SEO Info */}
              {(metaDescription || focusKeyword) && (
                <div className="flex gap-2">
                  {metaDescription && (
                    <Badge variant="outline" className="text-xs">
                      Meta: {metaDescription.length}/160
                    </Badge>
                  )}
                  {focusKeyword && (
                    <Badge variant="outline" className="text-xs">
                      SEO: {focusKeyword}
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
