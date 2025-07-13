/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { type NextRequest, NextResponse } from "next/server"
import { v2 as cloudinary } from "cloudinary"

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Transformation presets for different image types
const TRANSFORMATION_PRESETS = {
  hero: {
    width: 1200,
    height: 800,
    crop: "fill",
    gravity: "auto",
    quality: "auto",
    fetch_format: "auto",
  },
  article: {
    width: 800,
    height: 600,
    crop: "fill",
    gravity: "auto",
    quality: "auto",
    fetch_format: "auto",
  },
  ingredient: {
    width: 300,
    height: 300,
    crop: "fill",
    gravity: "center",
    quality: "auto",
    fetch_format: "auto",
    background: "white",
  },
  thumbnail: {
    width: 400,
    height: 300,
    crop: "fill",
    gravity: "auto",
    quality: "auto",
    fetch_format: "auto",
  },
  general: {
    width: 800,
    height: 600,
    crop: "fill",
    gravity: "auto",
    quality: "auto",
    fetch_format: "auto",
  },
} as const

// Helper function to get folder path by preset
function getFolderByPreset(preset: string): string {
  const folderMapping = {
    hero: "health-articles/hero-images",
    article: "health-articles/supplements",
    ingredient: "health-articles/ingredients",
    thumbnail: "health-articles/thumbnails",
    general: "health-articles/general",
  }
  return folderMapping[preset as keyof typeof folderMapping] || folderMapping.general
}

// Helper function to generate image variants
function generateImageVariants(publicId: string, preset: string) {
  const baseUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`

  return {
    original: `${baseUrl}/${publicId}`,
    optimized: `${baseUrl}/q_auto,f_auto/${publicId}`,
    thumbnail: `${baseUrl}/w_200,h_150,c_fill,q_auto,f_auto/${publicId}`,
    medium: `${baseUrl}/w_600,h_450,c_fill,q_auto,f_auto/${publicId}`,
    large: `${baseUrl}/w_1200,h_900,c_fill,q_auto,f_auto/${publicId}`,
    square_small: `${baseUrl}/w_150,h_150,c_fill,q_auto,f_auto/${publicId}`,
    square_medium: `${baseUrl}/w_300,h_300,c_fill,q_auto,f_auto/${publicId}`,
    webp_thumbnail: `${baseUrl}/w_200,h_150,c_fill,q_auto,f_webp/${publicId}`,
    webp_medium: `${baseUrl}/w_600,h_450,c_fill,q_auto,f_webp/${publicId}`,
    placeholder: `${baseUrl}/w_50,h_50,c_fill,q_auto,f_auto,e_blur:1000/${publicId}`,
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check if Cloudinary is configured
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      console.error("Cloudinary configuration missing")
      return NextResponse.json(
        {
          success: false,
          error: "Cloudinary configuration is missing. Please check your environment variables.",
        },
        { status: 500 },
      )
    }

    // Parse the form data
    const formData = await request.formData()
    const file = formData.get("file") as File | null
    const preset = formData.get("preset") as string | null
    const imageType = formData.get("imageType") as string | null

    console.log("Cloudinary upload request:", {
      hasFile: !!file,
      fileName: file?.name,
      fileSize: file?.size,
      fileType: file?.type,
      preset,
      imageType,
    })

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          error: "No file provided",
        },
        { status: 400 },
      )
    }

    // Validate file type
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"]
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid file type. Please upload JPG, PNG, WebP or GIF images only.",
        },
        { status: 400 },
      )
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        {
          success: false,
          error: "File size too large. Maximum size is 10MB.",
        },
        { status: 400 },
      )
    }

    const finalImageType = imageType || preset || "general"
    const folder = getFolderByPreset(finalImageType)
    const transformation =
      TRANSFORMATION_PRESETS[finalImageType as keyof typeof TRANSFORMATION_PRESETS] || TRANSFORMATION_PRESETS.general

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    console.log("Uploading to Cloudinary with config:", {
      folder,
      transformation,
      imageType: finalImageType,
    })

    // Upload to Cloudinary
    const uploadResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: folder,
            resource_type: "image",
            transformation: [transformation],
            tags: ["health-article", finalImageType],
            context: {
              imageType: finalImageType,
              preset: finalImageType,
            },
            // Generate eager transformations for common sizes
            eager: [
              { width: 200, height: 150, crop: "fill", quality: "auto", fetch_format: "auto" },
              { width: 600, height: 450, crop: "fill", quality: "auto", fetch_format: "auto" },
              { width: 300, height: 300, crop: "fill", quality: "auto", fetch_format: "auto" },
            ],
            eager_async: false,
          },
          (error, result) => {
            if (error) {
              console.error("Cloudinary upload error:", error)
              reject(error)
            } else {
              console.log("Cloudinary upload success:", result)
              resolve(result)
            }
          },
        )
        .end(buffer)
    })

    const result = uploadResponse as any

    if (!result || !result.public_id) {
      throw new Error("Upload failed - no result from Cloudinary")
    }

    // Generate image variants
    const variants = generateImageVariants(result.public_id, finalImageType)

    // Prepare response
    const response = {
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
      folder: folder,
      preset: finalImageType,
      variants: variants,
      metadata: {
        width: result.width,
        height: result.height,
        format: result.format,
        bytes: result.bytes,
        asset_id: result.asset_id,
        version: result.version,
        created_at: result.created_at,
        tags: result.tags,
        folder_type: finalImageType,
        imageType: finalImageType,
        preset: finalImageType,
      },
      eager: result.eager || [],
    }

    console.log("Returning successful upload response:", {
      url: response.url,
      publicId: response.publicId,
      dimensions: `${result.width}x${result.height}`,
    })

    return NextResponse.json(response)
  } catch (error) {
    console.error("Cloudinary API error:", error)

    let errorMessage = "Failed to upload image"
    if (error instanceof Error) {
      errorMessage = error.message
    }

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        details: process.env.NODE_ENV === "development" ? error : undefined,
      },
      { status: 500 },
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const preset = searchParams.get("preset")
    const imageType = searchParams.get("imageType")

    // Check if Cloudinary is configured
    if (!process.env.CLOUDINARY_CLOUD_NAME) {
      return NextResponse.json(
        {
          success: false,
          error: "Cloudinary configuration is missing",
        },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      message: "Cloudinary API is configured and ready",
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      timestamp: new Date().toISOString(),
      params: { preset, imageType },
      availablePresets: Object.keys(TRANSFORMATION_PRESETS),
    })
  } catch (error) {
    console.error("Error in GET endpoint:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to process request",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Check if Cloudinary is configured
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      return NextResponse.json(
        {
          success: false,
          error: "Cloudinary configuration is missing",
        },
        { status: 500 },
      )
    }

    const { searchParams } = new URL(request.url)
    const publicId = searchParams.get("publicId")

    if (!publicId) {
      return NextResponse.json(
        {
          success: false,
          error: "Public ID is required",
        },
        { status: 400 },
      )
    }

    console.log("Deleting from Cloudinary:", publicId)

    // Delete from Cloudinary
    const deleteResponse = await cloudinary.uploader.destroy(publicId)

    console.log("Cloudinary delete response:", deleteResponse)

    if (deleteResponse.result === "ok") {
      return NextResponse.json({
        success: true,
        result: "ok",
        publicId: publicId,
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          error: `Failed to delete image: ${deleteResponse.result}`,
        },
        { status: 400 },
      )
    }
  } catch (error) {
    console.error("Error in delete endpoint:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete file",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
