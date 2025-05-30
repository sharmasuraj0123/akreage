import React, { useState, useEffect } from 'react';
import { User, Mail, Gift, Calendar, Edit, Save, X, Wallet, DollarSign } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import PortfolioDashboard from '../portfolio/PortfolioDashboard';
import { formatCurrency } from '../../utils/formatters';

const ProfilePage: React.FC = () => {
  const { user, isAuthenticated, walletAddress, connectWallet, portfolio } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: '',
    bio: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // More detailed debug logs
    console.log('ProfilePage Auth State:', { 
      isAuthenticated, 
      hasUser: !!user, 
      user, 
      walletAddress,
      hasPortfolio: !!portfolio
    });
    
    if (user) {
      setProfileForm({
        name: user.name,
        bio: user.bio || ''
      });
    }
    
    // Get wallet address if user is authenticated but wallet not connected
    const ensureWalletConnection = async () => {
      if (isAuthenticated && !walletAddress) {
        try {
          console.log('Attempting to connect wallet from ProfilePage');
          const result = await connectWallet();
          console.log('Wallet connection result:', result);
        } catch (error) {
          console.error("Error connecting wallet:", error);
        }
      }
      
      // If we're authenticated but have no user data after 2 seconds, try forcing a refresh
      setTimeout(() => {
        if (isAuthenticated && !user) {
          console.log('Still no user data after timeout, manually refreshing');
          // This will trigger the component to re-render which might help 
          // if there's a timing issue with the auth context
          setIsLoading(false);
          window.location.reload(); // Force refresh as last resort
        }
      }, 2000);
      
      setIsLoading(false);
    };
    
    ensureWalletConnection();
  }, [user, isAuthenticated, walletAddress, connectWallet, portfolio]);
  
  const handleEditToggle = () => {
    if (isEditing) {
      // Reset form if canceling edit
      if (user) {
        setProfileForm({
          name: user.name,
          bio: user.bio || ''
        });
      }
    }
    setIsEditing(!isEditing);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would usually update the user profile via API
    console.log("Profile updated:", profileForm);
    setIsEditing(false);
  };
  
  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Loading profile...</h2>
        </div>
      </div>
    );
  }
  
  // Only check for isAuthenticated since user might be null momentarily
  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Please login to view your profile</h2>
          <p className="text-gray-600 mb-6">You need to be logged in to access your profile information.</p>
          <Button onClick={connectWallet}>Connect Wallet</Button>
        </div>
      </div>
    );
  }
  
  // If authenticated but no user object yet, show a loading state
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Loading profile data...</h2>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - User Profile */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="relative">
              {/* Cover Image */}
              <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-t-lg"></div>
              
              {/* Profile Image */}
              <div className="absolute left-6 -bottom-12">
                <div className="relative">
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-24 h-24 rounded-full border-4 border-white object-cover"
                  />
                  <div className="absolute bottom-1 right-1 h-4 w-4 rounded-full bg-green-500 border-2 border-white"></div>
                </div>
              </div>
              
              {/* Edit Button */}
              <div className="absolute top-4 right-4">
                <button 
                  onClick={handleEditToggle}
                  className="bg-white rounded-full p-2 text-gray-600 hover:text-gray-900 shadow-sm"
                >
                  {isEditing ? <X className="h-5 w-5" /> : <Edit className="h-5 w-5" />}
                </button>
              </div>
            </div>
            
            <div className="pt-14 pb-6 px-6">
              {isEditing ? (
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input 
                      type="text" 
                      name="name" 
                      value={profileForm.name} 
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bio
                    </label>
                    <textarea
                      name="bio" 
                      value={profileForm.bio} 
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  
                  <Button type="submit" className="w-full flex items-center justify-center">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </form>
              ) : (
                <>
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">{user.name}</h1>
                  {user.bio && <p className="text-gray-600 mb-4">{user.bio}</p>}
                  
                  <div className="space-y-3 mt-6">
                    {user.email && (
                      <div className="flex items-center text-gray-600">
                        <Mail className="h-5 w-5 mr-3 text-gray-400" />
                        <span>{user.email}</span>
                      </div>
                    )}
                    
                    {walletAddress && (
                      <div className="flex items-start text-gray-600">
                        <Wallet className="h-5 w-5 mr-3 text-gray-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium">Wallet Address</p>
                          <p className="text-xs break-all">
                            {walletAddress}
                          </p>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-5 w-5 mr-3 text-gray-400" />
                      <span>Joined {new Date().toLocaleDateString()}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <Gift className="h-5 w-5 mr-3 text-gray-400" />
                      <span>
                        <strong>{user.followers || 0}</strong> followers • <strong>{user.following || 0}</strong> following
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          
          {/* Stats Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 mt-6 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Activity Stats</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-gray-500 text-sm">Investments</p>
                <p className="text-2xl font-bold text-indigo-600">{portfolio?.totalInvestments || 0}</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-gray-500 text-sm">Portfolio Value</p>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(portfolio?.totalValue || 0)} AUSD</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Column - Portfolio Dashboard */}
        <div className="lg:col-span-2">
          <PortfolioDashboard />
          
          {/* Transaction History */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 mt-6">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Transaction History</h2>
            </div>
            
            <div className="divide-y divide-gray-100">
              {portfolio?.transactions && portfolio.transactions.length > 0 ? (
                portfolio.transactions.map(transaction => (
                  <div key={transaction.id} className="p-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`bg-${transaction.type === 'buy' ? 'green' : 'red'}-100 p-2 rounded-full mr-3`}>
                        <DollarSign className={`h-5 w-5 text-${transaction.type === 'buy' ? 'green' : 'red'}-600`} />
                      </div>
                      <div>
                        <p className="font-medium">{transaction.type === 'buy' ? 'Purchased' : 'Sold'} tokens of {transaction.propertyName}</p>
                        <p className="text-sm text-gray-500">{transaction.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium text-${transaction.type === 'buy' ? 'green' : 'red'}-600`}>
                        {transaction.type === 'buy' ? '+' : '-'} tokens
                      </p>
                      <p className="text-sm text-gray-500">{transaction.amount} AUSD</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center">
                  <p className="text-gray-500">No transactions found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 