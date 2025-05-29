import { createClient } from './client'
import { Database } from '../../types/database'

type Tables = Database['public']['Tables']
type Project = Tables['projects']['Row']

// Projects (unified table for both project collections and individual investment opportunities)
export async function getApprovedProjects() {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      owner:users!owner_id(*),
      developer:users!developer_id(*),
      milestones(*),
      documents(*)
    `)
    .eq('approved', true)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function getProjectById(id: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      owner:users!owner_id(*),
      developer:users!developer_id(*),
      milestones(*),
      documents(*)
    `)
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export async function createProject(project: Tables['projects']['Insert']) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('projects')
    .insert(project)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateProject(id: string, updates: Tables['projects']['Update']) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('projects')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

// Get projects by developer (for builder dashboard)
export async function getProjectsByDeveloper(developerId: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      owner:users!owner_id(*),
      developer:users!developer_id(*),
      milestones(*),
      documents(*)
    `)
    .eq('developer_id', developerId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

// Get all projects (for admin/management purposes)
export async function getAllProjects() {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      owner:users!owner_id(*),
      developer:users!developer_id(*),
      milestones(*),
      documents(*)
    `)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

// Legacy function names for backward compatibility
export const getApprovedAssets = getApprovedProjects
export const getAssetById = getProjectById
export const createAsset = createProject
export const updateAsset = updateProject

// Users
export async function getUserById(id: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

// Find user by wallet address (we'll store it in the bio field temporarily)
// In production, you'd want to add a proper wallet_address column
export async function getUserByWalletAddress(walletAddress: string) {
  const supabase = createClient()
  
  // For now, we'll store the wallet address in the bio field and search by it
  // This is a temporary solution - in production you'd add a wallet_address column
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('bio', `wallet:${walletAddress}`)
    .maybeSingle() // Use maybeSingle to avoid error if no user found

  if (error) throw error
  return data
}

// Find or create user by wallet address
export async function findOrCreateUserByWallet(walletAddress: string, userData?: {
  name?: string
  avatar?: string
}) {
  const supabase = createClient()
  
  // First try to find existing user
  let user = await getUserByWalletAddress(walletAddress)
  
  if (!user) {
    // Create new user with auto-generated UUID
    const newUserData = {
      name: userData?.name || 'Connected User',
      avatar: userData?.avatar || 'https://randomuser.me/api/portraits/men/1.jpg',
      bio: `wallet:${walletAddress}`, // Store wallet address in bio field temporarily
      followers: 0,
      following: 0
    }
    
    user = await createUser(newUserData)
  }
  
  return user
}

export async function createUser(user: Tables['users']['Insert']) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('users')
    .insert(user)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateUser(id: string, updates: Tables['users']['Update']) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

// Asset Likes
export async function toggleAssetLike(userId: string, assetId: string) {
  const supabase = createClient()
  
  // Check if like exists
  const { data: existingLike } = await supabase
    .from('user_asset_likes')
    .select('id')
    .eq('user_id', userId)
    .eq('asset_id', assetId)
    .single()

  if (existingLike) {
    // Remove like
    const { error } = await supabase
      .from('user_asset_likes')
      .delete()
      .eq('user_id', userId)
      .eq('asset_id', assetId)
    
    if (error) throw error
    
    // Decrement likes count
    const { error: updateError } = await supabase
      .rpc('decrement_likes', { asset_id: assetId })
    
    if (updateError) throw updateError
    return false
  } else {
    // Add like
    const { error } = await supabase
      .from('user_asset_likes')
      .insert({ user_id: userId, asset_id: assetId })
    
    if (error) throw error
    
    // Increment likes count
    const { error: updateError } = await supabase
      .rpc('increment_likes', { asset_id: assetId })
    
    if (updateError) throw updateError
    return true
  }
}

export async function getUserAssetLikes(userId: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('user_asset_likes')
    .select('asset_id')
    .eq('user_id', userId)

  if (error) throw error
  return data.map(like => like.asset_id)
}

// AUSD Token
export async function getAUSDToken() {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('ausd_token')
    .select('*')
    .single()

  if (error) throw error
  return data
}

// Create milestones for a project
export async function createMilestones(projectId: string, milestones: Array<{
  title: string
  description: string
  status?: string
}>) {
  const supabase = createClient()
  
  const milestonesToInsert = milestones.map(milestone => ({
    title: milestone.title,
    description: milestone.description,
    status: milestone.status || 'Upcoming',
    project_id: projectId
  }))
  
  const { data, error } = await supabase
    .from('milestones')
    .insert(milestonesToInsert)
    .select()

  if (error) throw error
  return data
} 