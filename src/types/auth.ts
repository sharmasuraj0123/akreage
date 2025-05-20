export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  walletBalance: number;
  bio?: string;
  followers?: number;
  following?: number;
  investments?: number;
  returns?: number;
  joinedDate?: string;
}

export interface Portfolio {
  totalValue: number;
  totalInvestments: number;
  returns: number;
  allocation: {
    category: string;
    value: number;
    percentage: number;
  }[];
  transactions: {
    id: string;
    type: 'buy' | 'sell';
    propertyName: string;
    amount: number;
    date: string;
    status: 'completed' | 'pending' | 'failed';
  }[];
  performance: {
    period: string;
    value: number;
    change: number;
  }[];
}

export interface AuthContextType {
  isAuthenticated: boolean;
  user: UserProfile | null;
  portfolio: Portfolio | null;
  logout: () => void;
  walletAddress: string | null;
  connectWallet: () => Promise<any>;
  isConnecting: boolean;
  client: any;
}
