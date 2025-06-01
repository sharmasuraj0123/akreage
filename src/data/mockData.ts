import { RealEstateAsset, Project, User, AUSDToken, Milestone } from '../types';

// AUSD Token Definition
export const ausdToken: AUSDToken = {
  name: "Akreage USD",
  symbol: "AUSD",
  decimals: 18,
  address: "0x1234567890123456789012345678901234567890", // Replace with actual contract address when deployed
  logoURI: "https://via.placeholder.com/128/4f46e5/FFFFFF?text=AUSD" // Replace with actual logo when available
};

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'user1',
    name: 'Alex Johnson',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    bio: 'Real estate developer with 15+ years experience',
    followers: 1240,
    following: 56
  },
  {
    id: 'user2',
    name: 'Sophia Chen',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    bio: 'Crypto investor and real estate enthusiast',
    followers: 3450,
    following: 124
  },
  {
    id: 'user3',
    name: 'Marcus Williams',
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    bio: 'Blockchain developer and property investor',
    followers: 5670,
    following: 230
  },
  {
    id: 'user4',
    name: 'Emma Davis',
    avatar: 'https://randomuser.me/api/portraits/women/19.jpg',
    bio: 'Architectural designer and urban planner',
    followers: 8900,
    following: 312
  }
];

// Mock Milestones
const mockMilestones: Milestone[] = [
  {
    id: 'm1',
    title: 'Land Acquisition',
    date: '2023-01-15',
    status: 'Completed',
    description: 'Successfully acquired the land plot for the project.'
  },
  {
    id: 'm2',
    title: 'Architectural Design Finalized',
    date: '2023-03-01',
    status: 'Completed',
    description: 'Finalized the architectural plans and blueprints.'
  },
  {
    id: 'm3',
    title: 'Permits Secured',
    date: '2023-05-20',
    status: 'Completed',
    description: 'Obtained all necessary building permits from local authorities.'
  },
  {
    id: 'm4',
    title: 'Foundation Laid',
    date: '2023-08-10',
    status: 'In Progress',
    description: 'Construction of the building foundation is currently underway.'
  },
  {
    id: 'm5',
    title: 'Structural Framing',
    date: '2023-11-01',
    status: 'Upcoming',
    description: 'Erection of the building\'s structural frame.'
  },
  {
    id: 'm6',
    title: 'Exterior Completion',
    date: '2024-02-15',
    status: 'Upcoming',
    description: 'Completion of the building exterior, including facade and roofing.'
  },
  {
    id: 'm7',
    title: 'Interior Finishing',
    date: '2024-06-01',
    status: 'Upcoming',
    description: 'Installation of interior elements like walls, flooring, and fixtures.'
  },
  {
    id: 'm8',
    title: 'Project Completion',
    date: '2024-09-30',
    status: 'Upcoming',
    description: 'Final project handover and readiness for occupancy.'
  }
];

// Mock Real Estate Assets
export const mockRealEstateAssets: RealEstateAsset[] = [
  {
    id: 'asset1',
    name: 'Aurelia Bay Resort',
    description: 'Luxury resort development with beachfront access and world-class amenities.',
    image: '/images/resort-project-1.png',
    images: [
      '/images/resort-project-1.png',
      '/images/resort-project-2.png',
      '/images/resort-project-3.png',
      '/images/resort-project-4.png'
    ],
    price: 1000000, // AUSD
    owner: 'user2',
    developer: 'user1',
    project: 'project1',
    likes: 24,
    isLiked: false,
    location: 'New York, USA',
    expectedReturn: 8.5,
    fundingGoal: 5000000, // AUSD
    fundingRaised: 2750000, // AUSD
    fundingDeadline: '2024-12-31',
    tokenSymbol: 'AUSD',
    nftContractAddress: '0x3680FE6cc714d49F8a78e61D901032792b6fa773',
    milestones: mockMilestones.slice(0, 5), // Assign some milestones
    documents: [
      {
        name: 'Title Deed',
        url: 'https://example.com/docs/skyline-title-deed.pdf',
        type: 'PDF',
        uploadedAt: '2023-01-10'
      },
      {
        name: 'Environmental Report',
        url: 'https://example.com/docs/skyline-environmental.pdf',
        type: 'PDF',
        uploadedAt: '2023-02-15'
      },
      {
        name: 'Appraisal Certificate',
        url: 'https://example.com/docs/skyline-appraisal.pdf',
        type: 'PDF',
        uploadedAt: '2023-03-05'
      }
    ]
  },
  {
    id: 'asset2',
    name: 'Momentum Arena',
    description: 'State-of-the-art sports and entertainment complex with multi-purpose facilities.',
    image: '/images/stadium-project-1.png',
    images: [
      '/images/stadium-project-1.png',
      '/images/stadium-project-2.png',
      '/images/stadium-project-3.png',
      '/images/stadium-project-4.png'
    ],
    price: 5000000, // AUSD
    owner: 'user1',
    developer: 'user1',
    project: 'project1',
    likes: 42,
    isLiked: true,
    location: 'Portland, USA',
    expectedReturn: 7.2,
    fundingGoal: 3500000, // AUSD
    fundingRaised: 2100000, // AUSD
    fundingDeadline: '2023-11-15',
    tokenSymbol: 'AUSD',
    milestones: mockMilestones.slice(2, 7), // Assign different milestones
    documents: [
      {
        name: 'Building Permit',
        url: 'https://example.com/docs/greenvalley-permit.pdf',
        type: 'PDF',
        uploadedAt: '2023-03-12'
      },
      {
        name: 'Sustainability Report',
        url: 'https://example.com/docs/greenvalley-sustainability.pdf',
        type: 'PDF',
        uploadedAt: '2023-04-01'
      }
    ]
  },
  {
    id: 'asset3',
    name: 'Skyline Residences',
    description: 'Premium high-rise residential towers with panoramic city views and luxury amenities.',
    image: '/images/condo-project-1.png',
    images: [
      '/images/condo-project-1.png',
      '/images/condo-project-2.png',
      '/images/condo-project-3.png',
      '/images/condo-project-4.png'
    ],
    price: 10000000, // AUSD
    owner: 'user3',
    developer: 'user3',
    project: 'project2',
    likes: 67,
    isLiked: false,
    location: 'Singapore',
    expectedReturn: 9.5,
    fundingGoal: 8000000, // AUSD
    fundingRaised: 5400000, // AUSD
    fundingDeadline: '2024-01-20',
    tokenSymbol: 'AUSD',
    milestones: mockMilestones.slice(1, 6), // Assign milestones
    documents: [
      {
        name: 'Zoning Certificate',
        url: 'https://example.com/docs/urbanhub-zoning.pdf',
        type: 'PDF',
        uploadedAt: '2023-04-20'
      },
      {
        name: 'Fire Safety Approval',
        url: 'https://example.com/docs/urbanhub-fire.pdf',
        type: 'PDF',
        uploadedAt: '2023-05-10'
      },
      {
        name: 'Insurance Policy',
        url: 'https://example.com/docs/urbanhub-insurance.pdf',
        type: 'PDF',
        uploadedAt: '2023-05-25'
      }
    ]
  }
];

