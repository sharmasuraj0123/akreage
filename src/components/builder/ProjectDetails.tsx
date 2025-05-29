import { ArrowLeft, Building, Calendar, DollarSign, MapPin, Users, MessageSquare, Image as ImageIcon, FileText, PlusCircle } from 'lucide-react'
import { Project } from '../../types'

interface ProjectDetailsProps {
  project: Project
  onBack: () => void
}

export const ProjectDetails = ({ project, onBack }: ProjectDetailsProps) => {
  return (
    <div className="relative">
      <button 
        onClick={onBack}
        className="fixed top-20 left-4 z-10 flex items-center px-3 py-2 bg-white rounded-md shadow-md text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back
      </button>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="h-64 relative">
            <img 
              src={project.image} 
              alt={project.name} 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
            <div className="flex items-center mt-2 text-gray-600">
              <MapPin className="h-4 w-4 mr-1" />
              {project.location}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center text-gray-600 mb-2">
                  <Calendar className="h-4 w-4 mr-2" />
                  Project Timeline
                </div>
                <div className="text-lg font-semibold">{project.duration} months</div>
                <div className="text-sm text-gray-500">Started: {project.startDate}</div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center text-gray-600 mb-2">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Total Investment
                </div>
                <div className="text-lg font-semibold">${project.totalInvestment.toLocaleString()}</div>
                <div className="text-sm text-gray-500">Funded: {Math.round((project.fundingRaised / project.totalInvestment) * 100)}%</div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center text-gray-600 mb-2">
                  <Users className="h-4 w-4 mr-2" />
                  Total Investors
                </div>
                <div className="text-lg font-semibold">{project.investorCount}</div>
                <div className="text-sm text-gray-500">Active investors</div>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Project Progress</h2>
              <div className="bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-indigo-600 h-2 rounded-full" 
                  style={{ width: `${project.progress}%` }}
                />
              </div>
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>Progress: {project.progress}%</span>
                <span>Target: 100%</span>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Project Milestones</h2>
              <div className="space-y-4">
                {project.milestones.map((milestone, index) => (
                  <div key={index} className={`border-l-2 ${milestone.status === 'Completed' ? 'border-indigo-600' : 'border-gray-200'} pl-4`}>
                    <div className="font-medium">{milestone.title}</div>
                    <div className="text-sm text-gray-500">{milestone.description}</div>
                    <div className="text-sm text-gray-500">{milestone.status} - {milestone.date}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex space-x-4">
              <button className="flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-md">
                <Building className="h-4 w-4 mr-2" />
                Post Update
              </button>
              <button className="flex items-center px-4 py-2 bg-green-50 text-green-700 rounded-md">
                Request Funds
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline/Feed Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-6">Project Updates</h2>
            
            {/* Post update form */}
            <div className="mb-8 bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-4 mb-4">
                <button className="flex items-center text-gray-600 hover:text-gray-900">
                  <ImageIcon className="h-5 w-5 mr-2" />
                  Image
                </button>
                <button className="flex items-center text-gray-600 hover:text-gray-900">
                  <FileText className="h-5 w-5 mr-2" />
                  Document
                </button>
              </div>
              <textarea 
                placeholder="Share a project update..."
                className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows={3}
              />
              <div className="flex justify-end mt-2">
                <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Post Update
                </button>
              </div>
            </div>

            {/* Timeline items */}
            <div className="space-y-6">
              <div className="border-b border-gray-100 pb-6">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <Building className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">Construction Update</p>
                      <p className="text-sm text-gray-500">Posted by {project.developer} • 2 days ago</p>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">Foundation work completed ahead of schedule. Starting structural framework next week.</p>
                <img 
                  src={project.image} 
                  alt="Construction progress" 
                  className="mt-3 rounded-lg w-full h-48 object-cover"
                />
                <div className="flex items-center gap-4 mt-4">
                  <button className="flex items-center text-gray-500 hover:text-gray-700">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    <span className="text-sm">12 comments</span>
                  </button>
                </div>
              </div>

              <div className="border-b border-gray-100 pb-6">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <DollarSign className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">Funding Milestone Reached</p>
                      <p className="text-sm text-gray-500">Posted by System • 1 week ago</p>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">Phase 2 funding target of ${(project.fundingRaised / 1000000).toFixed(1)}M has been successfully reached. Thank you to all our investors!</p>
                <div className="flex items-center gap-4 mt-4">
                  <button className="flex items-center text-gray-500 hover:text-gray-700">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    <span className="text-sm">8 comments</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 