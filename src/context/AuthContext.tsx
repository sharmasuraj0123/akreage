import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, Portfolio, AuthContextType } from '../types/auth';
import { createThirdwebClient } from "thirdweb";
import { useActiveAccount, useActiveWallet, useDisconnect } from "thirdweb/react";
import { isUserConnected, connectUserWallet, disconnectUserWallet } from '../utils/blockchain';
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
      // First check our blockchain connection
      const isConnected = await isUserConnected();
      
      if (isConnected) {
        // We're connected via blockchain utils
        setIsAuthenticated(true);
        
        // If we have stored session data, restore it
        const savedSession = sessionStorage.getItem(AUTH_SESSION_KEY);
        if (savedSession) {
          try {
            const parsed = JSON.parse(savedSession);
            if (parsed.user) {
              setUser(parsed.user);
              setPortfolio(parsed.portfolio || mockPortfolio);
              setWalletAddress(parsed.user.id);
            }
          } catch (error) {
            console.error("Error parsing saved session:", error);
            sessionStorage.removeItem(AUTH_SESSION_KEY);
          }
        }
      } else {
        // Check ThirdWeb's state
        if (wallet && account) {
          // Connected via ThirdWeb but not in our state
          // Update our connection tracking
          try {
            await connectUserWallet();
            setIsAuthenticated(true);
            setWalletAddress(account.address);
          } catch (error) {
            console.error("Error syncing wallet state:", error);
          }
        } else {
          // Not connected anywhere
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
    if (isAuthenticated && account) {
      // Create user profile from account data
      const userProfile: UserProfile = {
        id: account.address,
        name: 'Connected User',
        email: '',  // We may not have access to email directly
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg', // Default avatar 
        walletBalance: 25000, // Mock wallet balance
      };
      
      setUser(userProfile);
      setPortfolio(mockPortfolio);
      setWalletAddress(account.address);
      
      // Save to session storage
      sessionStorage.setItem(AUTH_SESSION_KEY, JSON.stringify({
        user: userProfile,
        portfolio: mockPortfolio
      }));
    } else if (!isAuthenticated) {
      // Clear user data if not authenticated
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
      const account = await connectUserWallet();
      setIsAuthenticated(true);
      setWalletAddress(account.address);
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
