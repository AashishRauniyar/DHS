// "use client"

// import { useState, useEffect } from "react"
// import dynamic from "next/dynamic"


// // Dynamically import the editor with no SSR
// const CKEditorComponent = dynamic(() => import("./CkEditor").then((mod) => mod.CKEditorComponent), {
//   ssr: false,
//   loading: () => <div className="border rounded-md p-4 min-h-[200px] bg-gray-50">Loading editor...</div>,
// })


// interface EditorWrapperProps {
//   initialData?: string
//   onChange?: (data: string) => void
// }

// export function EditorWrapper({ initialData = "<p>Hello world!</p>", onChange }: EditorWrapperProps) {
//   const [isMounted, setIsMounted] = useState(false)

//   // Ensure we only render the editor on the client side
//   useEffect(() => {
//     setIsMounted(true)
//   }, [])

//   if (!isMounted) {
//     return <div className="border rounded-md p-4 min-h-[200px] bg-gray-50">Loading editor...</div>
//   }


