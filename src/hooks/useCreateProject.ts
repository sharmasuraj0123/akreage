import { useState } from 'react'
import { createProject, createMilestones } from '../lib/supabase/database'
import { useAuth } from '../context/AuthContext'

interface ProjectFormData {
  projectName: string
  projectLocation: string
  propertyType: string
  fundingDeadline: string
  totalFunding: number
  projectDuration: number
  milestones: Array<{
    title: string
    description: string
    duration: number
    fundingNeeded: number
  }>
}

export function useCreateProject() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  const createNewProject = async (formData: ProjectFormData) => {
    if (!user) {
      throw new Error('User must be authenticated to create a project')
    }

    try {
      setLoading(true)
      setError(null)

      // Transform form data to match database schema
      const projectData = {
        name: formData.projectName,
        description: `${formData.propertyType} development project in ${formData.projectLocation}`,
        location: formData.projectLocation,
        property_type: formData.propertyType,
        funding_goal: formData.totalFunding,
        funding_deadline: formData.fundingDeadline,
        duration: formData.projectDuration,
        developer_id: user.id,
        owner_id: user.id,
        min_investment: Math.floor(formData.totalFunding * 0.01), // 1% of total funding as min investment
        approved: false, // New projects start as unapproved
        status: 'Planning',
        progress: 0,
        properties_count: 1,
        token_symbol: 'AUSD',
        funding_raised: 0,
        likes: 0,
        investor_count: 0
      }

      const newProject = await createProject(projectData)
      
      // Create milestones if any are provided
      if (formData.milestones && formData.milestones.length > 0) {
        const milestonesWithContent = formData.milestones.filter(m => m.title.trim() !== '')
        if (milestonesWithContent.length > 0) {
          await createMilestones(newProject.id, milestonesWithContent.map(m => ({
            title: m.title,
            description: m.description || `${m.title} - Duration: ${m.duration} months, Funding: $${m.fundingNeeded.toLocaleString()}`,
            status: 'Upcoming'
          })))
        }
      }
      
      return newProject
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create project'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    createProject: createNewProject,
    loading,
    error
  }
} 