"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { Loader2 } from "lucide-react"

interface Category {
  id: string
  name: string
  slug: string
  description?: string | null
  parentId?: string | null
  parent?: Category
  children: Category[]
  _count?: {
    articles: number
  }
  isActive: boolean
  sortOrder: number
}

interface CategoriesResponse {
  success: boolean
  categories: Category[]
  allCategories: Category[]
}

function Categories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedLetter, setSelectedLetter] = useState("All Topics")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories")

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const contentType = response.headers.get("content-type")
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Response is not JSON")
        }

        const data: CategoriesResponse = await response.json()

        if (data.success) {
          const allCats = data.allCategories || data.categories
          setCategories(allCats)
        } else {
          setError("Failed to load categories")
        }
      } catch (err) {
        console.error("Error fetching categories:", err)
        setError("Failed to load categories")
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  // Generate alphabet letters
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

  // Organize categories by parent groups for "All Topics" view
  const organizedCategories = useMemo(() => {
    const groups: { [key: string]: Category[] } = {}

    categories.forEach((category) => {
      if (category.parentId === null && category.children.length > 0) {
        // This is a parent category with children
        const parentName = category.name.toUpperCase()
        groups[parentName] = category.children.sort((a, b) => a.name.localeCompare(b.name))
      } else if (category.parentId === null && category.children.length === 0) {
        // This is a standalone category - group under "GENERAL"
        if (!groups["GENERAL"]) {
          groups["GENERAL"] = []
        }
        groups["GENERAL"].push(category)
      }
    })

    // Sort categories within each group
    Object.keys(groups).forEach((groupName) => {
      groups[groupName] = groups[groupName].sort((a, b) => a.name.localeCompare(b.name))
    })

    return groups
  }, [categories])

  // Get all subcategories for alphabetical filtering
  const allSubcategories = useMemo(() => {
    const subcategories: Category[] = []

    categories.forEach((category) => {
      if (category.children.length > 0) {
        subcategories.push(...category.children)
      } else if (category.parentId === null) {
        subcategories.push(category)
      }
    })

    return subcategories
  }, [categories])

  // Filter categories by selected letter
  const filteredCategories = useMemo(() => {
    if (selectedLetter === "All Topics") {
      return null // Will show organized view
    }
    return allSubcategories
      .filter((cat) => cat.name.toUpperCase().startsWith(selectedLetter))
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [allSubcategories, selectedLetter])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4" />
            <p className="text-xl">Loading categories...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <p className="text-xl text-red-200">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Product Reviews: Health & Beauty A-Z Topics</h1>
          <p className="text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
            Consumerhealthdigest.com offers the latest in-depth reviews for products that are natural and safe. We cover
            different health and nutrition categories. Our real objective is to provide the readers with quality
            information about the products that can help to improve their health. Here you can get complete information
            of products available for different health conditions.
          </p>
        </div>

        {/* Alphabetical Navigation */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button
              onClick={() => setSelectedLetter("All Topics")}
              className={`px-4 py-2 rounded font-semibold transition-colors ${
                selectedLetter === "All Topics" ? "bg-green-500 text-white" : "bg-blue-500 hover:bg-blue-400 text-white"
              }`}
            >
              All Topics
            </button>
            {alphabet.map((letter) => (
              <button
                key={letter}
                onClick={() => setSelectedLetter(letter)}
                className={`w-10 h-10 rounded font-semibold transition-colors ${
                  selectedLetter === letter ? "bg-green-500 text-white" : "bg-blue-500 hover:bg-blue-400 text-white"
                }`}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {selectedLetter === "All Topics" ? (
          /* Organized Categories View */
          <div className="space-y-12">
            {Object.entries(organizedCategories).map(([groupName, groupCategories]) => (
              <div key={groupName} className="border border-white/30 rounded-lg overflow-hidden">
                {/* Section Header */}
                <div className="bg-white/20 px-6 py-4 border-b border-white/30">
                  <h2 className="text-2xl font-bold text-center tracking-wide">{groupName}</h2>
                </div>

                {/* Categories Grid */}
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
                    {groupCategories.map((category, index) => (
                      <div key={`${groupName}-${category.id}-${index}`} className="flex items-start space-x-2">
                        <span className="text-white/80 mt-2">◦</span>
                        <Link
                          href={`/categories/${category.slug}`}
                          className="text-white hover:text-blue-200 transition-colors font-medium leading-relaxed"
                        >
                          {category.name}
                          {category._count && category._count.articles > 0 && (
                            <span className="text-blue-200 text-sm ml-1">({category._count.articles})</span>
                          )}
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Alphabetical Filter View */
          <div className="max-w-4xl mx-auto">
            {filteredCategories && filteredCategories.length > 0 ? (
              <div className="space-y-4">
                {filteredCategories.map((category, index) => (
                  <div key={`${category.id}-${index}`} className="flex items-start space-x-3">
                    <span className="text-white/80 mt-2 text-lg">◦</span>
                    <Link
                      href={`/categories/${category.slug}`}
                      className="text-white hover:text-blue-200 transition-colors font-medium text-lg leading-relaxed"
                    >
                      {category.name}
                      {category._count && category._count.articles > 0 && (
                        <span className="text-blue-200 text-sm ml-2">({category._count.articles})</span>
                      )}
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-xl text-blue-200">No categories found starting with &quot;{selectedLetter}&quot;</p>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-blue-200">Browse our comprehensive collection of health and beauty product reviews</p>
        </div>
      </div>
    </div>
  )
}

export default Categories
