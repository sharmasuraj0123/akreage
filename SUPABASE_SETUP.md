# Supabase Database Setup Guide

> This guide is part of the [Akreage platform documentation](./README.md). For a complete overview of the project, see the main README.

## Table of Contents
- [Environment Variables](#1-environment-variables)
- [Database Setup](#2-database-setup)
- [Verify Setup](#3-verify-setup)
- [Important Notes](#important-notes)

## 1. Environment Variables

Create a `.env` file in your project root with the following variables:

```bash
VITE_SUPABASE_URL=https://oflhmuhwknhekdbacbgq.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9mbGhtdWh3a25oZWtkYmFjYmdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1NTM3MDQsImV4cCI6MjA2NDEyOTcwNH0.qifMZ7i3HSnxNYW02MYM97CBe-LmpzXdAKu7Vf0H6_Q
```

## 2. Database Setup

### Step 1: Run the Schema
1. Go to your Supabase dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `src/lib/supabase/schema.sql`
4. Run the query to create all tables and policies

### Step 2: Create Functions
1. In the SQL Editor, copy and paste the contents of `src/lib/supabase/functions.sql`
2. Run the query to create the increment/decrement functions

### Step 3: Seed Data
1. In the SQL Editor, copy and paste the contents of `src/lib/supabase/seed.sql`
2. Run the query to insert sample data including asset1 (Aurelia Bay Resort)

## 3. Verify Setup

After running the scripts, you should have:
- ✅ All tables created with proper relationships
- ✅ Row Level Security (RLS) enabled with appropriate policies
- ✅ Sample data including users, projects, and assets
- ✅ The "Aurelia Bay Resort" asset (asset1) inserted and approved

## 4. Test the Integration

1. Start your development server: `npm run dev`
2. The app should now load data from Supabase instead of mock data
3. You should see the approved projects and assets from the database
4. The loading states should work properly

## 5. Approval Workflow

- **Investors** see only approved projects and assets (`approved: true`)
- **Developers** can create new projects/assets but they start as `approved: false`
- **Admin approval** is required to make projects/assets visible to investors

## 6. Key Features Implemented

- ✅ Database schema matching the TypeScript interfaces
- ✅ React hooks for data fetching (`useAssets`, `useProjects`)
- ✅ Loading and error states
- ✅ Approval workflow for content moderation
- ✅ Row Level Security for data protection
- ✅ Real-time data instead of static mock data

## 7. Troubleshooting

If you encounter issues:

1. **Check environment variables** - Make sure they're prefixed with `VITE_`
2. **Verify database connection** - Check the browser console for errors
3. **Check RLS policies** - Ensure the policies allow public read access for approved content
4. **Restart dev server** - After changing environment variables

## 8. Next Steps

- Set up authentication to enable user-specific features
- Implement the project creation form for developers
- Add admin panel for approving projects/assets
- Integrate with blockchain for NFT functionality 