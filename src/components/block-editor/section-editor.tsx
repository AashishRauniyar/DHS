/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import type React from "react"
import { useState, useRef } from "react"
import { v4 as uuidv4 } from "uuid"
import { PlusCircle, Trash2, MoveUp, MoveDown, GripVertical, Copy, Edit2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { toast } from "@/hooks/use-toast"
import type { Section, Block } from "@/types/article"
import { BlockEditor } from "./block-editor"

interface SectionEditorProps {
  sections: Section[]
  onChange: (sections: Section[]) => void
}

export function SectionEditor({ sections, onChange }: SectionEditorProps) {
  const [draggedSection, setDraggedSection] = useState<number | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)
  const [copiedSection, setCopiedSection] = useState<Section | null>(null)
  const [editingTitle, setEditingTitle] = useState<string | null>(null)
  const sectionRefs = useRef<{ [key: number]: HTMLDivElement | null }>({})

  const addSection = (index: number) => {
    const newSection: Section = {
      id: uuidv4(),
      title: "New Section",
      order: index + 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      articleId: sections[0]?.articleId || "",
      blocks: [
        {
          id: uuidv4(),
          type: "heading",
          level: 2,
          content: "New Section",
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
          id: uuidv4(),
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
    }

    // Update sectionId for blocks
    newSection.blocks = newSection.blocks.map((block) => ({
      ...block,
      sectionId: newSection.id,
    }))

    const newSections = [...sections]
    newSections.splice(index + 1, 0, newSection)

    // Update order for all sections
    newSections.forEach((section, idx) => {
      section.order = idx
    })

    onChange(newSections)
  }

  const updateSection = (index: number, updates: Partial<Section>) => {
    const newSections = [...sections]
    newSections[index] = { ...newSections[index], ...updates, updatedAt: new Date() }
    onChange(newSections)
  }

  const updateSectionBlocks = (index: number, blocks: Block[]) => {
    const section = sections[index]
    const updatedBlocks = blocks.map((block) => ({
      ...block,
      sectionId: section.id,
    }))

    updateSection(index, { blocks: updatedBlocks })
  }

  const deleteSection = (index: number) => {
    if (sections.length <= 1) {
      toast({
        title: "Cannot delete",
        description: "You need at least one section",
        variant: "destructive",
      })
      return
    }
    const newSections = [...sections]
    newSections.splice(index, 1)

    // Update order for remaining sections
    newSections.forEach((section, idx) => {
      section.order = idx
    })

    onChange(newSections)
  }

  const moveSection = (index: number, direction: "up" | "down") => {
    if ((direction === "up" && index === 0) || (direction === "down" && index === sections.length - 1)) {
      return
    }

    const newSections = [...sections]
    const newIndex = direction === "up" ? index - 1 : index + 1
    const [movedSection] = newSections.splice(index, 1)
    newSections.splice(newIndex, 0, movedSection)

    // Update order for all sections
    newSections.forEach((section, idx) => {
      section.order = idx
    })

    onChange(newSections)
  }

  const moveSectionToPosition = (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) return

    const newSections = [...sections]
    const [movedSection] = newSections.splice(fromIndex, 1)
    newSections.splice(toIndex, 0, movedSection)

    // Update order for all sections
    newSections.forEach((section, idx) => {
      section.order = idx
    })

    onChange(newSections)
  }

  const copySection = (index: number) => {
    const sectionToClone = sections[index]

    // Deep clone the section to avoid reference issues
    const clonedSection: Section = {
      ...sectionToClone,
      id: uuidv4(),
      title: `${sectionToClone.title} (Copy)`,
      createdAt: new Date(),
      updatedAt: new Date(),
      blocks: sectionToClone.blocks.map((block) => ({
        ...block,
        id: uuidv4(),
        sectionId: "", // Will be set when pasted
        pros: block.pros.map((pro) => ({ ...pro, id: uuidv4() })),
        cons: block.cons.map((con) => ({ ...con, id: uuidv4() })),
        ingredients: block.ingredients.map((ingredient) => ({ ...ingredient, id: uuidv4() })),
        highlights: block.highlights.map((highlight) => ({ ...highlight, id: uuidv4() })),
        customFields: block.customFields.map((field) => ({ ...field, id: uuidv4() })),
        ingredientsList: block.ingredientsList.map((ingredient) => ({ ...ingredient, id: uuidv4() })),
        bulletPoints: block.bulletPoints.map((point) => ({ ...point, id: uuidv4() })),
        faqItems: block.faqItems.map((faq) => ({ ...faq, id: uuidv4() })),
        specifications: block.specifications.map((spec) => ({ ...spec, id: uuidv4() })),
        ratings: block.ratings ? { ...block.ratings, id: uuidv4() } : undefined,
      })),
    }

    setCopiedSection(clonedSection)
    toast({
      title: "Section copied",
      description: "You can now paste this section anywhere",
    })
  }

  const pasteSection = (index: number) => {
    if (!copiedSection) return

    const pastedSection = {
      ...copiedSection,
      id: uuidv4(),
      order: index + 1,
      articleId: sections[0]?.articleId || "",
      blocks: copiedSection.blocks.map((block) => ({
        ...block,
        id: uuidv4(),
        sectionId: uuidv4(), // Will be updated after section is created
      })),
    }

    // Update sectionId for all blocks
    pastedSection.blocks = pastedSection.blocks.map((block) => ({
      ...block,
      sectionId: pastedSection.id,
    }))

    const newSections = [...sections]
    newSections.splice(index + 1, 0, pastedSection)

    // Update order for all sections
    newSections.forEach((section, idx) => {
      section.order = idx
    })

    onChange(newSections)

    toast({
      title: "Section pasted",
      description: "The copied section has been pasted",
    })
  }

  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData("text/plain", index.toString())
    e.dataTransfer.effectAllowed = "move"
    setDraggedSection(index)

    // Add a delay to set a visual cue for the dragged element
    setTimeout(() => {
      if (sectionRefs.current[index]) {
        sectionRefs.current[index]?.classList.add("opacity-50")
      }
    }, 0)
  }

  const handleDragEnd = () => {
    // Remove visual cues
    if (draggedSection !== null && sectionRefs.current[draggedSection]) {
      sectionRefs.current[draggedSection]?.classList.remove("opacity-50")
    }

    setDraggedSection(null)
    setDragOverIndex(null)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"

    if (dragOverIndex !== index) {
      setDragOverIndex(index)
    }
  }

  const handleDrop = (e: React.DragEvent, toIndex: number) => {
    e.preventDefault()

    const fromIndex = Number.parseInt(e.dataTransfer.getData("text/plain"), 10)
    if (isNaN(fromIndex) || fromIndex === toIndex) return

    moveSectionToPosition(fromIndex, toIndex)

    setDraggedSection(null)
    setDragOverIndex(null)
  }

  const handleTitleEdit = (index: number, newTitle: string) => {
    updateSection(index, { title: newTitle })

    // Also update the heading block if it exists
    const section = sections[index]
    const headingBlock = section.blocks.find((block) => block.type === "heading")
    if (headingBlock) {
      const updatedBlocks = section.blocks.map((block) =>
        block.id === headingBlock.id ? { ...block, content: newTitle } : block,
      )
      updateSectionBlocks(index, updatedBlocks)
    }

    setEditingTitle(null)
  }

  return (
    <TooltipProvider>
      <div className="space-y-1">
        {sections.map((section, index) => (
          <div key={section.id} className="relative group">
            {/* Floating add button between sections */}
            <div
              className="absolute left-1/2 -top-3 transform -translate-x-1/2 z-10 opacity-0 group-hover:opacity-100 hover:opacity-100 transition-opacity"
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <div className="flex space-x-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-6 w-6 rounded-full bg-white shadow-md"
                      onClick={() => addSection(index - 1)}
                      type="button"
                    >
                      <PlusCircle className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add new section</p>
                  </TooltipContent>
                </Tooltip>

                {copiedSection && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6 rounded-full bg-white shadow-md"
                        onClick={() => pasteSection(index - 1)}
                        type="button"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                        >
                          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                          <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                        </svg>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Paste copied section</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
            </div>

            <div
              ref={(el) => {
                sectionRefs.current[index] = el
              }}
              className={`relative ${dragOverIndex === index ? "border-t-4 border-blue-500" : ""}`}
              draggable={true}
              onDragStart={(e) => handleDragStart(e, index)}
              onDragEnd={handleDragEnd}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={(e) => handleDrop(e, index)}
              tabIndex={0}
            >
              <Card className="border-2 border-dashed border-gray-200 hover:border-gray-300 transition-colors mb-2">
                <CardHeader className="pb-2">
                  {/* Drag handle */}
                  <div className="absolute left-0 top-0 bottom-0 w-8 flex flex-col items-center justify-center cursor-move opacity-0 group-hover:opacity-100 transition-opacity">
                    <GripVertical className="h-5 w-5 text-gray-400" />
                  </div>

                  <CardTitle className="text-sm text-gray-600 ml-6 flex items-center gap-2">
                    <span>Section {index + 1}:</span>
                    {editingTitle === section.id ? (
                      <Input
                        value={section.title}
                        onChange={(e) => updateSection(index, { title: e.target.value })}
                        onBlur={() => setEditingTitle(null)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleTitleEdit(index, section.title)
                          }
                          if (e.key === "Escape") {
                            setEditingTitle(null)
                          }
                        }}
                        className="h-6 text-sm"
                        autoFocus
                      />
                    ) : (
                      <span
                        className="cursor-pointer hover:text-blue-600 flex items-center gap-1"
                        onClick={() => setEditingTitle(section.id)}
                      >
                        {section.title}
                        <Edit2 className="h-3 w-3 opacity-0 group-hover:opacity-100" />
                      </span>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 ml-6">
                  <BlockEditor
                    blocks={section.blocks}
                    onChange={(blocks: Block[]) => updateSectionBlocks(index, blocks)}
                    sectionId={section.id}
                  />
                </CardContent>
              </Card>

              {/* Section controls */}
              <div className="absolute -left-12 top-1/2 transform -translate-y-1/2 flex flex-col space-y-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full bg-white"
                      onClick={() => moveSection(index, "up")}
                      disabled={index === 0}
                      type="button"
                    >
                      <MoveUp className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="left">
                    <p>Move section up</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full bg-white"
                      onClick={() => moveSection(index, "down")}
                      disabled={index === sections.length - 1}
                      type="button"
                    >
                      <MoveDown className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="left">
                    <p>Move section down</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full bg-white"
                      onClick={() => copySection(index)}
                      type="button"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="left">
                    <p>Copy section</p>
                  </TooltipContent>
                </Tooltip>

                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-white"
                  onClick={() => deleteSection(index)}
                  disabled={sections.length <= 1}
                  type="button"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}

        {/* Add first section if none exist */}
        {sections.length === 0 && (
          <div className="flex justify-center p-8">
            <Button variant="outline" onClick={() => addSection(-1)} type="button">
              <PlusCircle className="h-4 w-4 mr-2" />
              <span>Add your first section</span>
            </Button>
          </div>
        )}

        {/* Add section at the end */}
        {sections.length > 0 && (
          <div className="flex justify-center p-4 border-t border-gray-200 mt-4">
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => addSection(sections.length - 1)} type="button">
                <PlusCircle className="h-4 w-4 mr-2" />
                <span>Add Section Below</span>
              </Button>

              {copiedSection && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" onClick={() => pasteSection(sections.length - 1)} type="button">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 mr-2"
                      >
                        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                      </svg>
                      Paste Section Below
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Paste copied section at the end</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
          </div>
        )}
      </div>
    </TooltipProvider>
  )
}
