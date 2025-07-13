"use client"

import {
  AlignLeft,
  Heading2,
  ImageIcon,
  Quote,
  List,
  Code,
  ExternalLink,
  Star,
  ThumbsUp,
  HelpCircle,
  Settings,
  Sparkles,
} from "lucide-react"
import type { BlockType } from "@/types/article"

interface BlockTypeIndicatorProps {
  type: BlockType
  className?: string
}

export function BlockTypeIndicator({ type, className = "h-4 w-4" }: BlockTypeIndicatorProps) {
  const getIcon = () => {
    switch (type) {
      case "paragraph":
        return <AlignLeft className={className} />
      case "heading":
        return <Heading2 className={className} />
      case "image":
        return <ImageIcon className={className} />
      case "quote":
        return <Quote className={className} />
      case "list":
        return <List className={className} />
      case "bullet-list":
        return <List className={className} />
      case "code":
        return <Code className={className} />
      case "cta":
        return <ExternalLink className={className} />
      case "rating":
        return <Star className={className} />
      case "pros-cons":
        return <ThumbsUp className={className} />
      case "ingredients":
        return <Sparkles className={className} />
      case "specifications":
        return <Settings className={className} />
      case "faq":
        return <HelpCircle className={className} />
      default:
        return <AlignLeft className={className} />
    }
  }

  return getIcon()
}
