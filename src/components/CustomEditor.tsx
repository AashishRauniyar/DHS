"use client"
import { CKEditor, useCKEditorCloud } from "@ckeditor/ckeditor5-react"

interface CustomEditorProps {
  initialData?: string
  onChange?: (data: string) => void
}

const CustomEditor = ({ initialData = "<p>Hello world!</p>", onChange }: CustomEditorProps) => {
  const cloud = useCKEditorCloud({
    version: "45.0.0",
    premium: true,
  })

  if (cloud.status === "error") {
    return <div className="p-4 text-red-500">Failed to load editor</div>
  }

  if (cloud.status === "loading") {
    return <div className="p-4">Loading editor...</div>
  }

  const { ClassicEditor, Essentials, Paragraph, Bold, Italic } = cloud.CKEditor

  const { FormatPainter } = cloud.CKEditorPremiumFeatures

  return (
    <div className="border rounded-md">
      <CKEditor
        editor={ClassicEditor}
        data={initialData}
        config={{
          // Use environment variable for license key
          licenseKey: process.env.NEXT_PUBLIC_CKEDITOR_LICENSE_KEY || "",
          plugins: [Essentials, Paragraph, Bold, Italic, FormatPainter],
          toolbar: ["undo", "redo", "|", "bold", "italic", "|", "formatPainter"],
        }}
        onChange={(event, editor) => {
          const data = editor.getData()
          onChange?.(data)
        }}
      />
    </div>
  )
}

export default CustomEditor
