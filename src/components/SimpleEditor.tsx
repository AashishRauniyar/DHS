/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect } from "react"

interface SimpleEditorProps {
  initialValue?: string
  onChange?: (value: string) => void
}

export function SimpleEditor({ initialValue = "<p>Start typing...</p>", onChange }: SimpleEditorProps) {
  const [editorLoaded, setEditorLoaded] = useState(false)
  const [editorInstance, setEditorInstance] = useState<any>(null)

  // Load the editor only on the client side
  useEffect(() => {
    let isMounted = true

    const loadEditor = async () => {
      try {
        // Import both packages dynamically
        const [CKEditorModule, ClassicEditorModule] = await Promise.all([
          import("@ckeditor/ckeditor5-react"),
          import("@ckeditor/ckeditor5-build-classic"),
        ])

        // Only set state if component is still mounted
        if (isMounted) {
          // Store the actual components/classes we need
          const CKEditorComponent = CKEditorModule.CKEditor
          const ClassicEditor = ClassicEditorModule.default

          // Create an object with both needed parts
          setEditorInstance({
            CKEditor: CKEditorComponent,
            ClassicEditor: ClassicEditor,
          })

          setEditorLoaded(true)
        }
      } catch (error) {
        console.error("Error loading CKEditor:", error)
      }
    }

    loadEditor()

    // Cleanup function
    return () => {
      isMounted = false
    }
  }, [])

  if (!editorLoaded || !editorInstance) {
    return (
      <div className="border rounded-md p-4 min-h-[200px] bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading editor...</div>
      </div>
    )
  }

  const { CKEditor, ClassicEditor } = editorInstance

  return (
    <div className="ckeditor-container">
      <CKEditor
        editor={ClassicEditor}
        data={initialValue}
        config={{
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
        onChange={(event: any, editor: any) => {
          const data = editor.getData()
          if (onChange) onChange(data)
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
