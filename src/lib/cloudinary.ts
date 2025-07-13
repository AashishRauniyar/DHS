import { v2 as cloudinary } from "cloudinary"

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Transformation presets for different image types
export const TRANSFORMATION_PRESETS = {
  // Article/supplement images
  article: {
    quality: "auto" as const,
    fetch_format: "auto" as const,
    width: 800,
    height: 600,
    crop: "fill" as const,
    gravity: "auto" as const,
  },

  // Ingredient images - smaller, square format
  ingredient: {
    quality: "auto" as const,
    fetch_format: "auto" as const,
    width: 300,
    height: 300,
    crop: "fill" as const,
    gravity: "center" as const,
    background: "white",
  },

  // Hero images - large, wide format
  hero: {
    quality: "auto" as const,
    fetch_format: "auto" as const,
    width: 1200,
    height: 800,
    crop: "fill" as const,
    gravity: "auto" as const,
  },

  // Thumbnail images
  thumbnail: {
    quality: "auto" as const,
    fetch_format: "auto" as const,
    width: 400,
    height: 300,
    crop: "fill" as const,
    gravity: "auto" as const,
  },

  // Default transformation
  general: {
    quality: "auto" as const,
    fetch_format: "auto" as const,
    width: 800,
    height: 600,
    crop: "fill" as const,
    gravity: "auto" as const,
  },
} as const

// Generate image variants for different use cases
export function generateImageVariants(publicId: string) {
  const baseUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`

  return {
    // Original
    original: `${baseUrl}/${publicId}`,

    // Optimized versions
    optimized: `${baseUrl}/q_auto,f_auto/${publicId}`,

    // Different sizes
    thumbnail: `${baseUrl}/w_400,h_300,c_fill,q_auto,f_auto/${publicId}`,
    medium: `${baseUrl}/w_800,h_600,c_fill,q_auto,f_auto/${publicId}`,
    large: `${baseUrl}/w_1200,h_800,c_fill,q_auto,f_auto/${publicId}`,

    // Square versions (good for ingredients)
    square_small: `${baseUrl}/w_150,h_150,c_fill,q_auto,f_auto/${publicId}`,
    square_medium: `${baseUrl}/w_300,h_300,c_fill,q_auto,f_auto/${publicId}`,
    square_large: `${baseUrl}/w_600,h_600,c_fill,q_auto,f_auto/${publicId}`,

    // WebP versions for better performance
    webp_thumbnail: `${baseUrl}/w_400,h_300,c_fill,q_auto,f_webp/${publicId}`,
    webp_medium: `${baseUrl}/w_800,h_600,c_fill,q_auto,f_webp/${publicId}`,

    // Blurred placeholder for loading states
    placeholder: `${baseUrl}/w_50,h_50,c_fill,q_auto,f_auto,e_blur:1000/${publicId}`,
  }
}

// Helper function to get folder path by preset
export function getFolderByPreset(preset: string): string {
  const folderMapping = {
    article: "health-articles/supplements",
    ingredient: "health-articles/ingredients",
    hero: "health-articles/hero-images",
    thumbnail: "health-articles/thumbnails",
    general: "health-articles/general",
  }

  return folderMapping[preset as keyof typeof folderMapping] || folderMapping.general
}

// Helper function to get optimized URL for specific use case
export function getOptimizedImageUrl(
  publicId: string,
  preset: keyof typeof TRANSFORMATION_PRESETS = "general",
): string {
  const transformation = TRANSFORMATION_PRESETS[preset]
  const baseUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`

  // Build transformation string
  const transformParams = Object.entries(transformation)
    .map(([key, value]) => {
      // Convert camelCase to snake_case for Cloudinary
      const cloudinaryKey = key.replace(/([A-Z])/g, "_$1").toLowerCase()
      return `${cloudinaryKey}_${value}`
    })
    .join(",")

  return `${baseUrl}/${transformParams}/${publicId}`
}

// Helper function to extract public ID from Cloudinary URL
export function extractPublicIdFromUrl(url: string): string | null {
  try {
    const urlParts = url.split("/")
    const uploadIndex = urlParts.findIndex((part) => part === "upload")

    if (uploadIndex === -1) return null

    // Get everything after 'upload' and any transformation parameters
    const afterUpload = urlParts.slice(uploadIndex + 1)

    // Skip transformation parameters (they contain underscores and specific patterns)
    const publicIdParts = afterUpload.filter(
      (part) =>
        !part.includes("_") ||
        (!part.startsWith("w_") &&
          !part.startsWith("h_") &&
          !part.startsWith("c_") &&
          !part.startsWith("q_") &&
          !part.startsWith("f_") &&
          !part.startsWith("e_")),
    )

    // Join the remaining parts and remove file extension
    const publicId = publicIdParts.join("/").replace(/\.[^/.]+$/, "")

    return publicId
  } catch (error) {
    console.error("Error extracting public ID from URL:", error)
    return null
  }
}

export default cloudinary
