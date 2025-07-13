/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import React from "react"
import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { toast } from "@/hooks/use-toast"
import { Upload, X, ImageIcon, Loader2, AlertCircle, Eye, ExternalLink, Settings } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { ImageUploadData } from "@/types/article"
import Image from 'next/image'

interface ImageUploaderProps {
  onUpload: (imageData: ImageUploadData) => void
  currentImage?: string
  preset?: string
  className?: string
  imageType?: "hero" | "article" | "ingredient" | "thumbnail" | "general"
  showPresetSelector?: boolean
  label?: string
}

// Enhanced image type configurations
const IMAGE_PRESETS = {
  hero: {
    label: "Hero Image",
    description: "Large banner image for article headers",
    dimensions: "1200×800px",
    aspectRatio: "3:2",
    maxSize: "5MB",
    icon: "🎯",
    bgGradient: "from-blue-500 to-purple-600",
    borderColor: "border-blue-200",
    textColor: "text-blue-700",
    useCase: "Article headers, banners",
  },
  article: {
    label: "Article Image",
    description: "Standard content image for article body",
    dimensions: "800×600px",
    aspectRatio: "4:3",
    maxSize: "3MB",
    icon: "📄",
    bgGradient: "from-green-500 to-blue-500",
    borderColor: "border-green-200",
    textColor: "text-green-700",
    useCase: "Content sections, illustrations",
  },
  ingredient: {
    label: "Ingredient Image",
    description: "Square image for ingredient showcase",
    dimensions: "300×300px",
    aspectRatio: "1:1",
    maxSize: "2MB",
    icon: "🧪",
    bgGradient: "from-orange-500 to-red-500",
    borderColor: "border-orange-200",
    textColor: "text-orange-700",
    useCase: "Product ingredients, supplements",
  },
  thumbnail: {
    label: "Thumbnail",
    description: "Small preview image for listings",
    dimensions: "400×300px",
    aspectRatio: "4:3",
    maxSize: "1MB",
    icon: "🖼️",
    bgGradient: "from-purple-500 to-pink-500",
    borderColor: "border-purple-200",
    textColor: "text-purple-700",
    useCase: "Card previews, galleries",
  },
  general: {
    label: "General Image",
    description: "Multi-purpose image for various uses",
    dimensions: "800×600px",
    aspectRatio: "4:3",
    maxSize: "3MB",
    icon: "📷",
    bgGradient: "from-gray-500 to-gray-600",
    borderColor: "border-gray-200",
    textColor: "text-gray-700",
    useCase: "General content, misc images",
  },
} as const

