/* eslint-disable react/no-unescaped-entities */
import Image from "next/image"
import Link from "next/link"

interface HealthArticle {
  id: string
  title: string
  date: string
  category: string
  categorySlug: string
  description: string
  image: string
}

export default function MenWomenHealthListing() {
  // Sample data for health articles
  const articles: HealthArticle[] = [
    {
      id: "1",
      title: "Eros Power Review 2025: Do Not Buy Until You Read This! (In-depth and Unbiased)",
      date: "March 21, 2025",
      category: "Male Enhancement",
      categorySlug: "male-enhancement",
      description:
        "When it comes to male enhancement, many individuals are looking for solutions that offer a natural and effective boost without resorting to pharmaceuticals or invasive treatments. Eros Power is a male enhancement supplement that has generated significant attention due to its claims of improving performance and vitality. But before you decide to buy Eros Power, ...",
      image: "/supplement.jpg",
    },
    {
      id: "2",
      title: "Eronex Review 2025: Do Not Buy Until You Read This! (Updated, In-depth, Unbiased)",
      date: "March 18, 2025",
      category: "Male Enhancement",
      categorySlug: "male-enhancement",
      description:
        "Looking for an honest review of Eronex? Our comprehensive analysis covers ingredients, side effects, user results, and whether this supplement actually delivers on its promises...",
      image: "/supplement.jpg",
    },
    {
      id: "3",
      title: "Testosterin Review 2025: Don't Buy Until You Read This!",
      date: "March 15, 2025",
      category: "Male Enhancement",
      categorySlug: "male-enhancement",
      description:
        "Testosterin claims to boost testosterone naturally, but does it really work? Our in-depth review examines the science behind this popular supplement and what users are saying...",
      image: "/supplement.jpg",
    },
  ]

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      {/* Main Content */}
      <div className="container mx-auto px-8 md:px-12 lg:px-16">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Men's & Women's Health</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {articles.map((article) => (
              <div
                key={article.id}
                className="flex flex-col md:flex-row gap-6 bg-white rounded-lg shadow overflow-hidden p-6 border-b"
              >
                <div className="flex-shrink-0 w-full md:w-48">
                  <Link href="">
                    <div className="border p-2 inline-block">
                      <Image
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        width={200}
                        height={200}
                        className="w-full h-auto"
                        priority={article.id === "1"}
                      />
                    </div>
                  </Link>
                </div>

                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2">
                    <Link href="#" className="hover:text-blue-500 transition-colors">
                      {article.title}
                    </Link>
                  </h2>

                  <p className="text-gray-500 text-sm mb-3">
                    {article.date} • Posted in{" "}
                    <Link href="#" className="text-blue-500 hover:underline">
                      {article.category}
                    </Link>
                  </p>

                  <p className="text-gray-700 mb-4">{article.description}</p>

                  <div className="flex justify-between items-center">
                    <Link href="#" className="text-blue-500 hover:text-blue-700 font-medium transition-colors">
                      Read more
                    </Link>
                    <Link href="#" className="text-sm text-gray-600 hover:text-blue-500 transition-colors">
                      Leave a comment
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Recent Posts */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">Recent Posts</h3>
                <ul className="space-y-4">
                  <li>
                    <Link href="#" className="text-blue-500 hover:underline block transition-colors">
                      Eros Power Review 2025: Do Not Buy Until You Read This! (In-depth and Unbiased)
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-blue-500 hover:underline block transition-colors">
                      Eronex Review 2025: Do Not Buy Until You Read This! (Updated, In-depth, Unbiased)
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-blue-500 hover:underline block transition-colors">
                      Testosterin Review 2025: Don't Buy Until You Read This!
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-blue-500 hover:underline block transition-colors">
                      NanoDefense Pro Review 2025: Do Not Buy Until You Read This!
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-blue-500 hover:underline block transition-colors">
                      Plexus Slim Review 2025: Do Not Buy Until You Read This!
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Recent Comments */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">Recent Comments</h3>
                <ul className="space-y-4">
                  <li className="text-sm">
                    <Link href="#" className="text-blue-500 hover:underline font-medium transition-colors">
                      Prolong Power Review (Scam): Side Effects, Does It Work?
                    </Link>
                    <span className="text-gray-600"> on </span>
                    <Link href="#" className="text-blue-500 hover:underline transition-colors">
                      1 Male Enhancement Pill of 2024: VigRX Review (Doctor Approved, Fact Checked)
                    </Link>
                  </li>
                  <li className="text-sm">
                    <Link href="#" className="text-blue-500 hover:underline font-medium transition-colors">
                      John D.
                    </Link>
                    <span className="text-gray-600"> on </span>
                    <Link href="#" className="text-blue-500 hover:underline transition-colors">
                      Eros Power Review 2025: Do Not Buy Until You Read This!
                    </Link>
                  </li>
                  <li className="text-sm">
                    <Link href="#" className="text-blue-500 hover:underline font-medium transition-colors">
                      Michael T.
                    </Link>
                    <span className="text-gray-600"> on </span>
                    <Link href="#" className="text-blue-500 hover:underline transition-colors">
                      Testosterin Review 2025: Don't Buy Until You Read This!
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">Categories</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-gray-700 hover:text-blue-500 flex items-center transition-colors">
                      <span className="mr-2">•</span>
                      Male Enhancement
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-700 hover:text-blue-500 flex items-center transition-colors">
                      <span className="mr-2">•</span>
                      Women's Health
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-700 hover:text-blue-500 flex items-center transition-colors">
                      <span className="mr-2">•</span>
                      Weight Loss
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-700 hover:text-blue-500 flex items-center transition-colors">
                      <span className="mr-2">•</span>
                      Supplements
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-700 hover:text-blue-500 flex items-center transition-colors">
                      <span className="mr-2">•</span>
                      Product Reviews
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

