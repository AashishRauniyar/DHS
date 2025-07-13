"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

// Create a placeholder loading component
const EditorLoading = () => (
  <div className="border rounded-md p-4 min-h-[200px] bg-gray-50 flex items-center justify-center">
    <div className="animate-pulse text-gray-500">Loading editor...</div>
  </div>
)

// Dynamically import the CKEditor component with no SSR
const CKEditor = dynamic(() => import("./CkEditorLoader").then((mod) => mod.default), {
  ssr: false,
  loading: () => <EditorLoading />,
})

interface RichTextEditorProps {
  initialData?: string
  onChange?: (data: string) => void
  placeholder?: string
}

export default function RichTextEditor({
  initialData = "<p>Start typing your content here...</p>",
  onChange,
  placeholder,
}: RichTextEditorProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <EditorLoading />
  }

  return (
    <div className="rich-text-editor">
      <CKEditor initialData={initialData} onChange={onChange} placeholder={placeholder} />
    </div>
  )
}
