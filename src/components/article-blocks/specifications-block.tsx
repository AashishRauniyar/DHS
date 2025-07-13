interface SpecificationsBlockProps {
  block: {
    id: string
    specifications?: Array<{
      id: string
      name: string
      value: string
      order: number
    }>
  }
}

export function SpecificationsBlock({ block }: SpecificationsBlockProps) {
  const specifications = block.specifications || []

  // Sort by order
  const sortedSpecs = [...specifications].sort((a, b) => a.order - b.order)

  if (sortedSpecs.length === 0) {
    return null
  }

  return (
    <div className="my-6">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Specification
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Value
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedSpecs.map((spec) => (
              <tr key={spec.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{spec.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{spec.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
