"use client"
import { FaFlask, FaStar, FaSearch, FaBell } from "react-icons/fa"
import { useRouter } from "next/navigation";

export default function HomeContent() {
  const router = useRouter();
  return (
    <section className="bg-sky-200 py-12 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        {/* Left Column - Text Content */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Trusted Reviews,
            <br />
            Honest Ratings and
            <br />
            Quality Advice
          </h1>
          <p className="text-lg text-gray-700">
            Consumer Health Digest is your premier source for evidence-based health and wellness information and
            unbiased product reviews.
          </p>

          <div className="relative mt-8">
            <input
              type="text"
              placeholder="How can we help you?"
              className="w-full py-3 bg-white px-4 pr-24 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button onClick={() => router.push("/ArticleListing")} className="absolute right-0 top-0 h-full bg-orange-500 hover:bg-orange-600 text-white px-6 rounded-r-full flex items-center transition-colors">
            
              SEARCH <span className="ml-2">→</span>
              
            </button>
          </div>
        </div>

        {/* Right Column - Stats and Features */}
        <div>
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Reviewed
              <br />
              Over 10K+ Products
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-sm text-center">
              <div className="flex justify-center mb-3">
                <FaFlask className="w-14 h-14 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold">Find The Best Products</h3>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm text-center">
              <div className="flex justify-center mb-3">
                <FaStar className="w-14 h-14 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold">Up-to-Date Reviews</h3>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm text-center">
              <div className="flex justify-center mb-3">
                <FaSearch className="w-14 h-14 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold">Experienced Researchers</h3>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm text-center">
              <div className="flex justify-center mb-3">
                <FaBell className="w-14 h-14 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold">Stay Informed</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

