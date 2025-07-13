"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

interface SearchResult {
  id: string
  title: string
  slug: string
  category: {
    id: string
    name: string
    slug: string
  } | null
  description: string
  imageUrl: string | null
  createdAt: string
  updatedAt: string
}

interface PaginationInfo {
  total: number
  page: number
  limit: number
  totalPages: number
}

export default function ArticleListing() {
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [results, setResults] = useState<SearchResult[]>([])
  const [pagination, setPagination] = useState<PaginationInfo>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  })
  const [error, setError] = useState<string | null>(null)

  // Get search parameters
  const category = searchParams.get("category")
  const search = searchParams.get("search")
  const page = searchParams.get("page") ? Number.parseInt(searchParams.get("page") as string) : 1

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true)
      setError(null)

      try {
        // Build the query string for API
        const queryParams = new URLSearchParams()
        if (category) queryParams.append("category", category)
        if (search) queryParams.append("sch", search)
        if (page) queryParams.append("page", page.toString())

        // Fetch articles from API
        const response = await fetch(`/api/articles?${queryParams.toString()}`)
        console.log("API URL:", response)

        if (!response.ok) {
          throw new Error(`Error fetching articles: ${response.status} ${response.statusText}`)
        }

        const data = await response.json()

        console.log("Fetched articles:", data)

        if (!data.success) {
          throw new Error(data.message || "Failed to fetch articles")
        }

        setResults(data.articles)
        setPagination(data.pagination)
      } catch (err) {
        console.error("Error fetching articles:", err)
        setError(err instanceof Error ? err.message : "An unknown error occurred")
        setResults([])
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [category, search, page])

  function FormattedDate({ date }: { date: string }) {
    const [formatted, setFormatted] = useState("")
    useEffect(() => {
      setFormatted(new Date(date).toLocaleDateString())
    }, [date])
    return <>{formatted}</>
  }

  // Build title based on search parameters
  const getTitle = () => {
    if (search) return `SEARCH RESULTS FOR: "${search}"`
    if (category) return `ARTICLES IN CATEGORY: "${category.replace(/-/g, " ").toUpperCase()}"`
    return "LATEST ARTICLES"
  }

  if (loading) {
    return (
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 py-6 md:py-8 max-w-7xl mx-auto">
        <h1 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">{getTitle()}</h1>

        <div className="space-y-6 sm:space-y-8">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="flex flex-col sm:flex-row gap-4 sm:gap-6 border-b pb-6 sm:pb-8 animate-pulse">
              <div className="flex-shrink-0 w-full sm:w-32 md:w-40 lg:w-48 mx-auto sm:mx-0">
                <div className="border p-1 sm:p-2 inline-block w-full">
                  <div className="bg-gray-200 w-full aspect-square"></div>
                </div>
              </div>

              <div className="flex-1">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-3"></div>
                <div className="space-y-2 mb-4">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 py-6 md:py-8 max-w-7xl mx-auto">
        <h1 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">{getTitle()}</h1>
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
          <h2 className="text-lg font-semibold mb-2">Error Loading Articles</h2>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  if (results.length === 0) {
    return (
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 py-6 md:py-8 max-w-7xl mx-auto">
        <h1 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">{getTitle()}</h1>
        <div className="bg-blue-50 border border-blue-200 text-blue-700 p-4 rounded-md">
          <h2 className="text-lg font-semibold mb-2">No Articles Found</h2>
          <p>
            We couldn&apos;t find any articles matching your criteria. Try adjusting your search terms or browse our
            latest articles.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 py-6 md:py-8 max-w-7xl mx-auto">
      <h1 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">{getTitle()}</h1>

      <div className="space-y-6 sm:space-y-8">
        {results.map((result) => (
          <div key={result.slug} className="flex flex-col sm:flex-row gap-4 sm:gap-6 border-b pb-6 sm:pb-8">
            <div className="flex-shrink-0 w-full sm:w-32 md:w-40 lg:w-48 mx-auto sm:mx-0">
              <Link href={`/Article/${result.slug}`} className="block">
                <div className="border p-1 sm:p-2 inline-block w-full">
                  <Image
                    src={result.imageUrl || "/placeholder.svg"}
                    alt={result.title}
                    width={200}
                    height={200}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </Link>
            </div>

            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-bold mb-2">
                <Link href={`/Article/${result.slug}`} className="hover:text-green-500 transition-colors">
                  {result.title}
                </Link>
              </h2>

              <p className="text-xs sm:text-sm mb-2 sm:mb-3">
                {result.category && (
                  <>
                    Posted in{" "}
                    <Link href={`/?category=${result.category.slug}`} className="text-green-600 hover:underline">
                      {result.category.name}
                    </Link>
                  </>
                )}
                {result.updatedAt && (
                  <span>
                    • Updated: <FormattedDate date={result.updatedAt} />
                  </span>
                )}
              </p>

              <p className="text-gray-700 text-sm sm:text-base mb-3 sm:mb-4 line-clamp-3 sm:line-clamp-none">
                {result.description}
              </p>

              <Link
                href={`/Article/${result.slug}`}
                className="text-green-600 hover:underline font-medium text-sm sm:text-base"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <nav className="flex items-center gap-1">
            <Link
              href={`?${new URLSearchParams({
                ...(category ? { category } : {}),
                ...(search ? { search } : {}),
                page: "1",
              }).toString()}`}
              className={`px-3 py-1 rounded ${
                pagination.page === 1
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
              aria-disabled={pagination.page === 1}
              tabIndex={pagination.page === 1 ? -1 : undefined}
            >
              First
            </Link>

            <Link
              href={`?${new URLSearchParams({
                ...(category ? { category } : {}),
                ...(search ? { search } : {}),
                page: Math.max(1, pagination.page - 1).toString(),
              }).toString()}`}
              className={`px-3 py-1 rounded ${
                pagination.page === 1
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
              aria-disabled={pagination.page === 1}
              tabIndex={pagination.page === 1 ? -1 : undefined}
            >
              &laquo;
            </Link>

            <span className="px-3 py-1">
              Page {pagination.page} of {pagination.totalPages}
            </span>

            <Link
              href={`?${new URLSearchParams({
                ...(category ? { category } : {}),
                ...(search ? { search } : {}),
                page: Math.min(pagination.totalPages, pagination.page + 1).toString(),
              }).toString()}`}
              className={`px-3 py-1 rounded ${
                pagination.page === pagination.totalPages
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
              aria-disabled={pagination.page === pagination.totalPages}
              tabIndex={pagination.page === pagination.totalPages ? -1 : undefined}
            >
              &raquo;
            </Link>

            <Link
              href={`?${new URLSearchParams({
                ...(category ? { category } : {}),
                ...(search ? { search } : {}),
                page: pagination.totalPages.toString(),
              }).toString()}`}
              className={`px-3 py-1 rounded ${
                pagination.page === pagination.totalPages
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
              aria-disabled={pagination.page === pagination.totalPages}
              tabIndex={pagination.page === pagination.totalPages ? -1 : undefined}
            >
              Last
            </Link>
          </nav>
        </div>
      )}
    </div>
  )
}
