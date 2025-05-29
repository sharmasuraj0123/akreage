# Builder Section

This directory contains the builder functionality for the Akreage platform, allowing developers to launch and manage real estate projects.

## Components

### ProjectLaunchForm
- **Purpose**: Form for developers to create new real estate projects
- **Features**: 
  - Project details input (name, location, property type)
  - Funding configuration (amount, deadline)
  - Project timeline setup
  - Milestone management with expandable sections
  - Form validation and submission

### DashboardContent
- **Purpose**: Main dashboard view for developers to manage their projects
- **Features**:
  - Performance overview with key metrics
  - Project grid displaying all developer projects
  - Project detail navigation
  - Integration with mock data

### ProjectDetails
- **Purpose**: Detailed view of individual projects
- **Features**:
  - Project information display
  - Timeline and funding progress
  - Milestone tracking
  - Project updates feed
  - Interactive elements for posting updates

### ProjectCard
- **Purpose**: Card component for displaying project summaries
- **Features**:
  - Project image, title, and location
  - Progress bar with percentage
  - Status indicators
  - Click navigation to project details

### PerformanceOverview
- **Purpose**: Dashboard metrics overview
- **Features**:
  - Total projects count
  - Total value locked
  - Total investors count
  - Visual icons and styling

### Stats
- **Purpose**: Platform-wide statistics display
- **Features**:
  - Projects launched count
  - Active investors count
  - Total value locked amount
  - Responsive grid layout

## Navigation

The builder section is accessible through:
- **Desktop**: Builder tab in the main navigation
- **Mobile**: Builder option in the mobile menu
- **Routes**:
  - `/builder` - Main dashboard
  - `/builder/launch` - Project launch form

## Data Integration

The builder components use the shared mock data from `src/data/mockData.ts`:
- `mockProjects` - Extended with builder-specific properties
- `mockMilestones` - Shared milestone data
- `mockUsers` - Developer information

## Type Definitions

Extended the `Project` interface in `src/types/index.ts` to include:
- `progress` - Project completion percentage
- `status` - Current project status
- `duration` - Project timeline in months
- `startDate` - Project start date
- `totalInvestment` - Total investment amount
- `fundingRaised` - Amount of funding raised
- `investorCount` - Number of investors
- `milestones` - Project milestones array 