import { useState, useEffect } from 'react'
import { getApprovedAssets, getAssetById } from '../lib/supabase/database'

export function useAssets() {
  const [assets, setAssets] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAssets = async () => {
    try {
      setLoading(true)
      const data = await getApprovedAssets()
      setAssets(data || [])
    } catch (err) {
      console.error('Error fetching assets:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch assets')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAssets()
  }, [])

  return { assets, loading, error, refetch: fetchAssets }
}

export function useAsset(id: string | null) {
  const [asset, setAsset] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) {
      setAsset(null)
      return
    }

    async function fetchAsset() {
      try {
        setLoading(true)
        const data = await getAssetById(id!)
        setAsset(data)
      } catch (err) {
        console.error('Error fetching asset:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch asset')
      } finally {
        setLoading(false)
      }
    }

    fetchAsset()
  }, [id])

  return { asset, loading, error }
} 