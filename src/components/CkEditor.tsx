/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";

interface CKEditorProps {
  data: string;
  onChange: (event: any, editor: any) => void;
}

export default function CKEditorComponent({ data, onChange }: CKEditorProps) {
  const [editor, setEditor] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadEditor = async () => {
      try {
        // Import the CKEditor packages
        const editorModule = await import('@ckeditor/ckeditor5-react');
        
        // Use the free community version instead of premium
        const ClassicEditorModule = await import('@ckeditor/ckeditor5-build-classic');
        
        // Set the editor components in state
        setEditor({
          CKEditor: editorModule.CKEditor,
          ClassicEditor: ClassicEditorModule.default
        });
        
        setIsLoaded(true);
      } catch (error) {
        console.error("Failed to load CKEditor:", error);
      }
    };

    loadEditor();
  }, []);

  // Display loading state
  if (!isLoaded || !editor) {
    return (
      <div className="border border-gray-300 rounded-md p-4 h-64 flex items-center justify-center">
        <div className="animate-spin h-6 w-6 border-2 border-blue-500 border-t-transparent rounded-full mr-2"></div>
        <p>Loading editor...</p>
      </div>
    );
  }

  return (
    <div className="border border-gray-300 rounded-md overflow-hidden">
      <editor.CKEditor
        editor={editor.ClassicEditor}
        data={data}
        onChange={onChange}
        config={{
          // Use a simpler toolbar configuration
          toolbar: {
            items: [
              'heading',
              '|',
              'bold',
              'italic',
              'link',
              'bulletedList',
              'numberedList',
              '|',
              'uploadImage',
              'blockQuote',
              'insertTable',
              '|',
              'undo',
              'redo'
            ]
          },
          // Disable any features that might require a license
          licenseKey: 'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NDc4NzE5OTksImp0aSI6ImY4NmNhODc4LWNkMmQtNGJjNC1hNzRjLTcwNzdkYWI5Y2M5OCIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6IjM2M2UzZDljIn0.-BsYaD6d0a3Nf6eJPhY5Dw0oB0X9NhrEf4M4mfk5uzbxyHUQFwEptfru4rEDM4vsyg7csCeth8o1L8muN8RU9Q',
          // Add placeholder if content is empty
          placeholder: 'Type your content here...'
        }}
      />
    </div>
  );
}