// Mock Projects
export const mockProjects: Project[] = [
  {
    id: 'project1',
    name: 'Urban Renaissance',
    description: 'A collection of urban renewal projects focused on sustainable living and community development.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    developer: 'user1',
    properties: 12,
    minInvestment: 40000, // AUSD
    location: 'Multiple US Cities',
    totalFundingGoal: 25000000, // AUSD
    totalFundingRaised: 14500000, // AUSD
    // Additional properties for builder dashboard
    progress: 75,
    status: 'In Progress',
    duration: 18,
    startDate: 'Jan 2024',
    totalInvestment: 25000000,
    fundingRaised: 14500000,
    investorCount: 127,
    milestones: mockMilestones.slice(0, 4)
  },
  {
    id: 'project2',
    name: 'Global Business Centers',
    description: 'Premium commercial real estate in major business hubs around the world.',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    developer: 'user3',
    properties: 8,
    minInvestment: 75000, // AUSD
    location: 'Global',
    totalFundingGoal: 40000000, // AUSD
    totalFundingRaised: 22000000, // AUSD
    // Additional properties for builder dashboard
    progress: 45,
    status: 'Planning',
    duration: 24,
    startDate: 'Mar 2024',
    totalInvestment: 40000000,
    fundingRaised: 22000000,
    investorCount: 89,
    milestones: mockMilestones.slice(2, 6)
  },
  {
    id: 'project3',
    name: 'Leisure & Lifestyle',
    description: 'Luxury vacation properties and resorts in the world\'s most desirable destinations.',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    developer: 'user4',
    properties: 15,
    minInvestment: 30000, // AUSD
    location: 'Resort Destinations',
    totalFundingGoal: 35000000, // AUSD
    totalFundingRaised: 18000000, // AUSD
    // Additional properties for builder dashboard
    progress: 30,
    status: 'Approval Pending',
    duration: 36,
    startDate: 'Jun 2024',
    totalInvestment: 35000000,
    fundingRaised: 18000000,
    investorCount: 156,
    milestones: mockMilestones.slice(1, 5)
  },
  {
    id: 'project4',
    name: 'Skyline Tower Complex',
    description: 'Modern high-rise residential towers with panoramic city views and luxury amenities.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    developer: 'user1',
    properties: 6,
    minInvestment: 50000,
    location: 'New York, USA',
    totalFundingGoal: 15000000,
    totalFundingRaised: 11250000,
    progress: 85,
    status: 'Construction',
    duration: 15,
    startDate: 'Sep 2023',
    totalInvestment: 15000000,
    fundingRaised: 11250000,
    investorCount: 203,
    milestones: mockMilestones.slice(0, 6)
  },
  {
    id: 'project5',
    name: 'Green Valley Residences',
    description: 'Eco-friendly residential development with sustainable building practices and green spaces.',
    image: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    developer: 'user2',
    properties: 4,
    minInvestment: 35000,
    location: 'Portland, USA',
    totalFundingGoal: 8000000,
    totalFundingRaised: 3600000,
    progress: 45,
    status: 'Funding',
    duration: 20,
    startDate: 'Feb 2024',
    totalInvestment: 8000000,
    fundingRaised: 3600000,
    investorCount: 67,
    milestones: mockMilestones.slice(2, 7)
  },
  {
    id: 'project6',
    name: 'Urban Heights Complex',
    description: 'Mixed-use development combining residential, commercial, and retail spaces in downtown area.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    developer: 'user3',
    properties: 8,
    minInvestment: 60000,
    location: 'Miami, USA',
    totalFundingGoal: 20000000,
    totalFundingRaised: 0,
    progress: 0,
    status: 'Approval Pending',
    duration: 30,
    startDate: 'TBD',
    totalInvestment: 20000000,
    fundingRaised: 0,
    investorCount: 0,
    milestones: mockMilestones.slice(0, 3)
  }
];
