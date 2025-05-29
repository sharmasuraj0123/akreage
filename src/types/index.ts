export interface User {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
}

export interface Milestone {
  id: string;
  title: string;
  date: string;
  status: 'Completed' | 'In Progress' | 'Upcoming';
  description: string;
}

export interface Document {
  name: string;
  url: string;
  type?: string;
  uploadedAt?: string;
}

export interface RealEstateAsset {
  id: string;
  name: string;
  description: string;
  image: string;
  images?: string[]; // Add images array for multiple photos
  price: number; // Price in AUSD
  owner: string;
  developer: string;
  project: string;
  likes: number;
  isLiked: boolean;
  location: string;
  expectedReturn: number;
  fundingGoal: number; // Goal in AUSD
  fundingRaised: number; // Raised in AUSD
  fundingDeadline: string;
  tokenSymbol: string;
  nftContractAddress?: string,
  milestones?: Milestone[]; // Add milestones here
  documents?: Document[]; // Add documents here
}

export interface Project {
  id: string;
  name: string;
  description: string;
  image: string;
  developer: string;
  properties: number;
  minInvestment: number; // Minimum investment in AUSD
  location: string;
  totalFundingGoal: number; // Goal in AUSD
  totalFundingRaised: number; // Raised in AUSD
  // Additional properties for builder dashboard
  progress?: number;
  status?: string;
  duration?: number;
  startDate?: string;
  totalInvestment?: number;
  fundingRaised?: number;
  investorCount?: number;
  milestones?: Milestone[];
}

export interface AUSDToken {
  name: string;
  symbol: string;
  decimals: number;
  address: string;
  logoURI: string;
}
