"use client"

import { Button } from "@/components/ui/button"
import { FlaskRoundIcon as Flask, DollarSign, Shield, Beaker } from "lucide-react"
import Image from "next/image"

interface ProductRatingProps {
  productName: string
  overallRating: number
  ingredientsRating: number
  valueRating: number
  manufacturerRating: number
  safetyRating: number
  highlights: string[]
  imageUrl?: string
  ctaText?: string
  ctaLink?: string
}

export function ProductRatingSection({
  productName,
  overallRating,
  ingredientsRating,
  valueRating,
  manufacturerRating,
  safetyRating,
  highlights,
  imageUrl = "/generic-product-bottle.png",
  ctaText = "SHOP NOW",
  ctaLink = "#",
}: ProductRatingProps) {
  // Helper function to format rating with subscript
  const formatRating = (rating: number) => {
    return (
      <span>
        {rating.toFixed(1)}
        <sub className="text-sm">/5</sub>
      </span>
    )
  }

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">How Does {productName} Rate According to Our Experts?</h2>

      <div className="border-2 border-blue-600 rounded-md p-3 mb-6 text-center bg-blue-600 text-white">
        <div className="text-xl font-bold">Overall Rating: {overallRating.toFixed(1)}/5</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Product Image and CTA */}
        <div className="flex flex-col items-center">
          <div className="bg-white p-4 rounded-lg mb-4">
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={productName}
              className="w-full max-w-[200px] mx-auto"
              width={200}
              height={200}
            />
            <div className="text-center mt-2 text-sm font-medium">{productName}</div>
          </div>
          <Button
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-md w-full"
            onClick={() => window.open(ctaLink, "_blank")}
          >
            {ctaText}
          </Button>
        </div>

        {/* Ratings */}
        <div className="space-y-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-md flex items-center justify-center mr-4">
              <Beaker className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">{formatRating(ingredientsRating)}</div>
              <div className="text-sm text-gray-600">Ingredients</div>
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-md flex items-center justify-center mr-4">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">{formatRating(valueRating)}</div>
              <div className="text-sm text-gray-600">Value for Cost</div>
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-md flex items-center justify-center mr-4">
              <Flask className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">{formatRating(manufacturerRating)}</div>
              <div className="text-sm text-gray-600">Manufacturer</div>
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-md flex items-center justify-center mr-4">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">{formatRating(safetyRating)}</div>
              <div className="text-sm text-gray-600">Safety</div>
            </div>
          </div>
        </div>

        {/* Brand Highlights */}
        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-blue-600 mb-4">Brand Highlights</h3>
          <ul className="space-y-3">
            {highlights.map((highlight, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2">-</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
