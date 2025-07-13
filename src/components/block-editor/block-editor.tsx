/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useState, useRef, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import Image from "next/image"
import { PlusCircle, ImageIcon, Trash2, Sparkles, ExternalLink, Star, Plus, AlignLeft, Heading2, ThumbsUp, ThumbsDown, List, HelpCircle, Settings } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "@/hooks/use-toast"
import type { Block } from "@/types/article"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ImageBlock } from "@/components/block-editor/image-block"
import { ImageUploader } from "@/components/image-uploader"

interface BlockEditorProps {
  blocks: Block[]
  onChange: (blocks: Block[]) => void
  sectionId?: string
}

export function BlockEditor({ blocks, onChange, sectionId = "" }: BlockEditorProps) {
  const [activeBlock, setActiveBlock] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)
  const [activeSection, setActiveSection] = useState<string>("")
  const blockRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  // Generate TOC items from section blocks
  const tocItems = blocks
    .filter((block) => block.type === "heading" && block.level === 2)
    .map((block) => ({
      id: block.id,
      title: block.content || "Untitled",
    }))

  // Add default sections if not present in blocks
  const defaultSections = [
    "Overview",
    "What is It?",
    "Rating",
    "Pros & Cons",
    "Brand",
    "How Does It Work?",
    "Ingredients",
    "How to Use?",
    "What to Expect?",
    "Benefits",
    "Safety",
    "How Effective is It?",
    "Price",
    "Reviews",
    "FAQ's",
    "Conclusion",
  ]

  const allTocItems =
    tocItems.length > 0
      ? tocItems
      : defaultSections.map((title, index) => ({
          id: `section-${index}`,
          title,
        }))

  // Scroll to section when TOC item is clicked
  const scrollToSection = (id: string) => {
    setActiveSection(id)
    const element = blockRefs.current[id]
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    } else {
      // If section doesn't exist, create it
      const sectionTitle = allTocItems.find((item) => item.id === id)?.title || ""
      if (sectionTitle) {
        addSectionHeading(sectionTitle, blocks.length)
      }
    }
  }

  const addSectionHeading = (title: string, index: number) => {
    const newBlock: Block = {
      id: uuidv4(),
      type: "heading",
      level: 2,
      content: title,
      order: index,
      sectionId,
      pros: [],
      cons: [],
      ingredients: [],
      highlights: [],
      customFields: [],
      ingredientsList: [],
      bulletPoints: [],
      faqItems: [],
      specifications: [],
    }

    const newBlocks = [...blocks]
    newBlocks.splice(index, 0, newBlock)
    // Update order for all blocks
    newBlocks.forEach((block, idx) => {
      block.order = idx
    })
    onChange(newBlocks)

    // Focus the new block after it's added
    setTimeout(() => {
      setActiveBlock(newBlock.id)
    }, 100)
  }

  const addBlock = (type: Block["type"], index: number) => {
    const newBlock: Block = {
      id: uuidv4(),
      type,
      content: "",
      order: index + 1,
      sectionId,
      pros: [],
      cons: [],
      ingredients: [],
      highlights: [],
      customFields: [],
      ingredientsList: [],
      bulletPoints: [],
      faqItems: [],
      specifications: [],
    }

    if (type === "heading") {
      newBlock.level = 2
    }

    if (type === "list") {
      newBlock.listType = "unordered"
    }

    if (type === "code") {
      newBlock.language = "javascript"
    }

    if (type === "cta") {
      newBlock.ctaText = "Learn More"
      newBlock.ctaLink = "https://example.com"
      newBlock.ctaButtonText = "Click Here"
      newBlock.ctaButtonLink = "https://example.com"
      newBlock.backgroundColor = "#2563eb"
    }

    if (type === "rating") {
      newBlock.productName = "Product Name"
      newBlock.ratings = {
        id: uuidv4(),
        blockId: newBlock.id,
        ingredients: 4.7,
        value: 4.6,
        manufacturer: 4.8,
        safety: 4.8,
        effectiveness: 4.7,
      }
      newBlock.highlights = [
        {
          id: uuidv4(),
          content: "Made with clinically-tested, powerfully effective ingredients.",
          order: 1,
          blockId: newBlock.id,
        },
        {
          id: uuidv4(),
          content: "Manufactured in the USA",
          order: 2,
          blockId: newBlock.id,
        },
        {
          id: uuidv4(),
          content: "Made in GMP-certified facilities to ensure product safety and quality",
          order: 3,
          blockId: newBlock.id,
        },
      ]
      newBlock.ctaButtonText = "SHOP NOW"
      newBlock.ctaButtonLink = "#"
    }

    if (type === "pros-cons") {
      newBlock.pros = [
        {
          id: uuidv4(),
          content: "Clinically validated and doctor-approved",
          order: 1,
          blockId: newBlock.id,
        },
        {
          id: uuidv4(),
          content: "Available without a prescription",
          order: 2,
          blockId: newBlock.id,
        },
      ]
      newBlock.cons = [
        {
          id: uuidv4(),
          content: "Available only online",
          order: 1,
          blockId: newBlock.id,
        },
      ]
      newBlock.ingredients = [
        {
          id: uuidv4(),
          content: "Vitamin A",
          order: 1,
          blockId: newBlock.id,
        },
        {
          id: uuidv4(),
          content: "Zinc",
          order: 2,
          blockId: newBlock.id,
        },
      ]
    }

    if (type === "ingredients") {
      newBlock.productName = "Product Name"
      newBlock.ingredientsIntroduction =
        "This product features natural ingredients known to support health and wellness."
      newBlock.ingredientsList = [
        {
          id: uuidv4(),
          number: 1,
          name: "Vitamin A",
          imageUrl: "/placeholder.svg?height=150&width=150",
          description: "Essential vitamin that supports various bodily functions.",
          studyYear: "2020",
          studySource: "Journal of Nutrition",
          studyDescription: "Studies show the importance of Vitamin A for overall health.",
          blockId: newBlock.id,
        },
      ]
    }

    if (type === "bullet-list") {
      newBlock.bulletPoints = [
        {
          id: uuidv4(),
          content: "First bullet point",
          order: 1,
          blockId: newBlock.id,
        },
      ]
    }

    if (type === "faq") {
      newBlock.faqItems = [
        {
          id: uuidv4(),
          question: "Sample question?",
          answer: "Sample answer to the question.",
          order: 1,
          blockId: newBlock.id,
        },
      ]
    }

    if (type === "specifications") {
      newBlock.specifications = [
        {
          id: uuidv4(),
          name: "Brand",
          value: "Product Brand Name",
          order: 1,
          blockId: newBlock.id,
        },
        {
          id: uuidv4(),
          name: "Serving Size",
          value: "2 gummies",
          order: 2,
          blockId: newBlock.id,
        },
      ]
    }

    const newBlocks = [...blocks]
    newBlocks.splice(index + 1, 0, newBlock)
    // Update order for all blocks
    newBlocks.forEach((block, idx) => {
      block.order = idx
    })
    onChange(newBlocks)

    // Focus the new block after it's added
    setTimeout(() => {
      setActiveBlock(newBlock.id)
    }, 100)
  }

  const updateBlock = (id: string, updates: Partial<Block>) => {
    const newBlocks = blocks.map((block) => (block.id === id ? { ...block, ...updates } : block))
    onChange(newBlocks)
  }

  const deleteBlock = (id: string) => {
    if (blocks.length <= 1) {
      toast({
        title: "Cannot delete",
        description: "You need at least one block in your section",
        variant: "destructive",
      })
      return
    }

    const index = blocks.findIndex((block) => block.id === id)
    const newBlocks = blocks.filter((block) => block.id !== id)
    // Update order for remaining blocks
    newBlocks.forEach((block, idx) => {
      block.order = idx
    })
    onChange(newBlocks)

    // Focus the previous block or the next one if there's no previous
    const nextActiveIndex = Math.max(0, index - 1)
    setTimeout(() => {
      setActiveBlock(newBlocks[nextActiveIndex]?.id || null)
    }, 100)
  }

  const generateAIContent = async (blockId: string, prompt = "") => {
    const block = blocks.find((b) => b.id === blockId)
    if (!block) return

    setIsGenerating(true)

    try {
      let userPrompt = prompt

      if (!userPrompt) {
        userPrompt = window.prompt("What content would you like to generate?", "") ?? ""
        if (!userPrompt) {
          setIsGenerating(false)
          return
        }
      }

      // Simulate AI generation with a timeout
      await new Promise((resolve) => setTimeout(resolve, 1500))

      let generatedContent = ""

      switch (block.type) {
        case "paragraph":
          generatedContent = `This is an AI-generated paragraph about ${userPrompt}. It provides detailed information and insights about the topic, maintaining a natural and informative style.`
          break
        case "heading":
          generatedContent = `${userPrompt.charAt(0).toUpperCase() + userPrompt.slice(1)}`
          break
        case "quote":
          generatedContent = `"The best way to understand ${userPrompt} is through experience and knowledge." — Expert Opinion`
          break
        case "list":
          generatedContent = `Key point about ${userPrompt}\nImportant aspect of ${userPrompt}\nBenefit of ${userPrompt}`
          break
        case "code":
          generatedContent = `// Example code related to ${userPrompt}\nfunction example() {\n  console.log("This demonstrates ${userPrompt}");\n  return true;\n}`
          break
        case "bullet-list":
          generatedContent = `Key point about ${userPrompt}\nSecond important point\nThird notable aspect`
          const bulletPoints = generatedContent.split("\n").map((content, idx) => ({
            id: uuidv4(),
            content,
            order: idx + 1,
            blockId: blockId,
          }))
          updateBlock(blockId, { bulletPoints })
          return // Early return since we're updating bulletPoints directly
        default:
          generatedContent = `Generated content about ${userPrompt}`
      }

      updateBlock(blockId, { content: generatedContent })

      toast({
        title: "Content generated",
        description: "AI-generated content has been added to your block",
      })
    } catch (error) {
      console.error("Error generating content:", error)
      toast({
        title: "Generation failed",
        description: "Failed to generate content. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  // Helper functions for managing pros, cons, and ingredients
  const addProsConsItem = (blockId: string, type: "pros" | "cons" | "ingredients", content: string) => {
    const block = blocks.find((b) => b.id === blockId)
    if (!block) return

    const newItem = {
      id: uuidv4(),
      content,
      order: (block[type]?.length || 0) + 1,
      blockId,
    }

    const updatedItems = [...(block[type] || []), newItem]
    updateBlock(blockId, { [type]: updatedItems })
  }

  const updateProsConsItem = (
    blockId: string,
    type: "pros" | "cons" | "ingredients",
    itemId: string,
    content: string,
  ) => {
    const block = blocks.find((b) => b.id === blockId)
    if (!block) return

    const updatedItems = (block[type] || []).map((item: any) => (item.id === itemId ? { ...item, content } : item))
    updateBlock(blockId, { [type]: updatedItems })
  }

  const removeProsConsItem = (blockId: string, type: "pros" | "cons" | "ingredients", itemId: string) => {
    const block = blocks.find((b) => b.id === blockId)
    if (!block) return

    const updatedItems = (block[type] || []).filter((item: any) => item.id !== itemId)
    updateBlock(blockId, { [type]: updatedItems })
  }

  // Focus the block when it becomes active
  useEffect(() => {
    if (activeBlock && blockRefs.current[activeBlock]) {
      const element = blockRefs.current[activeBlock]
      const inputElement = element?.querySelector("input, textarea") as HTMLElement
      if (inputElement) {
        inputElement.focus()
      }
    }
  }, [activeBlock])

  return (
    <TooltipProvider>
      <div className="space-y-1">
        {/* Horizontal Table of Contents */}
        <div className="mb-6 bg-white sticky top-0 z-10 shadow-sm">
          <div className="flex flex-wrap gap-2 p-4 border-b">
            {allTocItems.map((item) => (
              <Button
                key={item.id}
                variant={activeSection === item.id ? "default" : "outline"}
                size="sm"
                onClick={() => scrollToSection(item.id)}
                className="text-xs"
                type="button"
              >
                {item.title}
              </Button>
            ))}
          </div>

          <div className="flex justify-end p-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" type="button">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Section
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {defaultSections.map((section, index) => (
                  <DropdownMenuItem key={index} onClick={() => addSectionHeading(section, blocks.length)}>
                    <Heading2 className="h-4 w-4 mr-2" />
                    {section}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {blocks.map((block, index) => (
          <div key={block.id} className="relative group">
            {/* Floating add button between blocks */}
            <div
              className="absolute left-1/2 -top-3 transform -translate-x-1/2 z-10 opacity-0 group-hover:opacity-100 hover:opacity-100 transition-opacity"
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-6 w-6 rounded-full bg-white shadow-md"
                    type="button"
                  >
                    <PlusCircle className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center">
                  <DropdownMenuItem onClick={() => addBlock("paragraph", index - 1)}>
                    <AlignLeft className="h-4 w-4 mr-2" />
                    <span>Paragraph</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => addBlock("heading", index - 1)}>
                    <Heading2 className="h-4 w-4 mr-2" />
                    <span>Heading</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => addBlock("image", index - 1)}>
                    <ImageIcon className="h-4 w-4 mr-2" />
                    <span>Image</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => addBlock("rating", index - 1)}>
                    <Star className="h-4 w-4 mr-2" />
                    <span>Product Rating</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => addBlock("pros-cons", index - 1)}>
                    <div className="flex items-center">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      <ThumbsDown className="h-4 w-4 mr-2" />
                    </div>
                    <span>Pros & Cons</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => addBlock("ingredients", index - 1)}>
                    <Star className="h-4 w-4 mr-2" />
                    <span>Ingredients</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => addBlock("cta", index - 1)}>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    <span>Call to Action</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => addBlock("bullet-list", index - 1)}>
                    <List className="h-4 w-4 mr-2" />
                    <span>Bullet Points</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => addBlock("faq", index - 1)}>
                    <HelpCircle className="h-4 w-4 mr-2" />
                    <span>FAQ Section</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => addBlock("specifications", index - 1)}>
                    <Settings className="h-4 w-4 mr-2" />
                    <span>Specifications</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div
              ref={(el) => {
                blockRefs.current[block.id] = el
                // If this is a heading, register it as a section
                if (block.type === "heading" && block.level === 2) {
                  blockRefs.current[block.id] = el
                }
              }}
              className={`relative ${activeBlock === block.id ? "ring-2 ring-blue-500 rounded-md" : ""}`}
              onClick={() => setActiveBlock(block.id)}
              tabIndex={0}
              id={block.id}
            >
              <div className="border border-gray-200 hover:border-gray-300 transition-colors mb-2 rounded-md">
                <div className="p-4">
                  <div className="space-y-4">
                    {/* Block content based on type */}
                    {block.type === "paragraph" && (
                      <Textarea
                        value={block.content || ""}
                        onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                        placeholder="Type paragraph content..."
                        className="min-h-[100px] resize-y"
                      />
                    )}

                    {block.type === "heading" && (
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <select
                            value={block.level || 2}
                            onChange={(e) => updateBlock(block.id, { level: Number(e.target.value) as 1 | 2 | 3 })}
                            className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
                          >
                            <option value={1}>H1</option>
                            <option value={2}>H2</option>
                            <option value={3}>H3</option>
                          </select>
                          <Input
                            value={block.content || ""}
                            onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                            placeholder="Heading text..."
                            className="flex-1 text-lg font-bold"
                          />
                        </div>
                      </div>
                    )}

                    {block.type === "image" && (
                      <ImageBlock
                        block={block}
                        onChange={(updates: Partial<Block>) => updateBlock(block.id, updates)}
                      />
                    )}

                    {block.type === "rating" && (
                      <div className="space-y-4 border rounded-md p-4">
                        <div className="space-y-2">
                          <Label>Product Name</Label>
                          <Input
                            value={block.productName || ""}
                            onChange={(e) => updateBlock(block.id, { productName: e.target.value })}
                            placeholder="Enter product name..."
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Effectiveness Rating</Label>
                            <Input
                              type="number"
                              min="0"
                              max="5"
                              step="0.1"
                              value={block.ratings?.effectiveness || 0}
                              onChange={(e) =>
                                updateBlock(block.id, {
                                  ratings: {
                                    ...block.ratings,
                                    id: block.ratings?.id || uuidv4(),
                                    blockId: block.id,
                                    effectiveness: Number.parseFloat(e.target.value),
                                  },
                                })
                              }
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>Ingredients Rating</Label>
                            <Input
                              type="number"
                              min="0"
                              max="5"
                              step="0.1"
                              value={block.ratings?.ingredients || 0}
                              onChange={(e) =>
                                updateBlock(block.id, {
                                  ratings: {
                                    ...block.ratings,
                                    id: block.ratings?.id || uuidv4(),
                                    blockId: block.id,
                                    ingredients: Number.parseFloat(e.target.value),
                                  },
                                })
                              }
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>Value Rating</Label>
                            <Input
                              type="number"
                              min="0"
                              max="5"
                              step="0.1"
                              value={block.ratings?.value || 0}
                              onChange={(e) =>
                                updateBlock(block.id, {
                                  ratings: {
                                    ...block.ratings,
                                    id: block.ratings?.id || uuidv4(),
                                    blockId: block.id,
                                    value: Number.parseFloat(e.target.value),
                                  },
                                })
                              }
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>Safety Rating</Label>
                            <Input
                              type="number"
                              min="0"
                              max="5"
                              step="0.1"
                              value={block.ratings?.safety || 0}
                              onChange={(e) =>
                                updateBlock(block.id, {
                                  ratings: {
                                    ...block.ratings,
                                    id: block.ratings?.id || uuidv4(),
                                    blockId: block.id,
                                    safety: Number.parseFloat(e.target.value),
                                  },
                                })
                              }
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Brand Highlights</Label>
                          <div className="space-y-2">
                            {block.highlights.map((highlight) => (
                              <div key={highlight.id} className="flex gap-2">
                                <Input
                                  value={highlight.content}
                                  onChange={(e) => {
                                    const updatedHighlights = block.highlights.map((h) =>
                                      h.id === highlight.id ? { ...h, content: e.target.value } : h,
                                    )
                                    updateBlock(block.id, { highlights: updatedHighlights })
                                  }}
                                  placeholder="Enter highlight..."
                                />
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => {
                                    const updatedHighlights = block.highlights.filter((h) => h.id !== highlight.id)
                                    updateBlock(block.id, { highlights: updatedHighlights })
                                  }}
                                  type="button"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => {
                                const newHighlight = {
                                  id: uuidv4(),
                                  content: "New highlight",
                                  order: block.highlights.length + 1,
                                  blockId: block.id,
                                }
                                updateBlock(block.id, { highlights: [...block.highlights, newHighlight] })
                              }}
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Add Highlight
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}

                    {block.type === "bullet-list" && (
                      <div className="space-y-4 border rounded-md p-4">
                        <Label>Bullet Points</Label>
                        <div className="space-y-2">
                          {block.bulletPoints?.map((point) => (
                            <div key={point.id} className="flex gap-2">
                              <Input
                                value={point.content}
                                onChange={(e) => {
                                  const updatedPoints = block.bulletPoints.map((p) =>
                                    p.id === point.id ? { ...p, content: e.target.value } : p,
                                  )
                                  updateBlock(block.id, { bulletPoints: updatedPoints })
                                }}
                                placeholder="Enter bullet point..."
                              />
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => {
                                  const updatedPoints = block.bulletPoints.filter((p) => p.id !== point.id)
                                  updateBlock(block.id, { bulletPoints: updatedPoints })
                                }}
                                type="button"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                          <Button
                            variant="outline"
                            onClick={() => {
                              const newPoint = {
                                id: uuidv4(),
                                content: "New bullet point",
                                order: (block.bulletPoints?.length || 0) + 1,
                                blockId: block.id,
                              }
                              updateBlock(block.id, {
                                bulletPoints: [...(block.bulletPoints || []), newPoint],
                              })
                            }}
                            type="button"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Bullet Point
                          </Button>
                        </div>
                      </div>
                    )}

                    {block.type === "faq" && (
                      <div className="space-y-4 border rounded-md p-4">
                        <Label>Frequently Asked Questions</Label>
                        <div className="space-y-4">
                          {block.faqItems?.map((faq) => (
                            <div key={faq.id} className="border rounded-md p-4 space-y-2">
                              <div className="space-y-2">
                                <Label>Question</Label>
                                <Input
                                  value={faq.question}
                                  onChange={(e) => {
                                    const updatedFAQs = block.faqItems.map((f) =>
                                      f.id === faq.id ? { ...f, question: e.target.value } : f,
                                    )
                                    updateBlock(block.id, { faqItems: updatedFAQs })
                                  }}
                                  placeholder="Enter question..."
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Answer</Label>
                                <Textarea
                                  value={faq.answer}
                                  onChange={(e) => {
                                    const updatedFAQs = block.faqItems.map((f) =>
                                      f.id === faq.id ? { ...f, answer: e.target.value } : f,
                                    )
                                    updateBlock(block.id, { faqItems: updatedFAQs })
                                  }}
                                  placeholder="Enter answer..."
                                  className="min-h-[80px]"
                                />
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  const updatedFAQs = block.faqItems.filter((f) => f.id !== faq.id)
                                  updateBlock(block.id, { faqItems: updatedFAQs })
                                }}
                                type="button"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Remove FAQ
                              </Button>
                            </div>
                          ))}
                          <Button
                            variant="outline"
                            onClick={() => {
                              const newFAQ = {
                                id: uuidv4(),
                                question: "New question?",
                                answer: "New answer.",
                                order: (block.faqItems?.length || 0) + 1,
                                blockId: block.id,
                              }
                              updateBlock(block.id, {
                                faqItems: [...(block.faqItems || []), newFAQ],
                              })
                            }}
                            type="button"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add FAQ Item
                          </Button>
                        </div>
                      </div>
                    )}

                    {block.type === "specifications" && (
                      <div className="space-y-4 border rounded-md p-4">
                        <Label>Product Specifications</Label>
                        <div className="space-y-2">
                          {block.specifications?.map((spec) => (
                            <div key={spec.id} className="grid grid-cols-2 gap-2">
                              <Input
                                value={spec.name}
                                onChange={(e) => {
                                  const updatedSpecs = block.specifications.map((s) =>
                                    s.id === spec.id ? { ...s, name: e.target.value } : s,
                                  )
                                  updateBlock(block.id, { specifications: updatedSpecs })
                                }}
                                placeholder="Specification name..."
                              />
                              <div className="flex gap-2">
                                <Input
                                  value={spec.value}
                                  onChange={(e) => {
                                    const updatedSpecs = block.specifications.map((s) =>
                                      s.id === spec.id ? { ...s, value: e.target.value } : s,
                                    )
                                    updateBlock(block.id, { specifications: updatedSpecs })
                                  }}
                                  placeholder="Specification value..."
                                />
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => {
                                    const updatedSpecs = block.specifications.filter((s) => s.id !== spec.id)
                                    updateBlock(block.id, { specifications: updatedSpecs })
                                  }}
                                  type="button"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                          <Button
                            variant="outline"
                            onClick={() => {
                              const newSpec = {
                                id: uuidv4(),
                                name: "New Specification",
                                value: "Value",
                                order: (block.specifications?.length || 0) + 1,
                                blockId: block.id,
                              }
                              updateBlock(block.id, {
                                specifications: [...(block.specifications || []), newSpec],
                              })
                            }}
                            type="button"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Specification
                          </Button>
                        </div>
                      </div>
                    )}

                    {block.type === "pros-cons" && (
                      <div className="space-y-4 border rounded-md p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Pros</Label>
                            <div className="space-y-2">
                              {block.pros.map((pro) => (
                                <div key={pro.id} className="flex gap-2">
                                  <Input
                                    value={pro.content}
                                    onChange={(e) => updateProsConsItem(block.id, "pros", pro.id, e.target.value)}
                                    placeholder="Enter pro..."
                                  />
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => removeProsConsItem(block.id, "pros", pro.id)}
                                    type="button"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              ))}
                              <Button
                                variant="outline"
                                onClick={() => addProsConsItem(block.id, "pros", "New pro point")}
                                type="button"
                              >
                                <Plus className="h-4 w-4 mr-2" />
                                Add Pro
                              </Button>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>Cons</Label>
                            <div className="space-y-2">
                              {block.cons.map((con) => (
                                <div key={con.id} className="flex gap-2">
                                  <Input
                                    value={con.content}
                                    onChange={(e) => updateProsConsItem(block.id, "cons", con.id, e.target.value)}
                                    placeholder="Enter con..."
                                  />
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => removeProsConsItem(block.id, "cons", con.id)}
                                    type="button"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              ))}
                              <Button
                                variant="outline"
                                onClick={() => addProsConsItem(block.id, "cons", "New con point")}
                                type="button"
                              >
                                <Plus className="h-4 w-4 mr-2" />
                                Add Con
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Key Ingredients</Label>
                          <div className="space-y-2">
                            {block.ingredients.map((ingredient) => (
                              <div key={ingredient.id} className="flex gap-2">
                                <Input
                                  value={ingredient.content}
                                  onChange={(e) =>
                                    updateProsConsItem(block.id, "ingredients", ingredient.id, e.target.value)
                                  }
                                  placeholder="Enter ingredient..."
                                />
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => removeProsConsItem(block.id, "ingredients", ingredient.id)}
                                  type="button"
                                >
                                  <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              ))}
                              <Button
                                variant="outline"
                                onClick={() => addProsConsItem(block.id, "ingredients", "New ingredient")}
                                type="button"
                              >
                                <Plus className="h-4 w-4 mr-2" />
                                Add Ingredient
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}

                      {block.type === "ingredients" && (
                        <div className="space-y-4 border rounded-md p-4">
                          <div className="space-y-2">
                            <Label>Product Name</Label>
                            <Input
                              value={block.productName || ""}
                              onChange={(e) => updateBlock(block.id, { productName: e.target.value })}
                              placeholder="Enter product name..."
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>Introduction</Label>
                            <Textarea
                              value={block.ingredientsIntroduction || ""}
                              onChange={(e) => updateBlock(block.id, { ingredientsIntroduction: e.target.value })}
                              placeholder="Enter introduction text..."
                              className="min-h-[80px]"
                            />
                          </div>

                          <div className="space-y-4">
                            <Label>Ingredients List</Label>
                            {block.ingredientsList.map((ingredient) => (
                              <div key={ingredient.id} className="border rounded-md p-4 space-y-4 bg-gray-50">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                  {/* Image Preview Column */}
                                  <div className="space-y-2">
                                    <Label>Ingredient Image</Label>
                                    <div className="space-y-2">
                                      <ImageUploader
                                        currentImage={ingredient.imageUrl || ""}
                                        onUpload={(imageData) => {
                                          const updatedIngredients = block.ingredientsList.map((ing) =>
                                            ing.id === ingredient.id ? { ...ing, imageUrl: imageData.url } : ing,
                                          )
                                          updateBlock(block.id, { ingredientsList: updatedIngredients })
                                        }}
                                        preset="ingredient"
                                      />
                                      {/* Image Preview */}
                                      {ingredient.imageUrl && (
                                        <div className="mt-2">
                                          <div className="relative w-full h-32 bg-gray-100 rounded-md overflow-hidden border">
                                            {ingredient.imageUrl.includes("placeholder.svg") ? (
                                              <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">
                                                <ImageIcon className="w-8 h-8" />
                                              </div>
                                            ) : (
                                              <Image
                                                src={ingredient.imageUrl || "/placeholder.svg"}
                                                alt={ingredient.name || "Ingredient"}
                                                className="w-full h-full object-cover"
                                                width={80}
                                                height={80}
                                                onError={(e) => {
                                                  const target = e.currentTarget
                                                  target.style.display = "none"
                                                  const fallback = target.nextElementSibling as HTMLElement
                                                  if (fallback) fallback.classList.remove("hidden")
                                                }}
                                              />
                                            )}
                                            <div className="hidden absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500 text-sm">
                                              <ImageIcon className="w-8 h-8" />
                                            </div>
                                          </div>
                                          <p className="text-xs text-gray-500 mt-1 truncate">
                                            {ingredient.name || "Ingredient"}
                                          </p>
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  {/* Content Columns */}
                                  <div className="md:col-span-2 space-y-4">
                                    <div className="space-y-2">
                                      <Label>Ingredient Name</Label>
                                      <Input
                                        value={ingredient.name}
                                        onChange={(e) => {
                                          const updatedIngredients = block.ingredientsList.map((ing) =>
                                            ing.id === ingredient.id ? { ...ing, name: e.target.value } : ing,
                                          )
                                          updateBlock(block.id, { ingredientsList: updatedIngredients })
                                        }}
                                        placeholder="Ingredient name..."
                                      />
                                    </div>

                                    <div className="space-y-2">
                                      <Label>Description</Label>
                                      <Textarea
                                        value={ingredient.description}
                                        onChange={(e) => {
                                          const updatedIngredients = block.ingredientsList.map((ing) =>
                                            ing.id === ingredient.id ? { ...ing, description: e.target.value } : ing,
                                          )
                                          updateBlock(block.id, { ingredientsList: updatedIngredients })
                                        }}
                                        placeholder="Description..."
                                        className="min-h-[80px]"
                                      />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                      <div className="space-y-2">
                                        <Label>Study Year</Label>
                                        <Input
                                          value={ingredient.studyYear || ""}
                                          onChange={(e) => {
                                            const updatedIngredients = block.ingredientsList.map((ing) =>
                                              ing.id === ingredient.id ? { ...ing, studyYear: e.target.value } : ing,
                                            )
                                            updateBlock(block.id, { ingredientsList: updatedIngredients })
                                          }}
                                          placeholder="Study year..."
                                        />
                                      </div>
                                      <div className="space-y-2">
                                        <Label>Study Source</Label>
                                        <Input
                                          value={ingredient.studySource || ""}
                                          onChange={(e) => {
                                            const updatedIngredients = block.ingredientsList.map((ing) =>
                                              ing.id === ingredient.id ? { ...ing, studySource: e.target.value } : ing,
                                            )
                                            updateBlock(block.id, { ingredientsList: updatedIngredients })
                                          }}
                                          placeholder="Study source..."
                                        />
                                      </div>
                                    </div>

                                    <div className="flex justify-end">
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                          const updatedIngredients = block.ingredientsList.filter(
                                            (ing) => ing.id !== ingredient.id,
                                          )
                                          updateBlock(block.id, { ingredientsList: updatedIngredients })
                                        }}
                                        type="button"
                                      >
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        Remove
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                            <Button
                              variant="outline"
                              onClick={() => {
                                const newIngredient = {
                                  id: uuidv4(),
                                  number: block.ingredientsList.length + 1,
                                  name: "New Ingredient",
                                  imageUrl: "",
                                  description: "Description of the ingredient...",
                                  blockId: block.id,
                                }
                                updateBlock(block.id, { ingredientsList: [...block.ingredientsList, newIngredient] })
                              }}
                              type="button"
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Add Ingredient
                            </Button>
                          </div>
                        </div>
                      )}

                      {block.type === "cta" && (
                        <div className="space-y-4 p-4 border rounded-md bg-gray-50">
                          <div className="space-y-2">
                            <Label>CTA Text</Label>
                            <Input
                              value={block.ctaText || ""}
                              onChange={(e) => updateBlock(block.id, { ctaText: e.target.value })}
                              placeholder="Enter CTA text..."
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Button Text</Label>
                            <Input
                              value={block.ctaButtonText || ""}
                              onChange={(e) => updateBlock(block.id, { ctaButtonText: e.target.value })}
                              placeholder="Enter button text..."
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Button Link</Label>
                            <Input
                              value={block.ctaButtonLink || ""}
                              onChange={(e) => updateBlock(block.id, { ctaButtonLink: e.target.value })}
                              placeholder="Enter button link..."
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Block controls - only delete and AI generation */}
                <div className="absolute -right-12 top-1/2 transform -translate-y-1/2 flex flex-col space-y-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full bg-white"
                        onClick={() => deleteBlock(block.id)}
                        type="button"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="left">
                      <p>Delete block</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full bg-white"
                        onClick={() => generateAIContent(block.id)}
                        disabled={isGenerating}
                        type="button"
                      >
                        <Sparkles className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="left">
                      <p>Generate AI content</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </div>
          ))}

          {/* Add first block if no blocks exist */}
          {blocks.length === 0 && (
            <div className="flex justify-center p-8">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" type="button">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    <span>Add your first block</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center">
                  <DropdownMenuItem onClick={() => addBlock("paragraph", -1)}>
                    <AlignLeft className="h-4 w-4 mr-2" />
                    <span>Paragraph</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => addBlock("heading", -1)}>
                    <Heading2 className="h-4 w-4 mr-2" />
                    <span>Heading</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => addBlock("rating", -1)}>
                    <Star className="h-4 w-4 mr-2" />
                    <span>Product Rating</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => addBlock("bullet-list", -1)}>
                    <List className="h-4 w-4 mr-2" />
                    <span>Bullet Points</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => addBlock("faq", -1)}>
                    <HelpCircle className="h-4 w-4 mr-2" />
                    <span>FAQ Section</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => addBlock("specifications", -1)}>
                    <Settings className="h-4 w-4 mr-2" />
                    <span>Specifications</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}

        {/* Add block at the end */}
        {blocks.length > 0 && (
          <div className="flex justify-center p-4 border-t border-gray-200 mt-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" type="button">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  <span>Add Block Below</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center">
                <DropdownMenuItem onClick={() => addBlock("paragraph", blocks.length - 1)}>
                  <AlignLeft className="h-4 w-4 mr-2" />
                  <span>Paragraph</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => addBlock("heading", blocks.length - 1)}>
                  <Heading2 className="h-4 w-4 mr-2" />
                  <span>Heading</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => addBlock("image", blocks.length - 1)}>
                  <ImageIcon className="h-4 w-4 mr-2" />
                  <span>Image</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => addBlock("rating", blocks.length - 1)}>
                  <Star className="h-4 w-4 mr-2" />
                  <span>Product Rating</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => addBlock("pros-cons", blocks.length - 1)}>
                  <div className="flex items-center">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    <ThumbsDown className="h-4 w-4 mr-2" />
                  </div>
                  <span>Pros & Cons</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => addBlock("ingredients", blocks.length - 1)}>
                  <Star className="h-4 w-4 mr-2" />
                  <span>Ingredients</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => addBlock("cta", blocks.length - 1)}>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  <span>Call to Action</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => addBlock("bullet-list", blocks.length - 1)}>
                  <List className="h-4 w-4 mr-2" />
                  <span>Bullet Points</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => addBlock("faq", blocks.length - 1)}>
                  <HelpCircle className="h-4 w-4 mr-2" />
                  <span>FAQ Section</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => addBlock("specifications", blocks.length - 1)}>
                  <Settings className="h-4 w-4 mr-2" />
                  <span>Specifications</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </TooltipProvider>
  )
}
