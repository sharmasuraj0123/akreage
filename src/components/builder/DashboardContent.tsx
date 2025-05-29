import { useState } from 'react'
import { PerformanceOverview } from './PerformanceOverview'
import { ProjectCard } from './ProjectCard'
import { ProjectDetails } from './ProjectDetails'
import { mockProjects } from '../../data/mockData'

export const DashboardContent = () => {
  const [selectedProject, setSelectedProject] = useState<typeof mockProjects[0] | null>(null)

  const handleProjectClick = (project: typeof mockProjects[0]) => {
    setSelectedProject(project)
  }

  const handleBack = () => {
    setSelectedProject(null)
  }

  if (selectedProject) {
    return <ProjectDetails project={selectedProject} onBack={handleBack} />
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold mb-6">Performance Overview</h2>
      <PerformanceOverview />
      
      <h2 className="text-2xl font-bold mt-12 mb-6">Your Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProjects.slice(0, 6).map((project) => (
          <ProjectCard 
            key={project.id}
            title={project.name}
            location={project.location}
            progress={project.progress}
            image={project.image}
            status={project.status}
            onClick={() => handleProjectClick(project)}
          />
        ))}
      </div>
    </div>
  )
} 