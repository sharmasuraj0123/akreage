import React, { useState, useEffect } from 'react';
import { Briefcase, Wallet, PieChart, TrendingUp } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getUserNFTHoldings } from '../../utils/blockchain';
import { useAssets } from '../../hooks/useAssets';

const PortfolioDashboard: React.FC = () => {
  const { isAuthenticated, walletAddress } = useAuth();
  const { assets } = useAssets();
  const [userHoldings, setUserHoldings] = useState<{ [contractAddress: string]: number }>({});
  const [totalValue, setTotalValue] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  useEffect(() => {
    const initializePortfolio = async () => {
      if (!isAuthenticated || !walletAddress) {
        setUserHoldings({});
        setTotalValue(0);
        return;
      }

      try {
        await fetchUserPortfolioHoldings(walletAddress);
      } catch (error) {
        console.error("Error fetching portfolio holdings:", error);
        setIsLoading(false);
      }
    };
    
    initializePortfolio();
  }, [isAuthenticated, walletAddress, assets]);
  
  const fetchUserPortfolioHoldings = async (address: string) => {
    setIsLoading(true);
    
    try {
      // Get all NFT contract addresses from assets
      const nftContractAddresses = assets
        .filter(asset => asset.nftContractAddress)
        .map(asset => asset.nftContractAddress!);
      
      if (nftContractAddresses.length === 0) {
        setUserHoldings({});
        setTotalValue(0);
        setIsLoading(false);
        return;
      }
      
      // Get user holdings for all contracts
      const holdings = await getUserNFTHoldings(nftContractAddresses, address);
      setUserHoldings(holdings);
      
      // Calculate total value (1 AUSD per token)
      const total = Object.values(holdings).reduce((sum, tokens) => sum + tokens, 0);
      setTotalValue(total);
      
    } catch (error) {
      console.error("Error fetching user portfolio holdings:", error);
      setUserHoldings({});
      setTotalValue(0);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Skip rendering if not authenticated
  if (!isAuthenticated) return null;

  // Get assets that the user owns tokens for
  const ownedAssets = assets.filter(asset => 
    asset.nftContractAddress && userHoldings[asset.nftContractAddress] > 0
  );

  // Get the first owned asset for display (fallback to first asset if no owned assets)
  const displayAsset = ownedAssets.length > 0 ? ownedAssets[0] : (assets.length > 0 ? assets[0] : {
    name: 'Sample Property',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    location: 'Sample Location'
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-8">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Portfolio Overview</h2>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {/* Total Portfolio Value */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <div className="flex items-start">
                    <div className="bg-indigo-100 rounded-full p-2 mr-3">
                      <Briefcase className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Portfolio Value</p>
                      <p className="text-xl font-bold text-gray-900">
                        {formatCurrency(totalValue)} AUSD
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Wallet Address */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <div className="flex items-start">
                    <div className="bg-indigo-100 rounded-full p-2 mr-3">
                      <Wallet className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Wallet Address</p>
                      <p className="text-sm font-medium text-gray-900 truncate max-w-xs">
                        {walletAddress || 'Not connected'}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Total Properties */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <div className="flex items-start">
                    <div className="bg-indigo-100 rounded-full p-2 mr-3">
                      <PieChart className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Properties Owned</p>
                      <p className="text-xl font-bold text-gray-900">
                        {ownedAssets.length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Investment Summary */}
              {ownedAssets.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-6">
                  <div className="p-4 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900">Your Investments</h3>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {ownedAssets.map(asset => {
                      const tokensOwned = userHoldings[asset.nftContractAddress!] || 0;
                      return (
                        <div key={asset.id} className="p-4 flex items-center">
                          <img 
                            src={asset.image} 
                            alt={asset.name} 
                            className="w-16 h-16 rounded object-cover mr-4"
                          />
                          <div className="flex-grow">
                            <h4 className="font-medium text-gray-900">{asset.name}</h4>
                            <p className="text-sm text-gray-500">{asset.location}</p>
                            <div className="mt-1 flex items-center">
                              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                              <span className="text-sm font-medium text-green-600">
                                {asset.expectedReturn}% Expected Return
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-500">You own</p>
                            <p className="font-bold text-indigo-600">{tokensOwned} tokens</p>
                            <p className="text-sm text-gray-500">
                              {formatCurrency(tokensOwned)} AUSD
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              
              {ownedAssets.length === 0 && (
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <p className="text-blue-600 mb-2">You don't own any properties yet.</p>
                  <p className="text-sm text-blue-500">Start investing by exploring available properties!</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortfolioDashboard;
