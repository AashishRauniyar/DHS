/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface Category {
  id: string
  name: string
  slug: string
  parentId?: string
  parent?: Category
  children: Category[]
}

interface CategorySelectorProps {
  value?: string
  onValueChange: (value: string) => void
  label?: string
  placeholder?: string
  required?: boolean
  error?: string
}

export function CategorySelector({
  value,
  onValueChange,
  label = "Category",
  placeholder = "Select a category",
  required = false,
  error,
}: CategorySelectorProps) {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories")
        const data = await response.json()

        if (data.success) {
          setCategories(data.allCategories)
        }
      } catch (error) {
        console.error("Error fetching categories:", error)
      } finally {
        setLoading(false)
      }
    }

    void fetchCategories()
  }, [])

  const organizeCategories = (categories: Category[]) => {
    const mainCategories = categories.filter((cat) => !cat.parentId)
    const result: Category[] = []

    const addCategoryWithChildren = (category: Category, level = 0) => {
      result.push({ ...category, level } as Category & { level: number })
      const children = categories.filter((cat) => cat.parentId === category.id)
      children.forEach((child) => addCategoryWithChildren(child, level + 1))
    }

    mainCategories.forEach((category) => addCategoryWithChildren(category))
    return result
  }

  if (loading) {
    return (
      <div className="space-y-2">
        <Label>{label}</Label>
        <Select disabled>
          <SelectTrigger>
            <SelectValue placeholder="Loading categories..." />
          </SelectTrigger>
        </Select>
      </div>
    )
  }

  const organizedCategories = organizeCategories(categories)

  return (
    <div className="space-y-2">
      <Label>
        {label} {required && "*"}
      </Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className={error ? "border-red-500" : undefined}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {!required && <SelectItem value="none">No Category</SelectItem>}
          {organizedCategories.map((category) => {
            const level = (category as any).level || 0
            const prefix = "—".repeat(level)
            const displayName = level > 0 ? `${prefix} ${category.name}` : category.name

            return (
              <SelectItem key={category.id} value={category.id}>
                {displayName}
              </SelectItem>
            )
          })}
        </SelectContent>
      </Select>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}
