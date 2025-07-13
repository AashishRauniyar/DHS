/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ImageUploader } from "@/components/image-uploader"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { ExternalLink, Info, ImageIcon, Eye, Monitor, Tablet, Smartphone, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Block } from "@/types/article"
import Image from "next/image"

interface ResponsiveImageBlockProps {
  block: Block
  onChange: (updates: Partial<Block>) => void
}

// Responsive layout configurations
const LAYOUT_PRESETS = {
  fullWidth: {
    label: "Full Width",
    description: "Spans the entire container width",
    icon: "📐",
    classes: "w-full",
    aspectRatio: "auto",
  },
  centered: {
    label: "Centered",
    description: "Centered with max width constraints",
    icon: "🎯",
    classes: "mx-auto max-w-4xl",
    aspectRatio: "auto",
  },
  floatLeft: {
    label: "Float Left",
    description: "Floats to the left with text wrap",
    icon: "⬅️",
    classes: "float-left mr-4 mb-4",
    aspectRatio: "auto",
  },
  floatRight: {
    label: "Float Right",
    description: "Floats to the right with text wrap",
    icon: "➡️",
    classes: "float-right ml-4 mb-4",
    aspectRatio: "auto",
  },
  grid: {
    label: "Grid Layout",
    description: "Part of a responsive grid system",
    icon: "⚏",
    classes: "w-full",
    aspectRatio: "auto",
  },
} as const

// Responsive breakpoint configurations
const BREAKPOINTS = {
  mobile: { label: "Mobile", icon: Smartphone, width: "320px-768px", maxWidth: "768px" },
  tablet: { label: "Tablet", icon: Tablet, width: "768px-1024px", maxWidth: "1024px" },
  desktop: { label: "Desktop", icon: Monitor, width: "1024px+", maxWidth: "none" },
} as const

// Aspect ratio presets
const ASPECT_RATIOS = {
  auto: { label: "Auto", value: "auto", ratio: null },
  "16/9": { label: "16:9 (Widescreen)", value: "16/9", ratio: 16 / 9 },
  "4/3": { label: "4:3 (Standard)", value: "4/3", ratio: 4 / 3 },
  "3/2": { label: "3:2 (Photo)", value: "3/2", ratio: 3 / 2 },
  "1/1": { label: "1:1 (Square)", value: "1/1", ratio: 1 },
  "21/9": { label: "21:9 (Ultrawide)", value: "21/9", ratio: 21 / 9 },
} as const

