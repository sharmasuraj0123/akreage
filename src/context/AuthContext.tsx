import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, Portfolio, AuthContextType } from '../types/auth';
import { createThirdwebClient } from "thirdweb";
import { useActiveAccount, useActiveWallet, useDisconnect } from "thirdweb/react";
import { isUserConnected, connectUserWallet, disconnectUserWallet } from '../utils/blockchain';
import { findOrCreateUserByWallet } from '../lib/supabase/database';
import { inAppWallet } from 'thirdweb/wallets';
import { sepolia } from 'thirdweb/chains';

const client = createThirdwebClient({
  clientId: "a32954d2274ff167331b829df4fd8e25", // Replace with your actual client ID
});

// Mock portfolio data
const mockPortfolio: Portfolio = {
  totalValue: 125000,
  totalInvestments: 3,
  returns: 12.5,
  allocation: [
    { category: 'Residential', value: 75000, percentage: 60 },
    { category: 'Commercial', value: 35000, percentage: 28 },
    { category: 'Industrial', value: 15000, percentage: 12 },
  ],
  transactions: [
    {
      id: 't1',
      type: 'buy',
      propertyName: 'Skyline Tower #42',
      amount: 25000,
      date: '2024-03-15',
      status: 'completed',
    },
    {
      id: 't2',
      type: 'buy',
      propertyName: 'Green Valley Residences #08',
      amount: 35000,
      date: '2024-03-10',
      status: 'completed',
    },
  ],
  performance: [
    { period: '1M', value: 127500, change: 2.5 },
    { period: '3M', value: 130000, change: 5.2 },
    { period: '6M', value: 135000, change: 8.7 },
    { period: '1Y', value: 140000, change: 12.5 },
  ],
};

