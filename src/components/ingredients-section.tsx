"use client"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"
import { ImageUploader } from "@/components/image-uploader"
import Image from "next/image"

interface Ingredient {
  id: string
  number: number
  name: string
  imageUrl: string
  description: string
  studyYear?: string
  studySource?: string
  studyDescription?: string
}

interface IngredientsSectionProps {
  productName: string
  introduction: string
  ingredients: Ingredient[]
  isEditing?: boolean
  onChange?: (ingredients: Ingredient[]) => void
  onIntroductionChange?: (intro: string) => void
}

export function IngredientsSection({
  productName,
  introduction,
  ingredients,
  isEditing = false,
  onChange,
  onIntroductionChange,
}: IngredientsSectionProps) {
  const handleIngredientChange = (id: string, field: keyof Ingredient, value: string | number) => {
    if (!onChange) return

    const updatedIngredients = ingredients.map((ingredient) => {
      if (ingredient.id === id) {
        return { ...ingredient, [field]: value }
      }
      return ingredient
    })

    onChange(updatedIngredients)
  }

  const addIngredient = () => {
    if (!onChange) return

    const newIngredient: Ingredient = {
      id: Math.random().toString(36).substring(2, 9),
      number: ingredients.length + 1,
      name: "",
      imageUrl: "",
      description: "",
    }

    onChange([...ingredients, newIngredient])
  }

  const removeIngredient = (id: string) => {
    if (!onChange) return

    const updatedIngredients = ingredients
      .filter((ingredient) => ingredient.id !== id)
      .map((ingredient, index) => ({
        ...ingredient,
        number: index + 1,
      }))

    onChange(updatedIngredients)
  }

  if (isEditing) {
    return (
      <div className="space-y-8">
        <div className="space-y-4">
          <Label>Product Introduction</Label>
          <Textarea
            value={introduction}
            onChange={(e) => onIntroductionChange?.(e.target.value)}
            placeholder="Describe the product and its ingredients..."
            className="min-h-[100px]"
          />
        </div>

        {ingredients.map((ingredient) => (
          <div key={ingredient.id} className="border rounded-md p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">Ingredient #{ingredient.number}</h3>
              <Button variant="ghost" size="sm" onClick={() => removeIngredient(ingredient.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Ingredient Name</Label>
                <Input
                  value={ingredient.name}
                  onChange={(e) => handleIngredientChange(ingredient.id, "name", e.target.value)}
                  placeholder="e.g., Vitamin A"
                />
              </div>

              <div className="space-y-2">
                <Label>Ingredient Image</Label>
                <ImageUploader
                  currentImage={ingredient.imageUrl}
                  onUpload={(imageData) => handleIngredientChange(ingredient.id, "imageUrl", imageData.url)}
                  preset="ingredient"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={ingredient.description}
                onChange={(e) => handleIngredientChange(ingredient.id, "description", e.target.value)}
                placeholder="Describe the ingredient and its benefits..."
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-4 border-t pt-4 mt-4">
              <h4 className="font-medium">Study Reference (Optional)</h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Study Year</Label>
                  <Input
                    value={ingredient.studyYear || ""}
                    onChange={(e) => handleIngredientChange(ingredient.id, "studyYear", e.target.value)}
                    placeholder="e.g., 2020"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Study Source</Label>
                  <Input
                    value={ingredient.studySource || ""}
                    onChange={(e) => handleIngredientChange(ingredient.id, "studySource", e.target.value)}
                    placeholder="e.g., Journal of Clinical Investigation"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Study Description</Label>
                <Textarea
                  value={ingredient.studyDescription || ""}
                  onChange={(e) => handleIngredientChange(ingredient.id, "studyDescription", e.target.value)}
                  placeholder="Describe the study findings..."
                  className="min-h-[80px]"
                />
              </div>
            </div>
          </div>
        ))}

        <Button onClick={addIngredient} className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Add Ingredient
        </Button>
      </div>
    )
  }

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">
        {productName} Key Ingredients – Are they Safe and Effective?
      </h2>

      <p className="mb-6">{introduction}</p>

      <div className="space-y-6">
        {ingredients.map((ingredient) => (
          <div key={ingredient.id} className="bg-blue-50 rounded-md p-4 flex flex-col md:flex-row gap-4">
            {ingredient.imageUrl && (
              <div className="flex-shrink-0">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-white border border-gray-200">
                  <Image
                    src={ingredient.imageUrl || "/placeholder.svg"}
                    alt={ingredient.name}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/single-ingredient.png"
                    }}
                  />
                </div>
              </div>
            )}

            <div className="flex-1">
              <h3 className="text-xl font-bold text-blue-600 mb-2">
                {ingredient.number}. {ingredient.name}
              </h3>

              <p className="mb-4">{ingredient.description}</p>

              {ingredient.studyYear && ingredient.studySource && ingredient.studyDescription && (
                <p className="text-gray-700">
                  A {ingredient.studyYear} review in{" "}
                  <span className="text-blue-600 font-medium">{ingredient.studySource}</span>{" "}
                  {ingredient.studyDescription}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
