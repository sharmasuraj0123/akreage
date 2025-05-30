import { useState, useEffect } from 'react'
import { getApprovedAssets, getAssetById } from '../lib/supabase/database'
import { RealEstateAsset } from '../types'

// Transform database project to match RealEstateAsset interface
const transformAsset = (dbAsset: any): RealEstateAsset => ({
  id: dbAsset.id,
  name: dbAsset.name,
  description: dbAsset.description || '',
  image: dbAsset.image || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  images: dbAsset.images || [dbAsset.image],
  price: dbAsset.price || dbAsset.min_investment || 0,
  owner: dbAsset.owner_id || 'Unknown Owner',
  developer: dbAsset.developer_id || 'Unknown Developer',
  project: dbAsset.id, // Use the same ID for project reference
  likes: dbAsset.likes || 0,
  isLiked: false, // This will be set based on user preferences
  location: dbAsset.location || '',
  expectedReturn: dbAsset.expected_return || 0,
  fundingGoal: dbAsset.funding_goal || 0,
  fundingRaised: dbAsset.funding_raised || 0,
  fundingDeadline: dbAsset.funding_deadline || new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  tokenSymbol: dbAsset.token_symbol || 'AUSD',
  nftContractAddress: dbAsset.nft_contract_address,
  milestones: dbAsset.milestones || [],
  documents: dbAsset.documents || []
});

export function useAssets() {
  const [assets, setAssets] = useState<RealEstateAsset[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAssets = async () => {
    try {
      setLoading(true)
      const data = await getApprovedAssets()
      const transformedAssets = (data || []).map(transformAsset)
      setAssets(transformedAssets)
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
  const [asset, setAsset] = useState<RealEstateAsset | null>(null)
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
        const transformedAsset = data ? transformAsset(data) : null
        setAsset(transformedAsset)
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