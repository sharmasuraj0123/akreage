import React, { useState } from 'react'
import { PerformanceOverview } from './PerformanceOverview'
import { ProjectCard } from './ProjectCard'
import { ProjectDetails } from './ProjectDetails'
import { useProjects } from '../../hooks/useProjects'

export function DashboardContent() {
  const { projects, loading, error } = useProjects()
  const [selectedProject, setSelectedProject] = useState<any | null>(null)

  const handleProjectClick = (project: any) => {
    setSelectedProject(project)
  }

  const handleBackToProjects = () => {
    setSelectedProject(null)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error loading projects: {error}</p>
      </div>
    )
  }

  if (selectedProject) {
    return (
      <ProjectDetails 
        project={selectedProject} 
        onBack={handleBackToProjects} 
      />
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold mb-6">Performance Overview</h2>
      <PerformanceOverview />
      
      <h2 className="text-2xl font-bold mt-12 mb-6">Your Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.slice(0, 6).map((project) => (
          <ProjectCard
            key={project.id}
            title={project.name}
            location={project.location}
            progress={project.progress || 0}
            image={project.image || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'}
            status={project.status}
            onClick={() => handleProjectClick(project)}
          />
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No projects found. Create your first project to get started!</p>
        </div>
      )}
    </div>
  )
} 