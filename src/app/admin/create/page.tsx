/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import { SectionEditor } from "@/components/block-editor/section-editor"
import { ArticleRenderer } from "@/components/article-renderer"
import { ProductSetupWizard } from "@/components/product-setup-wizard"
import { CategorySelector } from "@/components/CategorySelector"
import { UserSelector } from "@/components/UserSelector"
import type { Section, Block, KeywordVariation, ContentSuggestions, CreateSectionRequest } from "@/types/article"
import Image from "next/image"
import { KeywordVariationTool } from "@/components/KeywordVariationTool"
import { ImageUploader } from "@/components/image-uploader"
import { v4 as uuidv4 } from "uuid"

export default function CreateArticlePage() {
  const router = useRouter()
  const [isPreview, setIsPreview] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSetupWizard, setShowSetupWizard] = useState(true)
  const [title, setTitle] = useState("")
  const [userId, setUserId] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [metaDescription, setMetaDescription] = useState("")
  const [focusKeyword, setFocusKeyword] = useState("")
  const [sections, setSections] = useState<Section[]>([]) // Updated to use Section[]
  const [keywords, setKeywords] = useState<KeywordVariation[]>([])
  const [showSEOTools, setShowSEOTools] = useState(false)
  const [titleError, setTitleError] = useState<string>("")
  const [contentError, setContentError] = useState<string>("")
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({})
  const [imagePublicId, setImagePublicId] = useState("")

  // Convert sections to API format for saving
  const prepareSectionsForAPI = (): CreateSectionRequest[] => {
    return sections.map((section) => ({
      title: section.title,
      order: section.order,
      blocks: section.blocks.map((block) => ({
        ...block,
        sectionId: section.id,
      })),
    }))
  }

  const handleKeywordsChange = (newKeywords: KeywordVariation[]) => {
    setKeywords(newKeywords)

    // Auto-set focus keyword to the first primary keyword or first keyword
    if (newKeywords.length > 0 && !focusKeyword) {
      const primaryKeyword = newKeywords.find((k) => k.intent === "Commercial") || newKeywords[0]
      setFocusKeyword(primaryKeyword.keyword)
    }
  }

  // Dummy handlers for compatibility (not used with manual input)
  const handleTitleSuggestions = (titles: string[]) => {
    // Not used in manual mode
  }

  const handleContentSuggestions = (suggestions: ContentSuggestions) => {
    // Not used in manual mode
  }

  const resetErrors = () => {
    setFormErrors({})
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    resetErrors()

    // Check each required field and show specific error messages
    const errors: string[] = []
    const newFormErrors: { [key: string]: string } = {}

    if (!title) {
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
        title,
        slug: title
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]+/g, ""),
        sections: prepareSectionsForAPI(), // Use sections instead of blocks
        userId,
        publishDate: new Date(),
        imageUrl: imageUrl || undefined,
        imagePublicId: imagePublicId || undefined,
        categoryId: categoryId || undefined,
        metaDescription: metaDescription || undefined,
        focusKeyword: focusKeyword || undefined,
        keywords: keywords, // Include keywords in the submission
      }

      console.log("Submitting article data:", articleData)

      const response = await fetch("/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(articleData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || errorData.message || "Failed to create article")
      }

      const createdArticle = await response.json()

      toast({
        title: "Success",
        description: "Article created successfully with SEO data",
      })

      router.push(`/Article/${createdArticle.article.slug}`)
      router.refresh()
    } catch (error) {
      console.error("Error creating article:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create article. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Convert old Block[][] to new Section[] format
  const convertBlocksToSections = (blockSections: Block[][]): Section[] => {
    return blockSections.map((blocks, index) => {
      // Find heading block to use as section title
      const headingBlock = blocks.find((block) => block.type === "heading" && block.level === 2)
      const sectionId = uuidv4()

      return {
        id: sectionId,
        title: headingBlock?.content || `Section ${index + 1}`,
        order: index,
        createdAt: new Date(),
        updatedAt: new Date(),
        articleId: "", // Will be set when saved
        blocks: blocks.map((block, blockIndex) => ({
          ...block,
          sectionId: sectionId,
          order: blockIndex,
        })),
      }
    })
  }

  const handleSetupComplete = (productName: string, generatedSections: Block[][]) => {
    setTitle(`${productName} Review: Is It Worth It?`)
    // Convert old Block[][] to new Section[] format
    setSections(convertBlocksToSections(generatedSections))
    setShowSetupWizard(false)
  }

  if (showSetupWizard) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Create Product Review</h1>
        </div>

        <ProductSetupWizard onComplete={handleSetupComplete} onCancel={() => router.push("/admin/articles")} />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Create Product Review</h1>
        <div className="flex space-x-2">
          <Button onClick={() => setIsPreview(!isPreview)}>{isPreview ? "Edit" : "Preview"}</Button>
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
                />
              </div>
            )}

            <h1 className="text-4xl font-bold mb-4">{title}</h1>

            <div className="text-gray-600 mb-8">Published: {new Date().toLocaleDateString()}</div>

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
                  <Label>Content * ({sections.length} sections)</Label>
                  <SectionEditor sections={sections} onChange={setSections} />
                  {formErrors.content && <p className="text-sm text-red-500">{formErrors.content}</p>}
                </div>

                <div className="flex gap-4">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save Article"}
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
                  <h3 className="font-semibold mb-4">Article Settings</h3>
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
                      <Input
                        id="metaDescription"
                        value={metaDescription}
                        onChange={(e) => setMetaDescription(e.target.value)}
                        placeholder="SEO meta description (optional)"
                        maxLength={160}
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

                    <div className="pt-4 border-t">
                      <h4 className="font-medium mb-2">Publishing</h4>
                      <p className="text-sm text-gray-600">Article will be published immediately upon creation.</p>
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
                      onClick={() => setShowSetupWizard(true)}
                    >
                      Reset Wizard
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => setSections([])}
                    >
                      Clear Content
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => setShowSEOTools(!showSEOTools)}
                    >
                      {showSEOTools ? "Hide SEO Tools" : "Show SEO Tools"}
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

              {sections.length > 0 && (
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-4">Section Overview</h3>
                    <div className="space-y-2">
                      {sections.map((section, index) => (
                        <div key={section.id} className="flex items-center justify-between text-sm">
                          <span className="truncate">{section.title}</span>
                          <span className="text-xs text-gray-500">{section.blocks.length} blocks</span>
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
