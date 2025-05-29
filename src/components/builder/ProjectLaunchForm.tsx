import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface Milestone {
  title: string
  description: string
  duration: number
  fundingNeeded: number
}

export const ProjectLaunchForm = () => {
  const [projectName, setProjectName] = useState('')
  const [projectLocation, setProjectLocation] = useState('')
  const [propertyType, setPropertyType] = useState('residential')
  const [fundingDeadline, setFundingDeadline] = useState('')
  const [totalFunding, setTotalFunding] = useState(100000)
  const [projectDuration, setProjectDuration] = useState(12)
  const [expandedMilestone, setExpandedMilestone] = useState<number | null>(null)
  const [milestones, setMilestones] = useState<Milestone[]>(
    Array(4).fill(null).map(() => ({
      title: '',
      description: '',
      duration: 3,
      fundingNeeded: 25000
    }))
  )
  
  const handleMilestoneToggle = (index: number) => {
    setExpandedMilestone(expandedMilestone === index ? null : index)
  }

  const updateMilestone = (index: number, field: keyof Milestone, value: string | number) => {
    setMilestones(prev => prev.map((milestone, i) => 
      i === index ? { ...milestone, [field]: value } : milestone
    ))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const projectData = {
      projectName,
      projectLocation,
      propertyType,
      fundingDeadline,
      totalFunding,
      projectDuration,
      milestones,
    }
    console.log('Project Data:', projectData)
    alert('Project Submitted Successfully! (Check console for details)')
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Launch a New Project</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 mb-1">
            Project Name
          </label>
          <input
            id="projectName"
            type="text"
            placeholder="Enter project name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label htmlFor="projectLocation" className="block text-sm font-medium text-gray-700 mb-1">
            Project Location
          </label>
          <input
            id="projectLocation"
            type="text"
            placeholder="Enter verified address"
            value={projectLocation}
            onChange={(e) => setProjectLocation(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Property Type
          </label>
          <div className="flex space-x-4">
            {['residential', 'commercial', 'industrial'].map((type) => (
              <label key={type} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="propertyType"
                  value={type}
                  checked={propertyType === type}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                />
                <span className="capitalize">{type}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="fundingDeadline" className="block text-sm font-medium text-gray-700 mb-1">
            Funding Deadline
          </label>
          <input
            id="fundingDeadline"
            type="date"
            value={fundingDeadline}
            onChange={(e) => setFundingDeadline(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Total Funding Required: ${totalFunding.toLocaleString()}
          </label>
          <input
            type="range"
            min="50000"
            max="1000000"
            step="50000"
            value={totalFunding}
            onChange={(e) => setTotalFunding(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-sm text-gray-500 mt-1">
            <span>$50K</span>
            <span>$1M</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Total Project Duration: {projectDuration} months
          </label>
          <input
            type="range"
            min="6"
            max="60"
            step="6"
            value={projectDuration}
            onChange={(e) => setProjectDuration(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-sm text-gray-500 mt-1">
            <span>6 months</span>
            <span>5 years</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Project Milestones</h2>
            <span className="text-sm text-gray-500">{milestones.length} milestones</span>
          </div>

          <div className="space-y-4">
            {milestones.map((milestone, index) => (
              <div key={index} className="border border-gray-200 rounded-lg">
                <button
                  type="button"
                  className="w-full px-4 py-3 flex justify-between items-center"
                  onClick={() => handleMilestoneToggle(index)}
                >
                  <span className="font-medium">
                    Milestone {index + 1}
                    {milestone.title && `: ${milestone.title}`}
                  </span>
                  {expandedMilestone === index ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>

                {expandedMilestone === index && (
                  <div className="p-4 border-t border-gray-200 space-y-4">
                    <input
                      type="text"
                      placeholder="Milestone Title"
                      value={milestone.title}
                      onChange={(e) => updateMilestone(index, 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <textarea
                      placeholder="Milestone Description"
                      value={milestone.description}
                      onChange={(e) => updateMilestone(index, 'description', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">
                        Duration: {milestone.duration} months
                      </label>
                      <input
                        type="range"
                        value={milestone.duration}
                        min={1}
                        max={12}
                        onChange={(e) => updateMilestone(index, 'duration', Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">
                        Funding Needed: ${milestone.fundingNeeded.toLocaleString()}
                      </label>
                      <input
                        type="range"
                        value={milestone.fundingNeeded}
                        min={10000}
                        max={500000}
                        step={10000}
                        onChange={(e) => updateMilestone(index, 'fundingNeeded', Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-6">
          <button 
            type="submit"
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Submit Project
          </button>
        </div>
      </form>
    </div>
  )
} 