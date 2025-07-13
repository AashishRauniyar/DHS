export default function MedicalExpertBoard() {
  return (
    <section className="bg-sky-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-4xl font-semibold text-blue-500 text-center mb-12">MEDICAL EXPERT BOARD</h2>

        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/3">
            <p className="text-2xl font-bold text-gray-800">
              Our team of more than 100+ board-certified physicians and health care professionals, to ensure our
              articles and content is medically accurate, relevant, and up-to-date.
            </p>

            <button className="mt-8 bg-lime-500 hover:bg-lime-600 text-gray-800 font-bold py-3 px-8 rounded-full w-full md:w-auto transition-colors">
              Meet The Team
            </button>
          </div>

          <div className="md:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Expert 1 */}
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mb-4"></div>
              <h3 className="text-blue-500 font-bold text-center">Pauline J. Jose, M.D.</h3>
              <p className="text-center text-sm mt-2">Specialist in Family Medicine</p>
            </div>

            {/* Expert 2 */}
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mb-4"></div>
              <h3 className="text-blue-500 font-bold text-center">Franz Gliederer, MD, MPH</h3>
              <p className="text-center text-sm mt-2">Functional Medicine, Urgent Care Physician</p>
            </div>

            {/* Expert 3 */}
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mb-4"></div>
              <h3 className="text-blue-500 font-bold text-center">Aneesh Singla, MD, MPH</h3>
              <p className="text-center text-sm mt-2">Physician, Interventional Pain Specialist</p>
            </div>

            {/* Expert 4 */}
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mb-4"></div>
              <h3 className="text-blue-500 font-bold text-center">Harlan Stueven, MD</h3>
              <p className="text-center text-sm mt-2">Board-Certified Emergency Physician</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

