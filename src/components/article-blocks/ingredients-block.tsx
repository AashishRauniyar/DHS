import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

interface IngredientsBlockProps {
  block: {
    id: string
    ingredientsIntroduction?: string
    ingredientsList?: Array<{
      id: string
      name: string
      imageUrl: string
      description: string
      studyYear?: string
      studySource?: string
      studyDescription?: string
    }>
  }
}

export function IngredientsBlock({ block }: IngredientsBlockProps) {
  const introduction = block.ingredientsIntroduction || ""
  const ingredients = block.ingredientsList || []

  return (
    <div className="my-6">
      {introduction && <p className="mb-6">{introduction}</p>}

      <div className="grid gap-6 md:grid-cols-2">
        {ingredients.map((ingredient) => (
          <Card key={ingredient.id} className="overflow-hidden">
            <div className="relative h-48 w-full">
              <Image
                src={ingredient.imageUrl || "/placeholder.svg"}
                alt={ingredient.name}
                fill
                className="object-cover"
              />
            </div>

            <CardContent className="p-4">
              <h4 className="text-lg font-semibold mb-2">{ingredient.name}</h4>
              <p className="text-sm text-gray-700 mb-3">{ingredient.description}</p>

              {(ingredient.studyYear || ingredient.studySource) && (
                <div className="text-xs text-gray-500 mt-2">
                  {ingredient.studyYear && <span>Study Year: {ingredient.studyYear}</span>}
                  {ingredient.studyYear && ingredient.studySource && <span> • </span>}
                  {ingredient.studySource && <span>Source: {ingredient.studySource}</span>}
                </div>
              )}

              {ingredient.studyDescription && (
                <div className="mt-3 text-sm">
                  <p className="font-medium">Research findings:</p>
                  <p className="text-gray-700">{ingredient.studyDescription}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
