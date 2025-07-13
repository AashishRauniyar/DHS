"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { BlockTypeIndicator } from "./block-type-indicator"
import type { Block, BlockType } from "@/types/article"

interface BlockConverterProps {
  block: Block
  onConvert: (type: BlockType) => void
}

// Block type categories for better organization
const BASIC_BLOCKS: { type: BlockType; label: string }[] = [
  { type: "paragraph", label: "Paragraph" },
  { type: "heading", label: "Heading" },
  { type: "image", label: "Image" },
  { type: "quote", label: "Quote" },
  { type: "list", label: "List" },
  { type: "bullet-list", label: "Bullet Points" },
  { type: "code", label: "Code" },
]

const PRODUCT_BLOCKS: { type: BlockType; label: string }[] = [
  { type: "rating", label: "Product Rating" },
  { type: "pros-cons", label: "Pros & Cons" },
  { type: "ingredients", label: "Ingredients" },
  { type: "specifications", label: "Specifications" },
  { type: "faq", label: "FAQ Section" },
]

const ACTION_BLOCKS: { type: BlockType; label: string }[] = [{ type: "cta", label: "Call to Action" }]

export function BlockConverter({ block, onConvert }: BlockConverterProps) {
  const [open, setOpen] = useState(false)

  const handleConvert = (type: BlockType) => {
    if (type === block.type) return
    onConvert(type)
    setOpen(false)
  }

  const isCurrentType = (type: BlockType) => type === block.type

  const renderMenuItem = (blockType: BlockType, label: string) => (
    <DropdownMenuItem
      key={blockType}
      onClick={() => handleConvert(blockType)}
      className={isCurrentType(blockType) ? "bg-accent" : ""}
      disabled={isCurrentType(blockType)}
    >
      <BlockTypeIndicator type={blockType} />
      <span className="ml-2">{label}</span>
      {isCurrentType(blockType) && <span className="ml-auto text-xs text-muted-foreground">Current</span>}
    </DropdownMenuItem>
  )

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-6 px-2 text-xs hover:bg-accent">
          <BlockTypeIndicator type={block.type} />
          <ChevronDown className="h-3 w-3 ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        {/* Basic Content Blocks */}
        <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">Basic Content</div>
        {BASIC_BLOCKS.map(({ type, label }) => renderMenuItem(type, label))}

        <DropdownMenuSeparator />

        {/* Product Review Blocks */}
        <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">Product Review</div>
        {PRODUCT_BLOCKS.map(({ type, label }) => renderMenuItem(type, label))}

        <DropdownMenuSeparator />

        {/* Action Blocks */}
        <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">Actions</div>
        {ACTION_BLOCKS.map(({ type, label }) => renderMenuItem(type, label))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
