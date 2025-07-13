/* eslint-disable @typescript-eslint/no-unused-vars */
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface FAQBlockProps {
  block: {
    id: string
    faqItems?: Array<{
      id: string
      question: string
      answer: string
      order: number
    }>
  }
}

export function FAQBlock({ block }: FAQBlockProps) {
  const faqs = block.faqItems || []

  // Sort by order
  const sortedFaqs = [...faqs].sort((a, b) => a.order - b.order)

  if (sortedFaqs.length === 0) {
    return null
  }

  return (
    <div className="my-6">
      <Accordion type="single" collapsible className="w-full">
        {sortedFaqs.map((faq, index) => (
          <AccordionItem key={faq.id} value={faq.id}>
            <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
            <AccordionContent>
              <div className="pt-2 pb-1">{faq.answer}</div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
