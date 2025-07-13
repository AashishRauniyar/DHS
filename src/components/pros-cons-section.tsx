"use client"

import { Check, X, ThumbsUp, ThumbsDown } from "lucide-react"

interface ProsConsProps {
  pros: string[]
  cons: string[]
  ingredients?: string[]
}

export function ProsConsSection({ pros, cons, ingredients }: ProsConsProps) {
  return (
    <div className="my-8">
      {ingredients && ingredients.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">Key Ingredients</h3>
          <div className="border border-dashed border-gray-300 p-4 rounded-md">
            <div className="flex flex-wrap gap-2">
              {ingredients.map((ingredient, index) => (
                <div key={index} className="flex items-center">
                  <span className="mr-2">-</span>
                  <span className="font-medium">{ingredient}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pros */}
        <div className="relative border border-teal-100 rounded-lg overflow-hidden">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2">
            <div className="w-16 h-16 rounded-full bg-teal-400 flex items-center justify-center">
              <ThumbsUp className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="pt-12 pb-6 px-6 bg-teal-50">
            <ul className="space-y-3">
              {pros.map((pro, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-teal-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Cons */}
        <div className="relative border border-red-100 rounded-lg overflow-hidden">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2">
            <div className="w-16 h-16 rounded-full bg-red-400 flex items-center justify-center">
              <ThumbsDown className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="pt-12 pb-6 px-6 bg-red-50">
            <ul className="space-y-3">
              {cons.map((con, index) => (
                <li key={index} className="flex items-start">
                  <X className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
