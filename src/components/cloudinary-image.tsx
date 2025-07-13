"use client"

import Image from "next/image"
import { useState } from "react"
import { ImageIcon } from "lucide-react"

interface CloudinaryImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
  fill?: boolean
  sizes?: string
  quality?: number
  placeholder?: "blur" | "empty"
  blurDataURL?: string
}

export function CloudinaryImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  fill = false,
  sizes,
  quality = 75,
  placeholder = "empty",
  blurDataURL,
}: CloudinaryImageProps) {
  const [imageError, setImageError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Handle image load error
  const handleError = () => {
    setImageError(true)
    setIsLoading(false)
  }

  // Handle image load success
  const handleLoad = () => {
    setIsLoading(false)
  }

  // If there's an error loading the image, show a fallback
  if (imageError) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 border border-gray-200 rounded ${className}`}
        style={{ width, height }}
      >
        <div className="text-center text-gray-500">
          <ImageIcon className="w-8 h-8 mx-auto mb-2" />
          <p className="text-sm">Image not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse rounded"
          style={{ width, height }}
        >
          <ImageIcon className="w-8 h-8 text-gray-400" />
        </div>
      )}
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        className={`${isLoading ? "opacity-0" : "opacity-100"} transition-opacity duration-300 ${
          fill ? "" : "w-96 h-52 ml-32"
        }`}
        priority={priority}
        sizes={sizes}
        quality={quality}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        onError={handleError}
        onLoad={handleLoad}
      />
    </div>
  )
}
