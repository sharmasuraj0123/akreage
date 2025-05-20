import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, Portfolio, AuthContextType } from '../types/auth';
import { useActiveAccount, useActiveWallet, useActiveWalletConnectionStatus, useDisconnect } from "thirdweb/react";

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

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  
  // Use hooks from thirdweb
  const connectionStatus = useActiveWalletConnectionStatus();
  const wallet = useActiveWallet();
  const account = useActiveAccount();
  const { disconnect } = useDisconnect();
  
  const isAuthenticated = connectionStatus === 'connected' && !!account;
  const [user, setUser] = useState<UserProfile | null>(null);

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
    } else {
      setUser(null);
      setPortfolio(null);
    }
  }, [isAuthenticated, account]);

  // Logout function using thirdweb
  const logout = () => {
    if (wallet) {
      disconnect(wallet);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, portfolio, logout }}>
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