export function ImageUploader({
  onUpload,
  currentImage,
  preset = "article",
  className,
  imageType = "article",
  showPresetSelector = true,
  label,
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [dragActive, setDragActive] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedPreset, setSelectedPreset] = useState<keyof typeof IMAGE_PRESETS>(imageType)
  const [showFullPreview, setShowFullPreview] = useState(false)
  const [showPresetDetails, setShowPresetDetails] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const config = IMAGE_PRESETS[selectedPreset]

  // Clean up progress interval on unmount
  React.useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }
  }, [])

  const resetUploadState = useCallback(() => {
    setIsUploading(false)
    setUploadProgress(0)
    setError(null)
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
      progressIntervalRef.current = null
    }
  }, [])

  const simulateProgress = useCallback(() => {
    progressIntervalRef.current = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current)
          }
          return 90
        }
        return prev + Math.random() * 10
      })
    }, 200)
  }, [])

  const uploadToServer = async (file: File): Promise<ImageUploadData> => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("preset", selectedPreset)
    formData.append("imageType", selectedPreset)

    console.log(`Uploading ${selectedPreset} image: ${file.name} (${file.size} bytes)`)

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      console.log(`Response status: ${response.status}`)

      if (!response.ok) {
        const responseText = await response.text()
        console.error(`Upload error response:`, responseText)

        if (responseText.includes("<!DOCTYPE html>")) {
          throw new Error("API endpoint not found - check if /api/cloudinary route exists")
        }

        try {
          const errorData = JSON.parse(responseText)
          throw new Error(errorData.error || errorData.message || `Server error: ${response.status}`)
        } catch (parseError) {
          throw new Error(`Upload failed (${response.status}): ${responseText.substring(0, 100)}...`)
        }
      }

      const result = await response.json()
      console.log("Upload successful:", result)

      if (!result.success) {
        throw new Error(result.error || "Upload failed with unknown error")
      }

      return {
        url: result.url,
        publicId: result.publicId,
        variants: result.variants || {},
        metadata: {
          ...result.metadata,
          imageType: selectedPreset,
          preset: selectedPreset,
        },
      }
    } catch (error) {
      console.error("Upload failed:", error)
      throw error
    }
  }

  const validateFile = (file: File): string | null => {
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"]
    if (!validTypes.includes(file.type)) {
      return "Please upload JPG, PNG, WebP or GIF images only"
    }

    const maxSizeMap = {
      hero: 5 * 1024 * 1024,
      article: 3 * 1024 * 1024,
      ingredient: 2 * 1024 * 1024,
      thumbnail: 1 * 1024 * 1024,
      general: 3 * 1024 * 1024,
    }

    const maxSize = maxSizeMap[selectedPreset]
    if (file.size > maxSize) {
      return `File size exceeds ${config.maxSize} limit for ${config.label.toLowerCase()}`
    }

    return null
  }

  const handleFileSelect = async (file: File) => {
    if (!file) return

    resetUploadState()
    setError(null)

    const validationError = validateFile(file)
    if (validationError) {
      setError(validationError)
      toast({
        title: "Invalid file",
        description: validationError,
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)
    setUploadProgress(10)
    simulateProgress()

    try {
      const imageData = await uploadToServer(file)
      setUploadProgress(100)

      console.log("Calling onUpload with:", imageData)
      onUpload(imageData)

      toast({
        title: "Upload successful",
        description: `${config.label} has been uploaded and optimized.`,
      })
    } catch (error) {
      console.error("Upload error:", error)
      const errorMessage = error instanceof Error ? error.message : "Failed to upload image"
      setError(errorMessage)
      toast({
        title: "Upload failed",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setTimeout(() => {
        resetUploadState()
      }, 1000)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleRemoveImage = () => {
    onUpload({
      url: "",
      publicId: "",
      variants: {},
    })
  }

  const handlePresetChange = (newPreset: keyof typeof IMAGE_PRESETS) => {
    setSelectedPreset(newPreset)
    setError(null)
  }

  const isPlaceholder =
    !currentImage ||
    currentImage === "" ||
    currentImage.includes("placeholder.svg") ||
    currentImage.startsWith("data:") ||
    currentImage === "/placeholder.svg"

  const isRealImage = currentImage && !isPlaceholder

  return (
    <Card className={`w-full ${className}`}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className={`w-4 h-4 bg-gradient-to-r ${config.bgGradient} rounded`} />
          {label || "Image Upload"}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Preset Selector */}
        {showPresetSelector && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Image Type</Label>
              <Button type="button" variant="ghost" size="sm" onClick={() => setShowPresetDetails(!showPresetDetails)}>
                <Settings className="h-4 w-4 mr-2" />
                {showPresetDetails ? "Hide" : "Show"} Details
              </Button>
            </div>

            <Select value={selectedPreset} onValueChange={handlePresetChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select image type" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(IMAGE_PRESETS).map(([key, preset]) => (
                  <SelectItem key={key} value={key}>
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{preset.icon}</span>
                      <div className="flex flex-col">
                        <span className="font-medium">{preset.label}</span>
                        <span className="text-xs text-muted-foreground">{preset.dimensions}</span>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Preset Details */}
            {showPresetDetails && (
              <Card className={`border-2 ${config.borderColor} bg-gradient-to-r ${config.bgGradient} bg-opacity-5`}>
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">Dimensions</Label>
                      <p className="font-mono">{config.dimensions}</p>
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">Aspect Ratio</Label>
                      <p className="font-mono">{config.aspectRatio}</p>
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">Max Size</Label>
                      <p className="font-mono">{config.maxSize}</p>
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">Best For</Label>
                      <p>{config.useCase}</p>
                    </div>
                  </div>
                  <Separator className="my-3" />
                  <p className="text-sm text-muted-foreground">{config.description}</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Error Display */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Main Upload/Preview Area */}
        {isRealImage ? (
          /* Real Image Display */
          <div className="space-y-4">
            <div className="relative w-full h-64 bg-muted rounded-lg overflow-hidden border-2 border-dashed border-muted-foreground/25">
              <Image
                src={currentImage || "/placeholder.svg"}
                alt={`${config.label} preview`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                onLoad={() => console.log("Image loaded successfully:", currentImage)}
                onError={(e) => {
                  console.error("Image failed to load:", currentImage)
                  const target = e.currentTarget
                  target.style.display = "none"

                  const parent = target.parentElement
                  if (parent) {
                    const errorDiv = document.createElement("div")
                    errorDiv.className = "absolute inset-0 flex items-center justify-center bg-red-50 text-red-600"
                    errorDiv.innerHTML = `
                      <div class="text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="mx-auto mb-2">
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="12" y1="8" x2="12" y2="12"></line>
                          <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                        <p class="text-sm font-medium">Failed to load image</p>
                        <p class="text-xs">Try uploading again</p>
                      </div>
                    `
                    parent.appendChild(errorDiv)
                  }
                }}
              />

              {/* Image Overlay Info */}
              <div className="absolute top-3 left-3">
                <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
                  <span className="mr-1">{config.icon}</span>
                  {config.label}
                </Badge>
              </div>

              {/* Preview Button */}
              <div className="absolute top-3 right-3">
                <Button
                  type="button"
                  variant="secondary"
                  size="icon"
                  className="h-8 w-8 bg-white/90 backdrop-blur-sm"
                  onClick={() => setShowFullPreview(true)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Replace
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => window.open(currentImage, "_blank")}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View
                  </Button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="flex-1"
              >
                {isUploading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Upload className="h-4 w-4 mr-2" />}
                Replace Image
              </Button>
              <Button type="button" variant="outline" size="sm" onClick={handleRemoveImage} disabled={isUploading}>
                <X className="h-4 w-4 mr-2" />
                Remove
              </Button>
            </div>
          </div>
        ) : (
          /* Upload Area */
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
              dragActive
                ? `border-primary bg-primary/5 ${config.bgGradient} bg-opacity-10`
                : "border-muted-foreground/25 hover:border-muted-foreground/50"
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <div className="space-y-4">
              {/* Upload Icon */}
              <div
                className={`mx-auto w-20 h-20 rounded-xl bg-gradient-to-r ${config.bgGradient} flex items-center justify-center text-white shadow-lg`}
              >
                <div className="text-center">
                  <span className="text-2xl block mb-1">{config.icon}</span>
                  <ImageIcon className="w-6 h-6 mx-auto" />
                </div>
              </div>

              {/* Upload Text */}
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Drop {config.label.toLowerCase()} here</h3>
                <p className="text-sm text-muted-foreground">or click to browse your files</p>
                <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                  <span>{config.dimensions}</span>
                  <span>•</span>
                  <span>{config.aspectRatio}</span>
                  <span>•</span>
                  <span>Max {config.maxSize}</span>
                </div>
                <p className="text-xs text-muted-foreground">Supports JPG, PNG, WebP, GIF</p>
              </div>

              {/* Upload Button */}
              <Button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className={`bg-gradient-to-r ${config.bgGradient} hover:opacity-90`}
              >
                {isUploading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Upload className="h-4 w-4 mr-2" />}
                Choose {config.label}
              </Button>
            </div>
          </div>
        )}

        {/* Upload Progress */}
        {isUploading && (
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Uploading {config.label.toLowerCase()}...
              </span>
              <span className="font-mono">{Math.round(uploadProgress)}%</span>
            </div>
            <Progress value={uploadProgress} className="w-full h-2" />
            <p className="text-xs text-muted-foreground text-center">Optimizing and generating variants...</p>
          </div>
        )}

        {/* Full Preview Modal */}
        {showFullPreview && isRealImage && (
          <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            onClick={() => setShowFullPreview(false)}
          >
            <div className="relative max-w-4xl max-h-[90vh] p-4">
              <Image
                src={currentImage || "/placeholder.svg"}
                alt={`${config.label} full preview`}
                width={1200}
                height={800}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                sizes="90vw"
                priority
              />
              <Button
                type="button"
                variant="secondary"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => setShowFullPreview(false)}
              >
                <X className="h-4 w-4" />
              </Button>
              <div className="absolute bottom-2 left-2">
                <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
                  <span className="mr-1">{config.icon}</span>
                  {config.label}
                </Badge>
              </div>
            </div>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={handleFileInputChange}
          className="hidden"
        />
      </CardContent>
    </Card>
  )
}