// Keys for session storage
const AUTH_SESSION_KEY = 'akreage_auth_session';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  
  // Thirdweb authentication
  const wallet = useActiveWallet();
  const account = useActiveAccount();
  const { disconnect } = useDisconnect();
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  // Initialize state from storage on mount
  useEffect(() => {
    const initAuthState = async () => {
      console.log('AuthContext: Initializing auth state');
      // First check our blockchain connection
      const isConnected = await isUserConnected();
      console.log('AuthContext: Blockchain connection status:', isConnected);
      
      if (isConnected) {
        // We're connected via blockchain utils
        setIsAuthenticated(true);
        
        // If we have stored session data, restore it
        const savedSession = sessionStorage.getItem(AUTH_SESSION_KEY);
        if (savedSession) {
          try {
            const parsed = JSON.parse(savedSession);
            console.log('AuthContext: Found saved session data', parsed);
            if (parsed.user) {
              setUser(parsed.user);
              setPortfolio(parsed.portfolio || mockPortfolio);
              setWalletAddress(parsed.user.walletAddress || account?.address);
              console.log('AuthContext: Restored user from session:', parsed.user);
            }
          } catch (error) {
            console.error("Error parsing saved session:", error);
            sessionStorage.removeItem(AUTH_SESSION_KEY);
          }
        } else {
          // We're connected but have no session data
          // Let's create a user from the database
          console.log('AuthContext: Connected but no session data. Creating user from database...');
          if (account) {
            console.log('AuthContext: Creating user from account', account);
            try {
              const dbUser = await findOrCreateUserByWallet(account.address, {
                name: 'Connected User',
                avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
              });
              
              const userProfile: UserProfile = {
                id: dbUser.id,
                name: dbUser.name,
                email: '',
                avatar: dbUser.avatar || 'https://randomuser.me/api/portraits/men/1.jpg',
                walletBalance: 25000,
                bio: dbUser.bio,
                followers: dbUser.followers,
                following: dbUser.following
              };
              
              setUser(userProfile);
              setPortfolio(mockPortfolio);
              setWalletAddress(account.address);
              
              // Save to session
              sessionStorage.setItem(AUTH_SESSION_KEY, JSON.stringify({
                user: userProfile,
                portfolio: mockPortfolio
              }));
            } catch (error) {
              console.error('Error creating user from database:', error);
              // Fallback to local user creation
              const userProfile: UserProfile = {
                id: account.address,
                name: 'Connected User',
                email: '',
                avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
                walletBalance: 25000,
              };
              
              setUser(userProfile);
              setPortfolio(mockPortfolio);
              setWalletAddress(account.address);
              
              sessionStorage.setItem(AUTH_SESSION_KEY, JSON.stringify({
                user: userProfile,
                portfolio: mockPortfolio
              }));
            }
          } else {
            // We need to get the account from blockchain utils since we're connected
            console.log('AuthContext: No account yet. Fetching account from blockchain...');
            try {
              const obtainedAccount = await connectUserWallet();
              if (obtainedAccount) {
                console.log('AuthContext: Got account from blockchain', obtainedAccount);
                
                try {
                  const dbUser = await findOrCreateUserByWallet(obtainedAccount.address, {
                    name: 'Connected User',
                    avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
                  });
                  
                  const userProfile: UserProfile = {
                    id: dbUser.id,
                    name: dbUser.name,
                    email: '',
                    avatar: dbUser.avatar || 'https://randomuser.me/api/portraits/men/1.jpg',
                    walletBalance: 25000,
                    bio: dbUser.bio,
                    followers: dbUser.followers,
                    following: dbUser.following
                  };
                  
                  setUser(userProfile);
                  setPortfolio(mockPortfolio);
                  setWalletAddress(obtainedAccount.address);
                  
                  sessionStorage.setItem(AUTH_SESSION_KEY, JSON.stringify({
                    user: userProfile,
                    portfolio: mockPortfolio
                  }));
                } catch (error) {
                  console.error('Error creating user from database:', error);
                  // Fallback
                  const userProfile: UserProfile = {
                    id: obtainedAccount.address,
                    name: 'Connected User',
                    email: '',
                    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
                    walletBalance: 25000,
                  };
                  
                  setUser(userProfile);
                  setPortfolio(mockPortfolio);
                  setWalletAddress(obtainedAccount.address);
                  
                  sessionStorage.setItem(AUTH_SESSION_KEY, JSON.stringify({
                    user: userProfile,
                    portfolio: mockPortfolio
                  }));
                }
              }
            } catch (error) {
              console.error("Error getting account from blockchain:", error);
            }
          }
        }
      } else {
        // Check ThirdWeb's state
        if (wallet && account) {
          // Connected via ThirdWeb but not in our state
          // Update our connection tracking
          console.log('AuthContext: Connected via ThirdWeb but not in our blockchain state');
          try {
            await connectUserWallet();
            setIsAuthenticated(true);
            setWalletAddress(account.address);
            
            // Create user profile from ThirdWeb account using database
            console.log('AuthContext: Creating user from ThirdWeb account');
            try {
              const dbUser = await findOrCreateUserByWallet(account.address, {
                name: 'Connected User',
                avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
              });
              
              const userProfile: UserProfile = {
                id: dbUser.id,
                name: dbUser.name,
                email: '',
                avatar: dbUser.avatar || 'https://randomuser.me/api/portraits/men/1.jpg',
                walletBalance: 25000,
                bio: dbUser.bio,
                followers: dbUser.followers,
                following: dbUser.following
              };
              
              setUser(userProfile);
              setPortfolio(mockPortfolio);
              
              // Save to session
              sessionStorage.setItem(AUTH_SESSION_KEY, JSON.stringify({
                user: userProfile,
                portfolio: mockPortfolio
              }));
            } catch (error) {
              console.error('Error creating user from database:', error);
              // Fallback
              const userProfile: UserProfile = {
                id: account.address,
                name: 'Connected User',
                email: '',
                avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
                walletBalance: 25000,
              };
              
              setUser(userProfile);
              setPortfolio(mockPortfolio);
              
              sessionStorage.setItem(AUTH_SESSION_KEY, JSON.stringify({
                user: userProfile,
                portfolio: mockPortfolio
              }));
            }
          } catch (error) {
            console.error("Error syncing wallet state:", error);
          }
        } else {
          // Not connected anywhere
          console.log('AuthContext: Not connected anywhere. Clearing state.');
          setIsAuthenticated(false);
          setUser(null);
          setPortfolio(null);
          setWalletAddress(null);
          sessionStorage.removeItem(AUTH_SESSION_KEY);
        }
      }
    };
    
    initAuthState();
    
    // Check connection status periodically
    const interval = setInterval(async () => {
      const connected = await isUserConnected();
      setIsAuthenticated(connected);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [wallet, account]);

  // Update user profile when authentication state changes
  useEffect(() => {
    console.log('AuthContext: authentication state change detected', { isAuthenticated, account });
    
    if (isAuthenticated && account) {
      console.log('AuthContext: Creating user profile from account', account);
      
      // Create or find user in database using wallet address
      const createUserProfile = async () => {
        try {
          const dbUser = await findOrCreateUserByWallet(account.address, {
            name: 'Connected User',
            avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
          });
          
          // Create user profile from database user
          const userProfile: UserProfile = {
            id: dbUser.id, // Use the UUID from database
            name: dbUser.name,
            email: '',  // We may not have access to email directly
            avatar: dbUser.avatar || 'https://randomuser.me/api/portraits/men/1.jpg',
            walletBalance: 25000, // Mock wallet balance
            bio: dbUser.bio,
            followers: dbUser.followers,
            following: dbUser.following
          };
          
          console.log('AuthContext: Setting user profile from database', userProfile);
          setUser(userProfile);
          setPortfolio(mockPortfolio);
          setWalletAddress(account.address);
          
          // Save to session storage
          sessionStorage.setItem(AUTH_SESSION_KEY, JSON.stringify({
            user: userProfile,
            portfolio: mockPortfolio
          }));
          console.log('AuthContext: Saved user session to storage');
        } catch (error) {
          console.error('Error creating/finding user in database:', error);
          // Fallback to local user creation if database fails
          const userProfile: UserProfile = {
            id: account.address, // Fallback to wallet address
            name: 'Connected User',
            email: '',
            avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
            walletBalance: 25000,
          };
          
          setUser(userProfile);
          setPortfolio(mockPortfolio);
          setWalletAddress(account.address);
          
          sessionStorage.setItem(AUTH_SESSION_KEY, JSON.stringify({
            user: userProfile,
            portfolio: mockPortfolio
          }));
        }
      };
      
      createUserProfile();
    } else if (!isAuthenticated) {
      // Clear user data if not authenticated
      console.log('AuthContext: Not authenticated, clearing user data');
      setUser(null);
      setPortfolio(null);
      setWalletAddress(null);
      sessionStorage.removeItem(AUTH_SESSION_KEY);
    }
  }, [isAuthenticated, account]);

  // Centralized function to connect wallet
  const connectWallet = async () => {
    if (isConnecting) return; // Prevent multiple simultaneous connection attempts
    
    try {
      setIsConnecting(true);
      console.log('AuthContext: Connecting wallet...');
      const account = await connectUserWallet();
      console.log('AuthContext: Wallet connected, account:', account);
      setIsAuthenticated(true);
      setWalletAddress(account.address);
      
      // Make sure we also create the user profile if it doesn't exist
      if (!user) {
        console.log('AuthContext: No user exists, creating from connected wallet');
        
        try {
          const dbUser = await findOrCreateUserByWallet(account.address, {
            name: 'Connected User',
            avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
          });
          
          const userProfile: UserProfile = {
            id: dbUser.id, // Use the UUID from database
            name: dbUser.name,
            email: '',
            avatar: dbUser.avatar || 'https://randomuser.me/api/portraits/men/1.jpg',
            walletBalance: 25000,
            bio: dbUser.bio,
            followers: dbUser.followers,
            following: dbUser.following
          };
          
          setUser(userProfile);
          setPortfolio(mockPortfolio);
          
          // Save to session
          sessionStorage.setItem(AUTH_SESSION_KEY, JSON.stringify({
            user: userProfile,
            portfolio: mockPortfolio
          }));
          console.log('AuthContext: Created and saved new user profile from database');
        } catch (error) {
          console.error('Error creating user in database:', error);
          // Fallback to local user creation
          const userProfile: UserProfile = {
            id: account.address,
            name: 'Connected User',
            email: '',
            avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
            walletBalance: 25000,
          };
          
          setUser(userProfile);
          setPortfolio(mockPortfolio);
          
          sessionStorage.setItem(AUTH_SESSION_KEY, JSON.stringify({
            user: userProfile,
            portfolio: mockPortfolio
          }));
          console.log('AuthContext: Created fallback user profile');
        }
      }
      
      return account;
    } catch (error) {
      console.error("Error connecting wallet:", error);
      throw error;
    } finally {
      setIsConnecting(false);
    }
  };

  // Logout function using thirdweb
  const logout = () => {
    if (wallet) {
      disconnect(wallet);
    }
    // Always disconnect in our utils
    disconnectUserWallet();
    // Clear session
    sessionStorage.removeItem(AUTH_SESSION_KEY);
    setUser(null);
    setPortfolio(null);
    setWalletAddress(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      portfolio, 
      logout, 
      walletAddress, 
      connectWallet, 
      isConnecting,
      client 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
