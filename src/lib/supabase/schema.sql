-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  avatar TEXT,
  bio TEXT,
  wallet_address TEXT UNIQUE, -- Added wallet address column with unique constraint
  followers INTEGER DEFAULT 0,
  following INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Unified Projects table (replaces both projects and real_estate_assets)
-- This table serves both builders (who create projects) and investors (who see investment opportunities)
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  image TEXT,
  images TEXT[], -- Array of image URLs for multiple photos
  
  -- Builder/Developer information
  developer_id UUID REFERENCES users(id) ON DELETE CASCADE,
  owner_id UUID REFERENCES users(id) ON DELETE CASCADE, -- Can be same as developer_id
  
  -- Project details
  location TEXT,
  property_type TEXT DEFAULT 'residential', -- residential, commercial, industrial
  
  -- Financial information
  price DECIMAL(15,2), -- Individual unit price (for assets) or min investment (for projects)
  min_investment DECIMAL(15,2) DEFAULT 0,
  funding_goal DECIMAL(15,2) NOT NULL,
  funding_raised DECIMAL(15,2) DEFAULT 0,
  funding_deadline DATE,
  expected_return DECIMAL(5,2), -- Percentage
  token_symbol TEXT DEFAULT 'AUSD',
  nft_contract_address TEXT,
  
  -- Project management
  properties_count INTEGER DEFAULT 1, -- Number of properties in this project
  progress INTEGER DEFAULT 0, -- Progress percentage
  status TEXT DEFAULT 'Planning', -- Planning, In Progress, Construction, Completed, etc.
  duration INTEGER, -- in months
  start_date TEXT,
  
  -- Social features
  likes INTEGER DEFAULT 0,
  investor_count INTEGER DEFAULT 0,
  
  -- Approval workflow
  approved BOOLEAN DEFAULT FALSE, -- Must be approved to appear in investor marketplace
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Milestones table (linked to projects)
CREATE TABLE milestones (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  date DATE,
  status TEXT CHECK (status IN ('Completed', 'In Progress', 'Upcoming')),
  description TEXT,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Documents table (linked to projects)
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  type TEXT,
  uploaded_at DATE,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User likes table (for tracking which users liked which projects)
CREATE TABLE user_project_likes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, project_id)
);

-- AUSD Token table (for token configuration)
CREATE TABLE ausd_token (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  symbol TEXT NOT NULL,
  decimals INTEGER NOT NULL,
  address TEXT NOT NULL,
  logo_uri TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_projects_developer ON projects(developer_id);
CREATE INDEX idx_projects_owner ON projects(owner_id);
CREATE INDEX idx_projects_approved ON projects(approved);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_milestones_project ON milestones(project_id);
CREATE INDEX idx_documents_project ON documents(project_id);
CREATE INDEX idx_user_likes_user ON user_project_likes(user_id);
CREATE INDEX idx_user_likes_project ON user_project_likes(project_id);
CREATE INDEX idx_users_wallet_address ON users(wallet_address);

-- Enable Row Level Security (RLS)
-- Note: RLS is disabled for users table since we use wallet-based authentication
-- ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_project_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE ausd_token ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Users: RLS disabled - managed through application logic with wallet authentication
-- No RLS policies needed for users table

-- Projects: Everyone can read approved projects, but we'll simplify since no Supabase auth
CREATE POLICY "Anyone can view approved projects" ON projects FOR SELECT USING (approved = true);
CREATE POLICY "Allow project creation" ON projects FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow project updates" ON projects FOR UPDATE USING (true);
CREATE POLICY "Allow project deletion" ON projects FOR DELETE USING (true);

-- Milestones: Readable by all for approved projects
CREATE POLICY "Milestones readable for approved projects" ON milestones FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM projects p WHERE p.id = project_id AND p.approved = true
  )
);
CREATE POLICY "Allow milestone management" ON milestones FOR ALL USING (true);

-- Documents: Similar to milestones
CREATE POLICY "Documents readable for approved projects" ON documents FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM projects p WHERE p.id = project_id AND p.approved = true
  )
);
CREATE POLICY "Allow document management" ON documents FOR ALL USING (true);

-- User likes: Users can manage their own likes (simplified)
CREATE POLICY "Users can view all likes" ON user_project_likes FOR SELECT USING (true);
CREATE POLICY "Allow like management" ON user_project_likes FOR ALL USING (true);

-- AUSD Token: Read-only for all users
CREATE POLICY "Anyone can view token info" ON ausd_token FOR SELECT USING (true); 