export function ImageBlock({ block, onChange }: ResponsiveImageBlockProps) {
  const [showFullPreview, setShowFullPreview] = useState(false)
  const [previewBreakpoint, setPreviewBreakpoint] = useState<keyof typeof BREAKPOINTS>("desktop")
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false)

  // Get responsive settings from custom fields
  const getResponsiveSettings = () => {
    const settingsField = block.customFields?.find((field) => field.name === "responsiveSettings")
    if (settingsField?.value) {
      try {
        return JSON.parse(settingsField.value)
      } catch {
        return getDefaultResponsiveSettings()
      }
    }
    return getDefaultResponsiveSettings()
  }

  const getDefaultResponsiveSettings = () => ({
    layout: "centered",
    aspectRatio: "auto",
    objectFit: "cover",
    priority: false,
    lazy: true,
    quality: 75,
    sizes: {
      mobile: { width: "100vw", maxWidth: "768px" },
      tablet: { width: "100vw", maxWidth: "1024px" },
      desktop: { width: "100vw", maxWidth: "1200px" },
    },
    breakpoints: {
      mobile: { enabled: true, customClass: "" },
      tablet: { enabled: true, customClass: "" },
      desktop: { enabled: true, customClass: "" },
    },
    effects: {
      hover: false,
      zoom: false,
      parallax: false,
      fadeIn: false,
    },
  })

  const responsiveSettings = getResponsiveSettings()

  const updateResponsiveSettings = (updates: any) => {
    const newSettings = { ...responsiveSettings, ...updates }

    const existingCustomFields = (block.customFields || []).filter((field) => field.name !== "responsiveSettings")

    const updatedCustomFields = [
      ...existingCustomFields,
      {
        id: crypto.randomUUID(),
        name: "responsiveSettings",
        value: JSON.stringify(newSettings),
        blockId: block.id,
      },
    ]

    onChange({ customFields: updatedCustomFields })
  }

  const handleImageUpload = (imageData: {
    url: string
    publicId: string
    variants: Record<string, string>
    metadata?: {
      width: number
      height: number
      format: string
      folder_type?: string
      preset?: string
      imageType?: string
    }
  }) => {
    // Filter out any previous image metadata
    const existingCustomFields = (block.customFields || []).filter(
      (field) =>
        !["imagePublicId", "imageVariants", "imageFolder", "imagePreset", "imageMetadata", "imageType"].includes(
          field.name,
        ),
    )

    // Create new custom fields array with all image metadata
    let updatedCustomFields = existingCustomFields

    if (imageData.publicId) {
      updatedCustomFields = [
        ...existingCustomFields,
        {
          id: crypto.randomUUID(),
          name: "imagePublicId",
          value: imageData.publicId,
          blockId: block.id,
        },
        {
          id: crypto.randomUUID(),
          name: "imageVariants",
          value: JSON.stringify(imageData.variants),
          blockId: block.id,
        },
        {
          id: crypto.randomUUID(),
          name: "imagePreset",
          value: imageData.metadata?.preset || "article",
          blockId: block.id,
        },
        {
          id: crypto.randomUUID(),
          name: "imageType",
          value: imageData.metadata?.imageType || "article",
          blockId: block.id,
        },
      ]

      // Add metadata if available
      if (imageData.metadata) {
        updatedCustomFields.push({
          id: crypto.randomUUID(),
          name: "imageMetadata",
          value: JSON.stringify(imageData.metadata),
          blockId: block.id,
        })
      }
    }

    // Update the block with image data and metadata
    onChange({
      imageUrl: imageData.url,
      customFields: updatedCustomFields,
    })
  }

  // Generate responsive sizes string
  const generateSizesString = () => {
    const { sizes } = responsiveSettings
    return `(max-width: 768px) ${sizes.mobile.width}, (max-width: 1024px) ${sizes.tablet.width}, ${sizes.desktop.width}`
  }

  // Generate responsive classes
  const generateResponsiveClasses = () => {
    const layout = LAYOUT_PRESETS[responsiveSettings.layout as keyof typeof LAYOUT_PRESETS]
    const baseClasses = layout?.classes || "w-full"

    let classes = baseClasses

    // Add aspect ratio classes
    if (responsiveSettings.aspectRatio !== "auto") {
      classes += ` aspect-[${responsiveSettings.aspectRatio}]`
    }

    // Add effect classes
    if (responsiveSettings.effects.hover) {
      classes += " hover:scale-105 transition-transform duration-300"
    }

    if (responsiveSettings.effects.fadeIn) {
      classes += " animate-fade-in"
    }

    return classes
  }

  const getImageMetadata = () => {
    const metadataField = block.customFields?.find((field) => field.name === "imageMetadata")
    if (metadataField?.value) {
      try {
        return JSON.parse(metadataField.value)
      } catch {
        return null
      }
    }
    return null
  }

  const getImageType = () => {
    const imageTypeField = block.customFields?.find((field) => field.name === "imageType")
    return imageTypeField?.value || "article"
  }

  const getImagePreset = () => {
    const presetField = block.customFields?.find((field) => field.name === "imagePreset")
    return presetField?.value || "article"
  }

  const metadata = getImageMetadata()
  const imageType = getImageType()
  const isPlaceholder = !block.imageUrl || block.imageUrl.includes("placeholder.svg")
  const currentLayout = LAYOUT_PRESETS[responsiveSettings.layout as keyof typeof LAYOUT_PRESETS]

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <ImageIcon className="w-5 h-5" />
          Responsive Image Block
          {!isPlaceholder && (
            <div className="flex gap-2 ml-auto">
              <Badge variant="secondary">{imageType}</Badge>
              <Badge variant="outline">{currentLayout?.label}</Badge>
            </div>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="layout">Layout</TabsTrigger>
            <TabsTrigger value="responsive">Responsive</TabsTrigger>
            <TabsTrigger value="effects">Effects</TabsTrigger>
          </TabsList>

          {/* Upload Tab */}
          <TabsContent value="upload" className="space-y-4">
            <div className="space-y-3">
              <Label className="text-sm font-medium">Upload Image</Label>
              <ImageUploader
                currentImage={block.imageUrl}
                onUpload={handleImageUpload}
                preset={getImagePreset()}
                imageType={imageType as any}
                showPresetSelector={true}
                label="Responsive Image"
              />
            </div>

            {/* Image Content Fields */}
            <Separator />
            <div className="space-y-4">
              <Label className="text-sm font-medium">Image Details</Label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Image Caption */}
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-muted-foreground">Caption</Label>
                  <Input
                    value={block.imageCaption || ""}
                    onChange={(e) => onChange({ imageCaption: e.target.value })}
                    placeholder="Enter image caption..."
                  />
                </div>

                {/* Image Attribution */}
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-muted-foreground">Attribution</Label>
                  <Input
                    value={block.imageAttribution || ""}
                    onChange={(e) => onChange({ imageAttribution: e.target.value })}
                    placeholder="Credit: Source"
                  />
                </div>
              </div>

              {/* Alt Text */}
              <div className="space-y-2">
                <Label className="text-xs font-medium text-muted-foreground">Alt Text (SEO)</Label>
                <Textarea
                  value={block.imageAlt || ""}
                  onChange={(e) => onChange({ imageAlt: e.target.value })}
                  placeholder="Describe the image for accessibility and SEO..."
                  className="min-h-[80px] resize-y"
                />
              </div>
            </div>
          </TabsContent>

          {/* Layout Tab */}
          <TabsContent value="layout" className="space-y-4">
            <div className="space-y-4">
              <Label className="text-sm font-medium">Layout Configuration</Label>

              {/* Layout Preset */}
              <div className="space-y-3">
                <Label className="text-xs font-medium text-muted-foreground">Layout Preset</Label>
                <Select
                  value={responsiveSettings.layout}
                  onValueChange={(value) => updateResponsiveSettings({ layout: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select layout" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(LAYOUT_PRESETS).map(([key, preset]) => (
                      <SelectItem key={key} value={key}>
                        <div className="flex items-center gap-3">
                          <span>{preset.icon}</span>
                          <div className="flex flex-col">
                            <span className="font-medium">{preset.label}</span>
                            <span className="text-xs text-muted-foreground">{preset.description}</span>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Aspect Ratio */}
              <div className="space-y-3">
                <Label className="text-xs font-medium text-muted-foreground">Aspect Ratio</Label>
                <Select
                  value={responsiveSettings.aspectRatio}
                  onValueChange={(value) => updateResponsiveSettings({ aspectRatio: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select aspect ratio" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(ASPECT_RATIOS).map(([key, ratio]) => (
                      <SelectItem key={key} value={ratio.value}>
                        {ratio.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Object Fit */}
              <div className="space-y-3">
                <Label className="text-xs font-medium text-muted-foreground">Object Fit</Label>
                <Select
                  value={responsiveSettings.objectFit}
                  onValueChange={(value) => updateResponsiveSettings({ objectFit: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select object fit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cover">Cover (Fill container)</SelectItem>
                    <SelectItem value="contain">Contain (Fit within)</SelectItem>
                    <SelectItem value="fill">Fill (Stretch to fit)</SelectItem>
                    <SelectItem value="none">None (Original size)</SelectItem>
                    <SelectItem value="scale-down">Scale Down</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Quality Slider */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label className="text-xs font-medium text-muted-foreground">Image Quality</Label>
                  <span className="text-xs text-muted-foreground">{responsiveSettings.quality}%</span>
                </div>
                <Slider
                  value={[responsiveSettings.quality]}
                  onValueChange={([value]) => updateResponsiveSettings({ quality: value })}
                  max={100}
                  min={10}
                  step={5}
                  className="w-full"
                />
              </div>
            </div>
          </TabsContent>

          {/* Responsive Tab */}
          <TabsContent value="responsive" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Responsive Settings</Label>
                <div className="flex gap-2">
                  {Object.entries(BREAKPOINTS).map(([key, bp]) => (
                    <Button
                      key={key}
                      variant={previewBreakpoint === key ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPreviewBreakpoint(key as keyof typeof BREAKPOINTS)}
                    >
                      <bp.icon className="h-4 w-4" />
                    </Button>
                  ))}
                </div>
              </div>

              {/* Breakpoint Configuration */}
              {Object.entries(BREAKPOINTS).map(([key, breakpoint]) => (
                <Card key={key} className={previewBreakpoint === key ? "ring-2 ring-primary" : ""}>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-sm">
                      <breakpoint.icon className="h-4 w-4" />
                      {breakpoint.label}
                      <Badge variant="outline" className="text-xs">
                        {breakpoint.width}
                      </Badge>
                      <Switch
                        checked={responsiveSettings.breakpoints[key as keyof typeof BREAKPOINTS].enabled}
                        onCheckedChange={(enabled) =>
                          updateResponsiveSettings({
                            breakpoints: {
                              ...responsiveSettings.breakpoints,
                              [key]: { ...responsiveSettings.breakpoints[key as keyof typeof BREAKPOINTS], enabled },
                            },
                          })
                        }
                        className="ml-auto"
                      />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label className="text-xs font-medium text-muted-foreground">Width</Label>
                        <Input
                          value={responsiveSettings.sizes[key as keyof typeof BREAKPOINTS].width}
                          onChange={(e) =>
                            updateResponsiveSettings({
                              sizes: {
                                ...responsiveSettings.sizes,
                                [key]: {
                                  ...responsiveSettings.sizes[key as keyof typeof BREAKPOINTS],
                                  width: e.target.value,
                                },
                              },
                            })
                          }
                          placeholder="100vw"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-medium text-muted-foreground">Max Width</Label>
                        <Input
                          value={responsiveSettings.sizes[key as keyof typeof BREAKPOINTS].maxWidth}
                          onChange={(e) =>
                            updateResponsiveSettings({
                              sizes: {
                                ...responsiveSettings.sizes,
                                [key]: {
                                  ...responsiveSettings.sizes[key as keyof typeof BREAKPOINTS],
                                  maxWidth: e.target.value,
                                },
                              },
                            })
                          }
                          placeholder="768px"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Generated Sizes String */}
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Generated sizes attribute:</p>
                    <code className="text-xs bg-muted px-2 py-1 rounded break-all block">{generateSizesString()}</code>
                  </div>
                </AlertDescription>
              </Alert>
            </div>
          </TabsContent>

          {/* Effects Tab */}
          <TabsContent value="effects" className="space-y-4">
            <div className="space-y-4">
              <Label className="text-sm font-medium">Visual Effects</Label>

              {/* Loading Options */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-sm">Priority Loading</Label>
                    <p className="text-xs text-muted-foreground">Load this image with high priority</p>
                  </div>
                  <Switch
                    checked={responsiveSettings.priority}
                    onCheckedChange={(priority) => updateResponsiveSettings({ priority })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-sm">Lazy Loading</Label>
                    <p className="text-xs text-muted-foreground">Load image when it enters viewport</p>
                  </div>
                  <Switch
                    checked={responsiveSettings.lazy}
                    onCheckedChange={(lazy) => updateResponsiveSettings({ lazy })}
                  />
                </div>
              </div>

              <Separator />

              {/* Visual Effects */}
              <div className="space-y-4">
                <Label className="text-sm font-medium">Hover & Animation Effects</Label>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-sm">Hover Scale</Label>
                    <p className="text-xs text-muted-foreground">Scale image on hover</p>
                  </div>
                  <Switch
                    checked={responsiveSettings.effects.hover}
                    onCheckedChange={(hover) =>
                      updateResponsiveSettings({
                        effects: { ...responsiveSettings.effects, hover },
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-sm">Zoom on Click</Label>
                    <p className="text-xs text-muted-foreground">Enable click-to-zoom functionality</p>
                  </div>
                  <Switch
                    checked={responsiveSettings.effects.zoom}
                    onCheckedChange={(zoom) =>
                      updateResponsiveSettings({
                        effects: { ...responsiveSettings.effects, zoom },
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-sm">Fade In Animation</Label>
                    <p className="text-xs text-muted-foreground">Fade in when image loads</p>
                  </div>
                  <Switch
                    checked={responsiveSettings.effects.fadeIn}
                    onCheckedChange={(fadeIn) =>
                      updateResponsiveSettings({
                        effects: { ...responsiveSettings.effects, fadeIn },
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Live Preview */}
        {block.imageUrl && !isPlaceholder && (
          <>
            <Separator />
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Live Preview</Label>
                <div className="flex gap-2">
                  <Button type="button" variant="outline" size="sm" onClick={() => setShowFullPreview(true)}>
                    <Eye className="h-4 w-4 mr-2" />
                    Full Preview
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(block.imageUrl, "_blank")}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open Original
                  </Button>
                </div>
              </div>

              {/* Responsive Preview */}
              <div className="border rounded-lg p-4 bg-muted/20">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary">{BREAKPOINTS[previewBreakpoint].label} Preview</Badge>
                  <Badge variant="outline">{currentLayout?.label}</Badge>
                </div>

                <div
                  className={`relative overflow-hidden rounded-md ${
                    previewBreakpoint === "mobile"
                      ? "max-w-sm"
                      : previewBreakpoint === "tablet"
                        ? "max-w-2xl"
                        : "max-w-4xl"
                  } ${generateResponsiveClasses()}`}
                  style={{
                    aspectRatio: responsiveSettings.aspectRatio !== "auto" ? responsiveSettings.aspectRatio : undefined,
                  }}
                >
                  <Image
                    src={block.imageUrl || "/placeholder.svg"}
                    alt={block.imageAlt || "Responsive image preview"}
                    fill={responsiveSettings.aspectRatio !== "auto"}
                    width={responsiveSettings.aspectRatio === "auto" ? 800 : undefined}
                    height={responsiveSettings.aspectRatio === "auto" ? 600 : undefined}
                    className={`${
                      responsiveSettings.aspectRatio !== "auto" ? `object-${responsiveSettings.objectFit}` : ""
                    } ${responsiveSettings.effects.hover ? "hover:scale-105 transition-transform duration-300" : ""}`}
                    sizes={generateSizesString()}
                    priority={responsiveSettings.priority}
                    quality={responsiveSettings.quality}
                  />
                </div>

                {/* Preview Info */}
                <div className="mt-3 text-xs text-muted-foreground">
                  <p>
                    Layout: {currentLayout?.label} • Quality: {responsiveSettings.quality}%
                  </p>
                  <p>Sizes: {generateSizesString()}</p>
                </div>
              </div>

              {/* Image Metadata */}
              {metadata && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted/50 rounded-lg">
                  <div className="space-y-1">
                    <Label className="text-xs font-medium text-muted-foreground">Dimensions</Label>
                    <div className="text-sm font-mono">
                      {metadata.width && metadata.height ? `${metadata.width} × ${metadata.height}` : "Unknown"}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-medium text-muted-foreground">Format</Label>
                    <div className="text-sm font-mono">{metadata.format?.toUpperCase() || "Unknown"}</div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-medium text-muted-foreground">Size</Label>
                    <div className="text-sm font-mono">
                      {metadata.bytes ? `${(metadata.bytes / 1024).toFixed(1)} KB` : "Unknown"}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-medium text-muted-foreground">Type</Label>
                    <div className="text-sm font-mono">{imageType}</div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* Full Preview Modal */}
        {showFullPreview && block.imageUrl && !isPlaceholder && (
          <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            onClick={() => setShowFullPreview(false)}
          >
            <div className="relative max-w-[95vw] max-h-[95vh] p-4">
              <Image
                src={block.imageUrl || "/placeholder.svg"}
                alt={block.imageAlt || "Full preview"}
                width={1200}
                height={800}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                sizes="95vw"
                priority
                quality={100}
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
              <div className="absolute bottom-2 left-2 flex gap-2">
                <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
                  {imageType}
                </Badge>
                <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
                  {currentLayout?.label}
                </Badge>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
