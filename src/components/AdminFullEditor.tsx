/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"


import type React from "react";
import { useState, useEffect } from "react";
import { Save, Eye, ArrowLeft } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically import CKEditor with SSR disabled
// NOTE: Make sure the path matches exactly where your CKEditor component is located
const CKEditorComponent = dynamic(() => import("./CkEditor"), {
  ssr: false,
  loading: () => (
    <div className="border border-gray-300 rounded-md p-4 h-64 flex items-center justify-center">
      <div className="animate-spin h-6 w-6 border-2 border-blue-500 border-t-transparent rounded-full mr-2"></div>
      <p>Loading editor...</p>
    </div>
  ),
});

interface ArticleData {
  id?: string;
  title: string;
  content: string;
  status: "draft" | "published";
  publishDate: string;
  categories: string[];
  tags: string[];
}

interface ArticlePostFullEditorProps {
  initialData?: ArticleData;
  onBack?: () => void;
  onSave?: (data: ArticleData) => Promise<void>;
}

export default function ArticlePostFullEditor({
  initialData,
  onBack,
  onSave,
}: ArticlePostFullEditorProps) {
  const [isPreview, setIsPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editorContent, setEditorContent] = useState("");
  const [formData, setFormData] = useState<ArticleData>(
    initialData || {
      title: "",
      content: "",
      status: "draft",
      publishDate: new Date().toISOString().split("T")[0],
      categories: [],
      tags: [],
    }
  );

  // Initialize editor content from initialData if provided
  useEffect(() => {
    if (initialData) {
      // Create a full HTML document for the editor
      const fullContent = `
        <h1>${initialData.title}</h1>
        ${initialData.content}
      `;
      setEditorContent(fullContent);
    } else {
      // Set default content with placeholder
      setEditorContent("<h1>Your Article Title</h1><p>Start writing your content here...</p>");
    }
  }, [initialData]);

  // Handle editor content change
  const handleEditorChange = (event: any, editor: any) => {
    const data = editor.getData();
    console.log("Editor data:", data); // Debug log

    // Extract title from the content (assuming the first h1 is the title)
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = data;

    const titleElement = tempDiv.querySelector("h1");
    const title = titleElement ? titleElement.textContent || "" : "";

    // Remove the title from the content to get just the article body
    if (titleElement) {
      titleElement.remove();
    }

    const content = tempDiv.innerHTML.trim();

    setFormData((prev) => ({
      ...prev,
      title,
      content,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title) {
      alert("Please add a title (H1 heading) to your article");
      return;
    }

    setIsSaving(true);
    try {
      if (onSave) {
        await onSave(formData);
      } else {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log("Article saved:", formData);
        alert("Article saved successfully!");
      }
    } catch (error) {
      console.error("Error saving article:", error);
      alert("Error saving article. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  // Handle status change
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      status: e.target.value as "draft" | "published",
    }));
  };

  // Handle date change
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      publishDate: e.target.value,
    }));
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b flex justify-between items-center">
          <div className="flex items-center">
            {onBack && (
              <button
                onClick={onBack}
                className="mr-4 p-2 rounded-full hover:bg-gray-100"
                aria-label="Go back"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
            )}
            <h2 className="text-2xl font-bold">
              {initialData ? "Edit Article" : "Create New Article"}
            </h2>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <label
                htmlFor="status"
                className="text-sm font-medium text-gray-700"
              >
                Status:
              </label>
              <select
                id="status"
                value={formData.status}
                onChange={handleStatusChange}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <label
                htmlFor="publishDate"
                className="text-sm font-medium text-gray-700"
              >
                Date:
              </label>
              <input
                id="publishDate"
                type="date"
                value={formData.publishDate}
                onChange={handleDateChange}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>

            <button
              type="button"
              onClick={() => setIsPreview(!isPreview)}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center"
            >
              <Eye className="h-4 w-4 mr-2" />
              {isPreview ? "Edit" : "Preview"}
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSaving}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save {formData.status === "published" ? "& Publish" : "Draft"}
                </>
              )}
            </button>
          </div>
        </div>

        {isPreview ? (
          <div className="p-6">
            <div className="max-w-4xl mx-auto prose prose-lg">
              <h1>{formData.title}</h1>
              <div dangerouslySetInnerHTML={{ __html: formData.content }} />
            </div>
          </div>
        ) : (
          <div className="p-6">
            <div className="editor-container">
              <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                <p className="text-sm text-yellow-800">
                  <strong>Tip:</strong> Use H1 heading for the article title.
                  The first H1 heading will be extracted as the title.
                </p>
              </div>
              <CKEditorComponent data={editorContent} onChange={handleEditorChange} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}