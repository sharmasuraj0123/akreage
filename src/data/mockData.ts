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
    name: 'Skyline Tower #42',
    description: 'Luxury apartment complex in downtown with panoramic city views and premium amenities.',
    image: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1464983953574-0892a716854b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    price: 1000, // AUSD
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
    name: 'Green Valley Residences #08',
    description: 'Eco-friendly residential development with sustainable features and community gardens.',
    image: 'https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1465101178521-c1a9136a3fdc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    price: 75000, // AUSD
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
    name: 'Urban Hub Commercial #15',
    description: 'Mixed-use development with retail spaces, offices, and co-working areas in a prime location.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    price: 120000, // AUSD
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
    totalFundingRaised: 14500000 // AUSD
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
    totalFundingRaised: 22000000 // AUSD
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
    totalFundingRaised: 18000000 // AUSD
  }
];
