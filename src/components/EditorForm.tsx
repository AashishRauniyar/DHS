"use client"

import type React from "react"

import { useState } from "react"
import { SimpleEditor } from "./SimpleEditor"

export function EditorForm() {
  const [content, setContent] = useState("<p>Start typing your content here...</p>")
  const [savedContent, setSavedContent] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800))

    setSavedContent(content)
    setIsSaving(false)
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-sm border">
      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="editor" className="text-sm font-medium">
              Content Editor
            </label>
            <SimpleEditor initialValue={content} onChange={(value) => setContent(value)} />
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save Content"}
          </button>

          {savedContent && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Saved Content:</h3>
              <div className="p-4 border rounded-md bg-gray-50" dangerouslySetInnerHTML={{ __html: savedContent }} />
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
