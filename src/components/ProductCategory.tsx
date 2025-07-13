import { FaWeight, FaBrain, FaMale, FaEye } from "react-icons/fa"
import { GiJoint, GiAnticlockwiseRotation } from "react-icons/gi"

export default function ProductCategories() {
  return (
    <section className="py-12 px-4 sm:px-6 md:px-8 lg:px-16 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8 px-2">
          <h2 className="text-3xl sm:text-4xl font-semibold text-blue-500 text-center flex-grow font-Poppins">
            PRODUCT REVIEW
          </h2>
          <a href="/ProductSearch" className="text-red-500 font-semibold flex items-center hover:underline">
            VIEW ALL <span className="ml-1">→</span>
          </a>
        </div>

        <div className="bg-white rounded-lg overflow-hidden shadow-sm">
          {/* First Row */}
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="p-6 md:p-8 flex items-center group hover:bg-gray-50 transition-all duration-300">
              <div className="mr-6 text-sky-400 transform transition-transform duration-300 group-hover:scale-125">
                <FaWeight size={60} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-500 transform transition-all duration-300 group-hover:scale-110 group-hover:translate-x-1">
                Weight Loss
              </h3>
            </div>

            <div className="p-6 md:p-8 flex items-center group hover:bg-gray-50 transition-all duration-300">
              <div className="mr-6 text-sky-400 transform transition-transform duration-300 group-hover:scale-125">
                <GiJoint size={60} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-500 transform transition-all duration-300 group-hover:scale-110 group-hover:translate-x-1">
                Joint Pain
              </h3>
            </div>

            <div className="p-6 md:p-8 flex items-center group hover:bg-gray-50 transition-all duration-300">
              <div className="mr-6 text-sky-400 transform transition-transform duration-300 group-hover:scale-125">
                <FaMale size={60} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-500 transform transition-all duration-300 group-hover:scale-110 group-hover:translate-x-1">
                Men&apos;s Health
              </h3>
            </div>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="p-6 md:p-8 flex items-center group hover:bg-gray-50 transition-all duration-300">
              <div className="mr-6 text-sky-400 transform transition-transform duration-300 group-hover:scale-125">
                <FaBrain size={60} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-500 transform transition-all duration-300 group-hover:scale-110 group-hover:translate-x-1">
                Brain Health
              </h3>
            </div>

            <div className="p-6 md:p-8 flex items-center group hover:bg-gray-50 transition-all duration-300">
              <div className="mr-6 text-sky-400 transform transition-transform duration-300 group-hover:scale-125">
                <GiAnticlockwiseRotation size={60} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-500 transform transition-all duration-300 group-hover:scale-110 group-hover:translate-x-1">
                Anti-Aging
              </h3>
            </div>

            <div className="p-6 md:p-8 flex items-center group hover:bg-gray-50 transition-all duration-300">
              <div className="mr-6 text-sky-400 transform transition-transform duration-300 group-hover:scale-125">
                <FaEye size={60} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-500 transform transition-all duration-300 group-hover:scale-110 group-hover:translate-x-1">
                Eye Cream
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

