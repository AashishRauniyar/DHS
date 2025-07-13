import { CheckCircle, XCircle } from "lucide-react"

interface ProsConsBlockProps {
  block: {
    id: string
    pros?: Array<{ id: string; content: string; order: number }>
    cons?: Array<{ id: string; content: string; order: number }>
  }
}

export function ProsConsBlock({ block }: ProsConsBlockProps) {
  const pros = block.pros || []
  const cons = block.cons || []

  // Sort by order
  const sortedPros = [...pros].sort((a, b) => a.order - b.order)
  const sortedCons = [...cons].sort((a, b) => a.order - b.order)

  return (
    <div className="grid md:grid-cols-2 gap-6 my-6">
      {/* Pros */}
      <div className="bg-green-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
          <CheckCircle className="mr-2 h-5 w-5" />
          Pros
        </h3>

        <ul className="space-y-2">
          {sortedPros.map((pro) => (
            <li key={pro.id} className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
              <span>{pro.content}</span>
            </li>
          ))}

          {sortedPros.length === 0 && <li className="text-gray-500 italic">No pros listed</li>}
        </ul>
      </div>

      {/* Cons */}
      <div className="bg-red-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-red-800 mb-4 flex items-center">
          <XCircle className="mr-2 h-5 w-5" />
          Cons
        </h3>

        <ul className="space-y-2">
          {sortedCons.map((con) => (
            <li key={con.id} className="flex items-start">
              <XCircle className="h-5 w-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
              <span>{con.content}</span>
            </li>
          ))}

          {sortedCons.length === 0 && <li className="text-gray-500 italic">No cons listed</li>}
        </ul>
      </div>
    </div>
  )
}
