export default function FeaturedTopics() {
    return (
      <section className="py-12 px-4 ">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8 border-b pb-2">
            <h2 className="text-4xl font-bold text-blue-500">Featured Topic</h2>
            <a href="#" className="text-red-600 font-bold flex items-center hover:underline">
              VIEW ALL
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
  
          <div className="relative">
            {/* Left Arrow */}
            <button className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
  
            {/* Topics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 px-10">
              {/* Topic 1 */}
              <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4">
                  <h3 className="font-bold text-center">Essential Oils : What To Know About Essential Oils?</h3>
                </div>
              </div>
  
              {/* Topic 2 */}
              <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4">
                  <h3 className="font-bold text-center">Dietitian-Approved Foods To Boost Testosterone Naturally</h3>
                </div>
              </div>
  
              {/* Topic 3 */}
              <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4">
                  <h3 className="font-bold text-center">Best Low-Carb Vegetables, Recommended By Dietitians</h3>
                </div>
              </div>
  
              {/* Topic 4 */}
              <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4">
                  <h3 className="font-bold text-center">List Of Low-Calorie Foods – Nutritious Way For Healthy Diet</h3>
                </div>
              </div>
  
              {/* Topic 5 */}
              <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4">
                  <h3 className="font-bold text-center">10 Superfoods For Better Health</h3>
                </div>
              </div>
            </div>
  
            {/* Right Arrow */}
            <button className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    )
  }
  
  