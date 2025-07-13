import { Star, StarHalf } from "lucide-react"

interface RatingBlockProps {
  block: {
    id: string
    productName?: string
    overallRating?: number
    ratings?: {
      ingredients?: number
      value?: number
      manufacturer?: number
      safety?: number
      effectiveness?: number
    }
    highlights?: Array<{ id: string; content: string; order: number }>
  }
}

export function RatingBlock({ block }: RatingBlockProps) {
  const overallRating = block.overallRating || 0
  const ratings = block.ratings || {}
  const highlights = block.highlights || []

  // Sort highlights by order
  const sortedHighlights = [...highlights].sort((a, b) => a.order - b.order)

  // Helper function to render stars
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    return (
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
        ))}

        {hasHalfStar && <StarHalf className="h-5 w-5 fill-yellow-400 text-yellow-400" />}

        {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
          <Star key={`empty-${i}`} className="h-5 w-5 text-gray-300" />
        ))}

        <span className="ml-2 text-sm font-medium">{rating.toFixed(1)}/5</span>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 p-6 rounded-lg my-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h3 className="text-xl font-bold">{block.productName ? `${block.productName} Rating` : "Product Rating"}</h3>

        <div className="mt-2 md:mt-0">
          <div className="flex items-center">
            {renderStars(overallRating)}
            <span className="ml-2 text-lg font-semibold">Overall</span>
          </div>
        </div>
      </div>

      {/* Detailed Ratings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {ratings.ingredients !== undefined && (
          <div className="flex justify-between items-center">
            <span className="font-medium">Ingredients</span>
            {renderStars(ratings.ingredients)}
          </div>
        )}

        {ratings.value !== undefined && (
          <div className="flex justify-between items-center">
            <span className="font-medium">Value</span>
            {renderStars(ratings.value)}
          </div>
        )}

        {ratings.manufacturer !== undefined && (
          <div className="flex justify-between items-center">
            <span className="font-medium">Manufacturer</span>
            {renderStars(ratings.manufacturer)}
          </div>
        )}

        {ratings.safety !== undefined && (
          <div className="flex justify-between items-center">
            <span className="font-medium">Safety</span>
            {renderStars(ratings.safety)}
          </div>
        )}

        {ratings.effectiveness !== undefined && (
          <div className="flex justify-between items-center">
            <span className="font-medium">Effectiveness</span>
            {renderStars(ratings.effectiveness)}
          </div>
        )}
      </div>

      {/* Highlights */}
      {sortedHighlights.length > 0 && (
        <div>
          <h4 className="font-semibold text-lg mb-3">Highlights</h4>
          <ul className="list-disc pl-5 space-y-1">
            {sortedHighlights.map((highlight) => (
              <li key={highlight.id}>{highlight.content}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
