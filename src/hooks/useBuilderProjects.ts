import { useState, useEffect } from 'react'
import { getProjectsByDeveloper } from '../lib/supabase/database'
import { useAuth } from '../context/AuthContext'

export function useBuilderProjects() {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user, isAuthenticated } = useAuth()

  const fetchBuilderProjects = async () => {
    if (!isAuthenticated || !user) {
      setProjects([])
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)
      const data = await getProjectsByDeveloper(user.id)
      setProjects(data || [])
    } catch (err) {
      console.error('Error fetching builder projects:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch projects')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBuilderProjects()
  }, [isAuthenticated, user])

  return { 
    projects, 
    loading, 
    error, 
    refetch: fetchBuilderProjects 
  }
} 