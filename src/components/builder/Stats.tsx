import { Building, Users, Wallet } from 'lucide-react'

export const Stats = () => {
  return (
    <div className="grid grid-cols-3 gap-6 p-6 bg-white rounded-xl shadow-lg">
      <div className="text-center">
        <div className="flex justify-center">
          <Building className="h-8 w-8 text-indigo-600" />
        </div>
        <div className="mt-2">
          <div className="text-2xl font-bold">150+</div>
          <div className="text-sm text-gray-500">Projects Launched</div>
        </div>
      </div>
      
      <div className="text-center">
        <div className="flex justify-center">
          <Users className="h-8 w-8 text-indigo-600" />
        </div>
        <div className="mt-2">
          <div className="text-2xl font-bold">50K+</div>
          <div className="text-sm text-gray-500">Active Investors</div>
        </div>
      </div>
      
      <div className="text-center">
        <div className="flex justify-center">
          <Wallet className="h-8 w-8 text-indigo-600" />
        </div>
        <div className="mt-2">
          <div className="text-2xl font-bold">$100M+</div>
          <div className="text-sm text-gray-500">Total Value Locked</div>
        </div>
      </div>
    </div>
  )
} 