# Wallet Authentication Flow

This document explains how the wallet-based authentication system works in the Akreage platform.

## Overview

The authentication system links user accounts to wallet addresses using ThirdWeb's authentication. When a user connects their wallet, the system:

1. **Checks for existing user**: Looks up if a user account already exists for the connected wallet address
2. **Creates new user if needed**: If no account exists, creates a new user record with the wallet address
3. **Returns user ID**: Provides the user ID for the authenticated session

## Database Schema

### Users Table

The `users` table has been updated to include a dedicated `wallet_address` column:

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  avatar TEXT,
  bio TEXT,
  wallet_address TEXT UNIQUE, -- Wallet address for authentication
  followers INTEGER DEFAULT 0,
  following INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Key Features

- **Unique constraint**: Each wallet address can only be linked to one user account
- **Indexed**: Fast lookups by wallet address
- **Separate from bio**: Wallet address is stored separately from user bio content

## Authentication Flow

### 1. User Clicks Login

When the user clicks the login button in `LoginModal.tsx`:

```typescript
const handleLogin = async () => {
  try {
    await connectWallet();
    onClose();
  } catch (error) {
    console.error("Error connecting wallet:", error);
  }
};
```

### 2. Wallet Connection

The `connectWallet()` function in `AuthContext.tsx`:

1. Connects to the user's wallet using ThirdWeb
2. Gets the wallet address
3. Calls `linkWalletToUser()` to handle user account linking

### 3. User Account Linking

The `linkWalletToUser()` function in `database.ts`:

```typescript
export async function linkWalletToUser(walletAddress: string, userData?: {
  name?: string
  avatar?: string
  email?: string
}) {
  // Check if user exists with this wallet address
  let user = await getUserByWalletAddress(walletAddress)
  
  if (user) {
    // User exists - return their profile
    return user
  } else {
    // Create new user account
    const newUserData = {
      name: userData?.name || 'Connected User',
      avatar: userData?.avatar || 'https://randomuser.me/api/portraits/men/1.jpg',
      wallet_address: walletAddress,
      bio: null,
      followers: 0,
      following: 0
    }
    
    user = await createUser(newUserData)
    return user
  }
}
```

### 4. Session Management

Once authenticated:

- User profile is stored in React state
- Session data is saved to `sessionStorage`
- User can access protected features

## Setup Instructions

### 1. Update Database Schema

The `users` table in `src/lib/supabase/schema.sql` has been updated to include the `wallet_address` column. When you recreate your Supabase database:

1. Go to your Supabase dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `src/lib/supabase/schema.sql`
4. Run the query to create all tables with the updated schema

The schema now includes:
- `wallet_address TEXT UNIQUE` column in the users table
- Index for fast wallet address lookups
- All necessary constraints and relationships

### 2. Environment Variables

Ensure you have ThirdWeb configuration in your environment:

```env
# ThirdWeb Client ID (already configured)
VITE_THIRDWEB_CLIENT_ID=a32954d2274ff167331b829df4fd8e25
```

### 3. Test the Flow

1. Start the development server: `npm run dev`
2. Click "Login with Google" (ThirdWeb's in-app wallet)
3. Complete the wallet connection
4. Verify user account is created/linked in Supabase

## Key Functions

### Database Functions

- `getUserByWalletAddress(walletAddress)`: Find user by wallet address
- `linkWalletToUser(walletAddress, userData)`: Main authentication function
- `createUser(userData)`: Create new user account

### Authentication Context

- `connectWallet()`: Handle wallet connection and user linking
- `logout()`: Disconnect wallet and clear session
- `isAuthenticated`: Boolean state for authentication status

## Security Considerations

1. **Unique Wallet Addresses**: Each wallet can only be linked to one account
2. **Session Management**: Sessions are stored locally and cleared on logout
3. **RLS Policies**: 
   - RLS is disabled for the `users` table since we use wallet-based authentication instead of Supabase's built-in auth
   - Other tables have simplified RLS policies that allow public read access for approved content
   - Application-level security is handled through wallet verification
4. **Wallet Verification**: ThirdWeb handles wallet signature verification

**Note**: Since we're using wallet-based authentication instead of Supabase's built-in authentication system, we've simplified the Row Level Security policies. In a production environment, you may want to implement more granular permissions based on your specific security requirements.

## Troubleshooting

### Common Issues

1. **Duplicate wallet error**: If you see unique constraint errors, check for existing users with the same wallet address
2. **Session not persisting**: Clear browser storage and try logging in again
3. **Database connection issues**: Verify Supabase environment variables

### Debug Logging

The system includes comprehensive logging:

```typescript
console.log(`User found for wallet ${walletAddress}:`, user.id)
console.log(`Creating new user for wallet ${walletAddress}`)
```

Check browser console for authentication flow details.

## Future Enhancements

1. **Multi-wallet support**: Allow users to link multiple wallets
2. **Social login integration**: Combine wallet auth with social providers
3. **Account recovery**: Wallet-based account recovery mechanisms
4. **Enhanced profiles**: More user profile customization options 