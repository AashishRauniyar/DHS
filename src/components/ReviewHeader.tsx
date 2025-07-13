"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Info, CheckCircle, Star, Edit, HelpCircle } from "lucide-react"

interface ReviewHeaderProps {
  id: string
}

interface ArticleData {
  title: string
  subtitle: string
  category: string
  categorySlug: string
  subcategory?: string
  subcategorySlug?: string
  author: string
  reviewer: {
    name: string
    credentials: string
  }
  updatedDate: string
  rating: number
  totalReviews: number
  isMedicallyCited: boolean
  isFactChecked: boolean
}

export default function ReviewHeader({ id }: ReviewHeaderProps) {
  const [articleData, setArticleData] = useState<ArticleData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching the article data
    const fetchArticleData = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800))

        // Mock data based on ID
        const mockData: Record<string, ArticleData> = {
          "1": {
            title: "Vital Prime Review: Can It Restore Long-Lasting Erections?",
            subtitle:
              "Vital Prime is a natural male enhancement supplement designed to improve blood flow, increase nitric oxide production, and support stronger erections.",
            category: "Reviews",
            categorySlug: "reviews",
            subcategory: "Male Enhancement",
            subcategorySlug: "male-enhancement",
            author: "Consumer Health Digest Staff",
            reviewer: {
              name: "Dr. Michael Stevens",
              credentials: "MD",
            },
            updatedDate: "2025, Apr 5",
            rating: 4.2,
            totalReviews: 8,
            isMedicallyCited: true,
            isFactChecked: true,
          },
          "2": {
            title: "Remedy Meds Review: Does It Really Work for Weight Loss?",
            subtitle:
              "Remedy Meds is a prescription-based GLP-1 weight loss program designed to reduce hunger, control cravings, and support fat loss.",
            category: "Reviews",
            categorySlug: "reviews",
            subcategory: "Weight Loss Programs",
            subcategorySlug: "weight-loss-programs",
            author: "Consumer Health Digest Staff",
            reviewer: {
              name: "Sarah Johnson",
              credentials: "RD",
            },
            updatedDate: "2025, Mar 28",
            rating: 3.8,
            totalReviews: 12,
            isMedicallyCited: true,
            isFactChecked: true,
          },
          "3": {
            title: "Superconductor Slim Review: A Natural Weight Loss Solution",
            subtitle:
              "Superconductor Slim is a natural, plant-based liquid supplement that helps supercharge your metabolism to support weight management and boost daily energy.",
            category: "Reviews",
            categorySlug: "reviews",
            subcategory: "Weight Loss Drops",
            subcategorySlug: "weight-loss-drops",
            author: "Consumer Health Digest Staff",
            reviewer: {
              name: "Jason Vredenburg",
              credentials: "RD",
            },
            updatedDate: "2025, Apr 2",
            rating: 1,
            totalReviews: 0,
            isMedicallyCited: true,
            isFactChecked: true,
          },
          "4": {
            title: "VitaBoost Pro Review: Complete Multivitamin Analysis",
            subtitle:
              "VitaBoost Pro is a comprehensive multivitamin formula designed to support overall health, immune function, and energy levels with essential nutrients.",
            category: "Reviews",
            categorySlug: "reviews",
            subcategory: "Vitamins",
            subcategorySlug: "vitamins",
            author: "Consumer Health Digest Staff",
            reviewer: {
              name: "Dr. Emily Chen",
              credentials: "PharmD",
            },
            updatedDate: "2025, Mar 15",
            rating: 4.5,
            totalReviews: 6,
            isMedicallyCited: true,
            isFactChecked: true,
          },
        }

        // Get data for the specific article ID or use a default
        const data = mockData[id] || {
          title: `Product ${id} Review`,
          subtitle: "This is a placeholder description for a product review.",
          category: "Reviews",
          categorySlug: "reviews",
          author: "Consumer Health Digest Staff",
          reviewer: {
            name: "Health Expert",
            credentials: "PhD",
          },
          updatedDate: "2025, Jan 1",
          rating: 3.0,
          totalReviews: 0,
          isMedicallyCited: false,
          isFactChecked: false,
        }

        setArticleData(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching article data:", error)
        setLoading(false)
      }
    }

    fetchArticleData()
  }, [id])

  // Render loading state
  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="bg-white py-4 border-b">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
        <div className="bg-gray-100 py-6">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="h-16 w-16 bg-gray-200 rounded-full"></div>
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/5"></div>
              </div>
              <div className="space-y-2 w-full md:w-1/3">
                <div className="h-8 bg-gray-200 rounded"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!articleData) {
    return null
  }

  return (
    <>
      {/* Top Section with Disclosure, Breadcrumbs, Title */}
      <div className="bg-white py-5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Advertising Disclosure */}
          <div className="flex items-center text-[#FF5722] mb-5">
            <span className="font-medium text-sm">Advertising Disclosure</span>
            <Info className="w-4 h-4 ml-1" />
          </div>

          {/* Breadcrumbs */}
          <nav className="mb-5">
            <ol className="flex flex-wrap items-center text-[15px]">
              <li>
                <Link href="/" className="font-medium text-[#333]">
                  Home
                </Link>
              </li>
              <li>
                <span className="mx-2 text-[#666]">{">"}</span>
              </li>
              <li>
                <Link href="/Article" className="font-medium text-[#333]">
                  {articleData.category}
                </Link>
              </li>
              {articleData.subcategory && (
                <>
                  <li>
                    <span className="mx-2 text-[#666]">{">"}</span>
                  </li>
                  <li>
                    <Link href={`/reviews/${articleData.subcategorySlug}`} className="font-medium text-[#333]">
                      {articleData.subcategory}
                    </Link>
                  </li>
                </>
              )}
            </ol>
          </nav>

          {/* Title and Subtitle */}
          <h1 className="text-[2.5rem] leading-[1.2] font-bold mb-4 text-[#111]">{articleData.title}</h1>
          <p className="text-[1.125rem] leading-[1.5] text-[#444] mb-6">{articleData.subtitle}</p>
        </div>
      </div>

      {/* Author Info and Ratings Section */}
      <div className="bg-[#b3d3ee] py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Author Info */}
            <div className="flex items-start gap-4 md:w-1/2">
              <div className="w-[70px] h-[70px] rounded-full bg-gray-300 overflow-hidden flex-shrink-0 relative">
                {/* Placeholder for author image using Next.js Image component */}
                <Image
                  src="/placeholder.svg?height=70&width=70"
                  alt=""
                  fill
                  sizes="70px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-[15px] mb-1">
                  <span className="font-medium">Written By </span>
                  <Link href="#" className="text-[#0066CC] hover:underline">
                    {articleData.author}
                  </Link>
                </p>
                <p className="text-[15px] mb-1">
                  <span className="font-medium">Reviewed by </span>
                  <Link href="#" className="text-[#0066CC] hover:underline">
                    {articleData.reviewer.name}, {articleData.reviewer.credentials}
                  </Link>
                </p>
                <p className="text-[15px] mb-3">
                  <span className="font-medium">Updated:</span> {articleData.updatedDate}
                </p>
                <div className="flex items-center gap-6">
                  {articleData.isMedicallyCited && (
                    <div className="flex items-center text-[#0066CC]">
                      <CheckCircle className="w-5 h-5 mr-2 fill-[#0066CC] text-white" />
                      <span className="text-[14px]">Medically Cited</span>
                    </div>
                  )}
                  {articleData.isFactChecked && (
                    <div className="flex items-center text-[#0066CC]">
                      <CheckCircle className="w-5 h-5 mr-2 fill-[#0066CC] text-white" />
                      <span className="text-[14px]">Fact Checked</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Ratings and Actions */}
            <div className="md:w-1/2 grid grid-cols-2 gap-3">
              <div className="bg-white p-3 rounded-md flex items-center justify-between">
                <div className="flex items-center">
                  <div className="text-[#FF5722] mr-2">
                    <Star className="w-5 h-5 fill-[#FF5722]" />
                  </div>
                  <span className="font-medium text-[15px]">{articleData.totalReviews} Reviews</span>
                </div>
                <span className="font-bold text-[15px]">{articleData.rating} out of 5</span>
              </div>
              <div className="bg-white p-3 rounded-md flex items-center">
                <div className="text-[#FF5722] mr-2">
                  <Edit className="w-5 h-5" />
                </div>
                <span className="font-medium text-[15px]">Specs</span>
              </div>
              <div className="bg-white p-3 rounded-md flex items-center">
                <div className="text-[#FF5722] mr-2">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <span className="font-medium text-[15px]">Ask a Question</span>
              </div>
              <div className="bg-white p-3 rounded-md flex items-center">
                <div className="text-[#FF5722] mr-2">
                  <Edit className="w-5 h-5" />
                </div>
                <span className="font-medium text-[15px]">Write a Review</span>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-6 p-4 border border-[#CCC] text-[13px] text-[#555] text-center rounded-md">
            <p>
              We independently research, review, and recommend the best products. Healthcare professionals review
              articles for medical accuracy. When you buy through our links, we may earn a commission. Read more about{" "}
              <Link href="#" className="text-[#0066CC] hover:underline">
                our process for evaluating brands and products
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

