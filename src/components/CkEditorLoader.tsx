/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from "react"
import { CKEditor } from "@ckeditor/ckeditor5-react"

interface CKEditorLoaderProps {
  initialData?: string
  onChange?: (data: string) => void
  placeholder?: string
}

export default function CKEditorLoader({
  initialData = "<p>Start typing your content here...</p>",
  onChange,
  placeholder,
}: CKEditorLoaderProps) {
  // Use any type for the editor since we're dynamically importing it
  const [editorModule, setEditorModule] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadEditor = async () => {
      try {
        setIsLoading(true)
        // Import the CKEditor build
        const ClassicEditor = await import("@ckeditor/ckeditor5-build-classic")
        setEditorModule(ClassicEditor.default)
        setIsLoading(false)
      } catch (err) {
        console.error("Failed to load CKEditor:", err)
        setError("Failed to load the editor. Please try again later.")
        setIsLoading(false)
      }
    }

    loadEditor()
  }, [])

  if (isLoading) {
    return (
      <div className="border rounded-md p-4 min-h-[200px] bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading editor...</div>
      </div>
    )
  }

  if (error || !editorModule) {
    return (
      <div className="border rounded-md p-4 min-h-[200px] bg-gray-50 flex items-center justify-center">
        <div className="text-red-500">{error || "Failed to load the editor"}</div>
      </div>
    )
  }

  return (
    <div className="ckeditor-container">
      <CKEditor
        editor={editorModule}
        data={initialData}
        config={{
          placeholder: placeholder,
          toolbar: [
            "heading",
            "|",
            "bold",
            "italic",
            "link",
            "|",
            "bulletedList",
            "numberedList",
            "|",
            "insertTable",
            "blockQuote",
            "|",
            "undo",
            "redo",
          ],
        }}
        onReady={(editor) => {
          console.log("CKEditor is ready to use!", editor)
        }}
        onChange={(event, editor) => {
          const data = editor.getData()
          onChange?.(data)
        }}
      />
      <style jsx global>{`
        .ck-editor__editable {
          min-height: 200px;
          max-height: 500px;
        }
        .ck.ck-editor {
          width: 100%;
        }
      `}</style>
    </div>
  )
}
