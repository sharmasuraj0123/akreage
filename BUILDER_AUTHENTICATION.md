# Builder Authentication States

> This document describes the builder authentication flow for the [Akreage platform](./README.md).

## Table of Contents
- [Overview](#overview)
- [Logged Out State](#logged-out-state)
- [Logged In State](#logged-in-state)
- [Implementation Details](#implementation-details)

## Overview

The Builder section now has two distinct states based on user authentication:

### 1. **Logged Out State** (`/builder`)
When users visit `/builder` without being authenticated, they see:

#### **BuilderLanding Component**
- **Hero Section**: Compelling call-to-action to become a builder
- **Stats Section**: Platform statistics (Active Builders, Projects Funded, etc.)
- **Benefits Section**: Why choose Akreage for real estate development
- **Features Section**: Platform capabilities and tools
- **Featured Properties**: Showcase of successful projects (same as investor homepage)
- **CTA Section**: Final call-to-action to start building

#### **Key Features**:
- ✅ Information about becoming a builder
- ✅ Platform benefits and features
- ✅ Featured properties from the database
- ✅ Multiple login prompts throughout the page
- ✅ Professional, marketing-focused design

### 2. **Logged In State** (`/builder`)
When authenticated users visit `/builder`, they see:

#### **BuilderDashboard Component**
- **Header**: Welcome message with "Create New Project" button
- **Stats Overview**: Personal project statistics
  - Total Projects
  - Total Funding Raised
  - Active Projects
  - Average Progress
- **Projects Section**: Grid of user's projects with project cards
- **Quick Actions**: Links to resources, investor network, and analytics

#### **Key Features**:
- ✅ Personalized dashboard with user's projects
- ✅ Real-time statistics from database
- ✅ Project management interface
- ✅ Easy access to create new projects
- ✅ Professional builder tools and resources

## Routing Logic

### Protected Routes
- `/builder/create` - Project creation form (redirects to `/builder` if not authenticated)
- `/builder/dashboard` - Legacy dashboard (redirects to `/builder` if not authenticated)
- `/builder/stats` - Statistics page (redirects to `/builder` if not authenticated)

### Public Routes
- `/builder` - Shows different content based on authentication state

## Authentication Flow

1. **User visits `/builder`**
   - If **not authenticated**: Shows `BuilderLanding` with login prompts
   - If **authenticated**: Shows `BuilderDashboard` with projects

2. **User clicks login on BuilderLanding**
   - Triggers wallet connection via `useAuth` hook
   - On successful authentication, automatically shows `BuilderDashboard`

3. **User tries to access protected routes**
   - If not authenticated, redirects to `/builder` (landing page)
   - If authenticated, shows the requested page

## Components Created

### New Components:
- `src/components/builder/BuilderLanding.tsx` - Landing page for logged-out users
- `src/components/builder/BuilderDashboard.tsx` - Dashboard for logged-in users

### Updated Components:
- `src/App.tsx` - Added authentication logic for builder routes
- `src/components/layout/Header.tsx` - Fixed navigation paths

## Database Integration

Both states use real data from Supabase:
- **BuilderLanding**: Shows featured properties from `useAssets` hook
- **BuilderDashboard**: Shows user projects from `useProjects` hook
- **Real-time stats**: Calculated from actual database data

## User Experience

### For New Builders (Logged Out):
1. See compelling landing page explaining the platform
2. View featured properties to understand what's possible
3. Multiple opportunities to sign up/login
4. Clear value proposition and benefits

### For Existing Builders (Logged In):
1. Immediate access to their project dashboard
2. Quick stats overview of their performance
3. Easy project management and creation
4. Professional tools and resources

## Next Steps

- [ ] Implement user-specific project filtering (currently shows all projects)
- [ ] Add project creation form integration with database
- [ ] Implement analytics and reporting features
- [ ] Add investor network and communication tools
- [ ] Create admin approval workflow for new projects 