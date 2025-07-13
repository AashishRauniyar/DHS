export default function DashboardSection() {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
  
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
              <h3 className="text-lg font-medium text-blue-800 mb-2">Total Articles</h3>
              <p className="text-3xl font-bold text-blue-600">24</p>
            </div>
  
            <div className="bg-green-50 p-6 rounded-lg border border-green-100">
              <h3 className="text-lg font-medium text-green-800 mb-2">Published</h3>
              <p className="text-3xl font-bold text-green-600">18</p>
            </div>
  
            <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-100">
              <h3 className="text-lg font-medium text-yellow-800 mb-2">Drafts</h3>
              <p className="text-3xl font-bold text-yellow-600">6</p>
            </div>
          </div>
  
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
            <div className="border rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Article
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Published</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Superconductor Slim Review</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">John Doe</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2023-09-15</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Updated</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Top 10 Benefits</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Jane Smith</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2023-09-14</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Draft</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Comparison Guide</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">John Doe</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2023-09-13</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
  