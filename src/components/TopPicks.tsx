export default function TopPicks() {
    return (
      <div className="min-h-screen bg-sky-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-semibold text-center text-blue-500 mb-12">OUR TOP PICKS FOR YOU</h1>
  
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
  
            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-10">
              {/* Product 1 */}
              <div className="bg-white rounded-lg p-4 flex flex-col items-center">
                <div className="h-64 w-48 bg-gray-200 mb-4"></div>
                <h2 className="text-xl font-bold text-center">Noocube</h2>
                <p className="text-center text-gray-600 my-2">Premium Brain Productivity Supplement</p>
                <div className="flex my-2">
                  {[1, 2, 3, 4, 5].map((star, index) => (
                    <svg
                      key={index}
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 ${index < 4.5 ? "text-yellow-400" : "text-gray-300"}`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 font-bold">4.8</span>
                </div>
                <a
                  href="#"
                  className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded w-full text-center"
                >
                  Check Price
                </a>
              </div>
  
              {/* Product 2 */}
              <div className="bg-white rounded-lg p-4 flex flex-col items-center">
                <div className="h-64 w-48 bg-gray-200 mb-4"></div>
                <h2 className="text-xl font-bold text-center text-green-600">Nootrogen</h2>
                <p className="text-center text-gray-600 my-2">Nutritional Nootropic Brain Support</p>
                <div className="flex my-2">
                  {[1, 2, 3, 4, 5].map((star, index) => (
                    <svg
                      key={index}
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 ${index < 4.9 ? "text-yellow-400" : "text-gray-300"}`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 font-bold">4.9</span>
                </div>
                <a
                  href="#"
                  className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded w-full text-center"
                >
                  Check Price
                </a>
              </div>
  
              {/* Product 3 */}
              <div className="bg-white rounded-lg p-4 flex flex-col items-center">
                <div className="h-64 w-48 bg-gray-200 mb-4"></div>
                <h2 className="text-xl font-bold text-center">ProJoint Plus</h2>
                <p className="text-center text-gray-600 my-2">Premium jbsjbs bbdskjb Joint Support</p>
                <div className="flex my-2">
                  {[1, 2, 3, 4, 5].map((star, index) => (
                    <svg
                      key={index}
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 ${index < 4.7 ? "text-yellow-400" : "text-gray-300"}`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 font-bold">4.7</span>
                </div>
                <a
                  href="#"
                  className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded w-full text-center"
                >
                  Check Price
                </a>
              </div>
  
              {/* Product 4 */}
              <div className="bg-white rounded-lg p-4 flex flex-col items-center">
                <div className="h-64 w-48 bg-gray-200 mb-4"></div>
                <h2 className="text-xl font-bold text-center">Alpha Brain</h2>
                <p className="text-center text-gray-600 my-2">Premium Nootropic Brain Supplement</p>
                <div className="flex my-2">
                  {[1, 2, 3, 4, 5].map((star, index) => (
                    <svg
                      key={index}
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 ${index < 4.8 ? "text-yellow-400" : "text-gray-300"}`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 font-bold">4.8</span>
                </div>
                <a
                  href="#"
                  className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded w-full text-center"
                >
                  Check Price
                </a>
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
      </div>
    )
  }
  
  