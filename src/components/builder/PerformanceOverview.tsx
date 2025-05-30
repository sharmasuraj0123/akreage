import { Building, DollarSign, Users } from 'lucide-react'

export const PerformanceOverview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white p-6 rounded-lg shadow flex items-center space-x-4">
        <div className="bg-blue-50 p-3 rounded-lg">
          <Building className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <div className="text-sm text-gray-500">Total Projects</div>
          <div className="text-2xl font-bold">12</div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow flex items-center space-x-4">
        <div className="bg-green-50 p-3 rounded-lg">
          <DollarSign className="h-6 w-6 text-green-600" />
        </div>
        <div>
          <div className="text-sm text-gray-500">Total Value Locked</div>
          <div className="text-2xl font-bold">$24.5M</div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow flex items-center space-x-4">
        <div className="bg-purple-50 p-3 rounded-lg">
          <Users className="h-6 w-6 text-purple-600" />
        </div>
        <div>
          <div className="text-sm text-gray-500">Total Investors</div>
          <div className="text-2xl font-bold">847</div>
        </div>
      </div>
    </div>
  )
} 