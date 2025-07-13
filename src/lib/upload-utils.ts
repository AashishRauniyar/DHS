/**
 * Utility function to upload a file to the server
 * @param file The file to upload
 * @returns The URL of the uploaded file
 * @throws Error if the upload fails
 */
export async function uploadFile(file: File): Promise<string> {
  if (!file) {
    throw new Error("No file provided")
  }

  // Create form data
  const formData = new FormData()
  formData.append("file", file)

  // Send the request
  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  })

  // Parse the response
  const data = await response.json()

  if (!response.ok) {
    console.error("Upload error response:", data)
    throw new Error(data.details || data.error || "Upload failed")
  }

  return data.url
}
