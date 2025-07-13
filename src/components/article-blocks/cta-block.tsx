import { Button } from "@/components/ui/button"

interface CTABlockProps {
  block: {
    id: string
    ctaText?: string
    ctaButtonText?: string
    ctaButtonLink?: string
    backgroundColor?: string
  }
}

export function CTABlock({ block }: CTABlockProps) {
  const bgColor = block.backgroundColor || "bg-blue-50"

  return (
    <div className={`${bgColor} p-6 rounded-lg text-center my-8`}>
      {block.ctaText && <p className="text-lg font-medium mb-4">{block.ctaText}</p>}

      {block.ctaButtonText && (
        <Button asChild size="lg" className="font-medium">
          <a href={block.ctaButtonLink || "#"} target="_blank" rel="noopener noreferrer">
            {block.ctaButtonText}
          </a>
        </Button>
      )}
    </div>
  )
}
