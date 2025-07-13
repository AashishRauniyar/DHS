/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import type React from "react"
import { useRouter, useParams } from "next/navigation"
import { useState, useEffect, useMemo, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import { SectionEditor } from "@/components/block-editor/section-editor"
import { CategorySelector } from "@/components/CategorySelector"
import { UserSelector } from "@/components/UserSelector"
import { ImageUploader } from "@/components/image-uploader"
import { ArticleRenderer } from "@/components/article-renderer"
import { KeywordVariationTool } from "@/components/KeywordVariationTool"
import type { Section, Block, KeywordVariation, ContentSuggestions, CreateSectionRequest } from "@/types/article"
import Link from "next/link"
import Image from "next/image"
import { Loader2, Save, Eye, Settings, Trash2, RefreshCw, FileText, Clock, Tag } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

export default function EditArticlePage() {
  const router = useRouter()
  const params = useParams()
  const [isPreview, setIsPreview] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Form state
  const [title, setTitle] = useState("")
  const [userId, setUserId] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [imagePublicId, setImagePublicId] = useState<string>("")
  const [categoryId, setCategoryId] = useState("")
  const [metaDescription, setMetaDescription] = useState("")
  const [focusKeyword, setFocusKeyword] = useState("")
  const [sections, setSections] = useState<Section[]>([]) // Updated to use Section[]
  const [keywords, setKeywords] = useState<KeywordVariation[]>([])
  const [originalPublishDate, setOriginalPublishDate] = useState<Date>(new Date())
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({})
  const [showSEOTools, setShowSEOTools] = useState(false)
  const [articleId, setArticleId] = useState<string>("")
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [wordCount, setWordCount] = useState(0)
  const [readingTime, setReadingTime] = useState(0)

  // Convert API sections to component sections
  const convertApiSectionsToComponentSections = useCallback((apiSections: any[]): Section[] => {
    if (!apiSections || apiSections.length === 0) {
      // Create default section if none exist
      return [
        {
          id: crypto.randomUUID(),
          title: "Introduction",
          order: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
          articleId: articleId,
          blocks: [
            {
              id: crypto.randomUUID(),
              type: "heading",
              level: 2,
              content: "Introduction",
              order: 0,
              sectionId: "",
              pros: [],
              cons: [],
              ingredients: [],
              highlights: [],
              customFields: [],
              ingredientsList: [],
              bulletPoints: [],
              faqItems: [],
              specifications: [],
            },
            {
              id: crypto.randomUUID(),
              type: "paragraph",
              content: "",
              order: 1,
              sectionId: "",
              pros: [],
              cons: [],
              ingredients: [],
              highlights: [],
              customFields: [],
              ingredientsList: [],
              bulletPoints: [],
              faqItems: [],
              specifications: [],
            },
          ],
        },
      ]
    }

    return apiSections.map((section) => ({
      id: section.id,
      title: section.title,
      order: section.order,
      createdAt: new Date(section.createdAt),
      updatedAt: new Date(section.updatedAt),
      articleId: section.articleId,
      blocks: section.blocks.map((block: any) => ({
        id: block.id,
        type: block.type,
        content: block.content || "",
        level: block.level,
        order: block.order,
        sectionId: block.sectionId,
        listType: block.listType,
        imageUrl: block.imageUrl,
        imageCaption: block.imageCaption,
        imageAlt: block.imageAlt,
        language: block.language,
        ctaText: block.ctaText,
        ctaButtonText: block.ctaButtonText,
        ctaButtonLink: block.ctaButtonLink,
        backgroundColor: block.backgroundColor,
        productName: block.productName,
        overallRating: block.overallRating,
        ingredientsIntroduction: block.ingredientsIntroduction,
        pros: block.pros || [],
        cons: block.cons || [],
        ingredients: block.ingredients || [],
        highlights: block.highlights || [],
        customFields: block.customFields || [],
        ingredientsList: block.ingredientsList || [],
        bulletPoints: block.bulletPoints || [],
        faqItems: block.faqItems || [],
        specifications: block.specifications || [],
        ratings: block.ratings,
      })),
    }))
  }, [articleId])

  // Convert component sections to API format
  const convertSectionsToApiFormat = (): CreateSectionRequest[] => {
    return sections.map((section) => ({
      title: section.title,
      order: section.order,
      blocks: section.blocks.map((block, blockIndex) => ({
        ...block,
        order: blockIndex,
        sectionId: section.id,
      })),
    }))
  }

  // Calculate reading statistics
  const calculateReadingStats = useMemo(() => {
    const allBlocks = sections.flatMap((section) => section.blocks)
    const textBlocks = allBlocks.filter((block) => block.type === "paragraph" || block.type === "heading")

    const totalWords = textBlocks.reduce((count, block) => {
      const words = (block.content || "").split(/\s+/).filter((word) => word.length > 0)
      return count + words.length
    }, 0)

    const estimatedReadingTime = Math.max(1, Math.ceil(totalWords / 200))

    return { wordCount: totalWords, readingTime: estimatedReadingTime }
  }, [sections])

  useEffect(() => {
    setWordCount(calculateReadingStats.wordCount)
    setReadingTime(calculateReadingStats.readingTime)
  }, [calculateReadingStats])

  // Fetch article data
  useEffect(() => {
    const fetchArticle = async () => {
      const pathSegments = window.location.pathname.split("/").filter(Boolean)
      const slug = pathSegments[pathSegments.length - 1]

      if (!slug) {
        setError("Article slug not found in URL")
        setLoading(false)
        return
      }

      try {
        console.log("Fetching article with slug:", slug)
        const response = await fetch(`/api/articles/${slug}`)

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Article not found")
          }
          const errorText = await response.text()
          console.error("Error response:", errorText)
          throw new Error(`Failed to load article: ${response.status} ${response.statusText}`)
        }

        const data = await response.json()
        console.log("Article data received:", data)

        let article
        if (data.success && data.article) {
          article = data.article
        } else if (data.article) {
          article = data.article
        } else if (data.id) {
          article = data
        } else {
          throw new Error("No article data found in response")
        }

        // Set form values from API response
        setArticleId(article.id || "")
        setTitle(article.title || "")
        setUserId(article.userId || article.user?.id || "")
        setImageUrl(article.imageUrl || "")
        setImagePublicId(article.imagePublicId || "")
        setCategoryId(article.categoryId || article.category?.id || "")
        setMetaDescription(article.metaDescription || article.seo?.metaDescription || "")
        setFocusKeyword(article.focusKeyword || article.seo?.focusKeyword || "")
        setOriginalPublishDate(new Date(article.publishDate || article.createdAt))
        setWordCount(article.wordCount || 0)
        setReadingTime(article.readingTime || 0)

        // Load existing keywords
        if (article.keywords && Array.isArray(article.keywords)) {
          setKeywords(article.keywords)
        } else if (article.seo?.keywords && Array.isArray(article.seo.keywords)) {
          setKeywords(article.seo.keywords)
        }

        // Process sections
        let sectionsData: any[] = []

        if (article.sections && Array.isArray(article.sections)) {
          sectionsData = article.sections
        } else if (article.blocks && Array.isArray(article.blocks)) {
          // Backward compatibility: convert flat blocks to sections
          sectionsData = [
            {
              id: crypto.randomUUID(),
              title: "Main Content",
              order: 0,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              articleId: article.id,
              blocks: article.blocks,
            },
          ]
        }

        const convertedSections = convertApiSectionsToComponentSections(sectionsData)
        setSections(convertedSections)

        setLastSaved(new Date(article.updatedAt || article.createdAt))

        toast({
          title: "Article loaded",
          description: "Article data has been loaded successfully",
        })
      } catch (error) {
        console.error("Error fetching article:", error)
        setError(error instanceof Error ? error.message : "Failed to load article")
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to load article",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchArticle()
  }, [articleId, convertApiSectionsToComponentSections])

  // Flatten sections for preview and compatibility
  const flattenSections = (): Block[] => {
    return sections.flatMap((section) =>
      section.blocks.map((block, blockIndex) => ({
        ...block,
        order: blockIndex,
        sectionId: section.id,
      })),
    )
  }

  const handleKeywordsChange = (newKeywords: KeywordVariation[]) => {
    setKeywords(newKeywords)

    if (newKeywords.length > 0 && !focusKeyword) {
      const primaryKeyword = newKeywords.find((k) => k.intent === "Commercial") || newKeywords[0]
      setFocusKeyword(primaryKeyword.keyword)
    }
  }

  const handleTitleSuggestions = (titles: string[]) => {
    // Could implement title suggestion UI here
  }

  const handleContentSuggestions = (suggestions: ContentSuggestions) => {
    // Could implement content suggestion UI here
  }

  const resetErrors = () => {
    setFormErrors({})
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    resetErrors()

    // Validation
    const errors: string[] = []
    const newFormErrors: { [key: string]: string } = {}

    if (!title.trim()) {
      errors.push("Title is required")
      newFormErrors.title = "Title is required"
    }
    if (!userId) {
      errors.push("Please select an author")
      newFormErrors.user = "Please select an author"
    }
    if (!categoryId) {
      errors.push("Please select a category")
      newFormErrors.category = "Please select a category"
    }
    if (sections.length === 0) {
      errors.push("Please add at least one section")
      newFormErrors.content = "Please add at least one section"
    }

    setFormErrors(newFormErrors)

    if (errors.length > 0) {
      toast({
        title: "Validation Error",
        description: "Please fix the following errors:\n" + errors.join("\n"),
        variant: "destructive",
      })
      return
    }

    try {
      setIsSubmitting(true)

      const articleData = {
        title: title.trim(),
        slug: title
          .toLowerCase()
          .trim()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]+/g, ""),
        sections: convertSectionsToApiFormat(), // Use sections instead of blocks
        userId,
        imageUrl: imageUrl || undefined,
        imagePublicId: imagePublicId || undefined,
        categoryId: categoryId || undefined,
        metaDescription: metaDescription.trim() || undefined,
        focusKeyword: focusKeyword.trim() || undefined,
        keywords: keywords,
      }

      console.log("Submitting article data:", articleData)

      const response = await fetch(`/api/articles/${params.slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(articleData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || errorData.message || "Failed to update article")
      }

      const updatedArticle = await response.json()
      setLastSaved(new Date())

      toast({
        title: "Success",
        description: "Article updated successfully",
      })

      // Redirect to article view
      router.push(`/Article/${updatedArticle.article?.slug || params.slug}`)
    } catch (error) {
      console.error("Error updating article:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update article. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteArticle = async () => {
    if (!confirm("Are you sure you want to delete this article? This action cannot be undone.")) {
      return
    }

    try {
      const response = await fetch(`/api/articles/${params.slug}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || errorData.message || "Failed to delete article")
      }

      toast({
        title: "Success",
        description: "Article deleted successfully",
      })

      router.push("/admin/articles")
    } catch (error) {
      console.error("Error deleting article:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete article. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading article data...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
          <div className="mt-4">
            <Button variant="outline" onClick={() => router.push("/admin/articles")}>
              Return to Articles
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Edit Article</h1>
          <div className="flex items-center gap-4 mt-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <FileText className="h-3 w-3" />
              ID: {articleId}
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {readingTime} min read
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <FileText className="h-3 w-3" />
              {wordCount} words
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <FileText className="h-3 w-3" />
              {sections.length} sections
            </Badge>
            {lastSaved && (
              <Badge variant="outline" className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Last saved: {lastSaved.toLocaleString()}
              </Badge>
            )}
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => setIsPreview(!isPreview)}>
            {isPreview ? (
              <>
                <Settings className="h-4 w-4 mr-2" />
                Edit
              </>
            ) : (
              <>
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </>
            )}
          </Button>
        </div>
      </div>

      {isPreview ? (
        <Card className="mb-8">
          <CardContent className="pt-6">
            {imageUrl && (
              <div className="aspect-video w-full overflow-hidden rounded-lg mb-6">
                <Image
                  src={imageUrl || "/placeholder.svg"}
                  alt={title}
                  width={1280}
                  height={720}
                  className="w-full h-full object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1280px"
                />
              </div>
            )}

            <h1 className="text-4xl font-bold mb-4">{title}</h1>

            <div className="flex items-center gap-4 text-gray-600 mb-8">
              <span>Originally published: {originalPublishDate.toLocaleDateString()}</span>
              <span>•</span>
              <span>{readingTime} min read</span>
              <span>•</span>
              <span>{wordCount} words</span>
              <span>•</span>
              <span>{sections.length} sections</span>
            </div>

            <ArticleRenderer sections={sections} />
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter article title"
                    required
                    className={formErrors.title ? "border-red-500" : undefined}
                  />
                  {formErrors.title && <p className="text-sm text-red-500">{formErrors.title}</p>}
                </div>

                <div className="space-y-2">
                  <UserSelector
                    value={userId}
                    onValueChange={setUserId}
                    label="Author *"
                    placeholder="Select an author"
                    required={true}
                    error={formErrors.user}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="featuredImage">Featured Image</Label>
                  <ImageUploader
                    currentImage={imageUrl}
                    onUpload={(imageData) => {
                      setImageUrl(imageData.url)
                      setImagePublicId(imageData.publicId)
                    }}
                    preset="hero"
                  />
                </div>

                <div className="bg-blue-50 p-4 rounded-md text-sm dark:bg-blue-900 dark:text-blue-100">
                  <p className="font-medium text-blue-800 dark:text-blue-200">Section Editor Tips:</p>
                  <ul className="list-disc pl-5 mt-2 text-blue-700 dark:text-blue-300 space-y-1">
                    <li>Drag and drop entire sections to reposition them</li>
                    <li>Use the copy button to duplicate sections</li>
                    <li>Each section maintains its own block order</li>
                    <li>Sections are displayed in the order they were created</li>
                    <li>Use section titles to organize your content logically</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <Label>
                    Content * ({sections.length} sections, {wordCount} words)
                  </Label>
                  <SectionEditor sections={sections} onChange={setSections} />
                  {formErrors.content && <p className="text-sm text-red-500">{formErrors.content}</p>}
                </div>

                <div className="flex gap-4">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Update Article
                      </>
                    )}
                  </Button>
                  <Button type="button" variant="outline" asChild>
                    <Link href="/admin/articles">Cancel</Link>
                  </Button>
                </div>
              </div>
            </form>
          </div>

          {/* Sidebar - Right Side */}
          <div className="lg:col-span-1">
            <div className="space-y-4 max-h-screen overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Article Settings
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <CategorySelector
                        value={categoryId}
                        onValueChange={setCategoryId}
                        label="Category *"
                        placeholder="Select category"
                        required={true}
                        error={formErrors.category}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="metaDescription">Meta Description</Label>
                      <Textarea
                        id="metaDescription"
                        value={metaDescription}
                        onChange={(e) => setMetaDescription(e.target.value)}
                        placeholder="SEO meta description (optional)"
                        maxLength={160}
                        rows={3}
                      />
                      <p className="text-xs text-gray-500">{metaDescription.length}/160 characters</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="focusKeyword">Focus Keyword</Label>
                      <Input
                        id="focusKeyword"
                        value={focusKeyword}
                        onChange={(e) => setFocusKeyword(e.target.value)}
                        placeholder="Primary SEO keyword (optional)"
                      />
                    </div>

                    <Separator />

                    <div className="pt-2">
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Publishing Info
                      </h4>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p>Originally published: {originalPublishDate.toLocaleDateString()}</p>
                        {lastSaved && <p>Last updated: {lastSaved.toLocaleString()}</p>}
                        <p>Reading time: {readingTime} minutes</p>
                        <p>Word count: {wordCount} words</p>
                        <p>Sections: {sections.length}</p>
                        <p className="text-xs">Changes will be saved immediately upon update.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-4">Quick Actions</h3>
                  <div className="space-y-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => setSections([])}
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Clear Content
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => setShowSEOTools(!showSEOTools)}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      {showSEOTools ? "Hide SEO Tools" : "Show SEO Tools"}
                    </Button>
                    <Separator />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="w-full"
                      onClick={handleDeleteArticle}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Article
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {showSEOTools && (
                <KeywordVariationTool
                  productName={title.replace(" Review: Is It Worth It?", "")}
                  onKeywordsChange={handleKeywordsChange}
                  onTitleSuggestions={handleTitleSuggestions}
                  onContentSuggestions={handleContentSuggestions}
                />
              )}

              {keywords.length > 0 && (
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Tag className="h-4 w-4" />
                      Current Keywords
                    </h3>
                    <div className="space-y-2">
                      {keywords.map((keyword, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm">{keyword.keyword}</span>
                          <Badge variant="outline" className="text-xs">
                            {keyword.intent}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {sections.length > 0 && (
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Section Overview
                    </h3>
                    <div className="space-y-2">
                      {sections.map((section, index) => (
                        <div key={section.id} className="flex items-center justify-between text-sm">
                          <span className="truncate">{section.title}</span>
                          <Badge variant="outline" className="text-xs">
                            {section.blocks.length} blocks
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
