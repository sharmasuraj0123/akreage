import React, { useState, useEffect } from 'react';
import { Briefcase, Wallet, PieChart, TrendingUp } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getContract, readContract } from 'thirdweb';
import { sepolia } from 'thirdweb/chains';
import { useAssets } from '../../hooks/useAssets';

const NFT_CONTRACT_ADDRESS = "0x3680FE6cc714d49F8a78e61D901032792b6fa773";

const PortfolioDashboard: React.FC = () => {
  const { isAuthenticated, walletAddress, client } = useAuth();
  const { assets } = useAssets();
  const [userNFTHoldings, setUserNFTHoldings] = useState<number>(0);
  const [totalValue, setTotalValue] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  useEffect(() => {
    const initializeWallet = async () => {
      if (!isAuthenticated || !walletAddress) {
        setUserNFTHoldings(0);
        setTotalValue(0);
        return;
      }

      try {
        await fetchUserNFTHoldings(walletAddress);
      } catch (error) {
        console.error("Error fetching NFT holdings:", error);
        setIsLoading(false);
      }
    };
    
    initializeWallet();
  }, [isAuthenticated, walletAddress]);
  
  const fetchUserNFTHoldings = async (address: string) => {
    setIsLoading(true);
    
    try {
      const contract = getContract({
        client,
        chain: sepolia,
        address: NFT_CONTRACT_ADDRESS,
        abi: [
          {
            name: "getActiveClaimConditionId",
            type: "function",
            stateMutability: "view",
            inputs: [],
            outputs: [{ name: "", type: "uint256" }],
          },
          {
            name: "getSupplyClaimedByWallet",
            type: "function",
            stateMutability: "view",
            inputs: [
              { name: "_conditionId", type: "uint256" },
              { name: "_claimer", type: "address" }
            ],
            outputs: [{ name: "supplyClaimedByWallet", type: "uint256" }],
          },
          {
            name: "getClaimConditionById",
            type: "function",
            stateMutability: "view",
            inputs: [{ name: "_conditionId", type: "uint256" }],
            outputs: [
              {
                name: "condition",
                type: "tuple",
                components: [
                  { name: "startTimestamp", type: "uint256" },
                  { name: "maxClaimableSupply", type: "uint256" },
                  { name: "supplyClaimed", type: "uint256" },
                  { name: "quantityLimitPerWallet", type: "uint256" },
                  { name: "merkleRoot", type: "bytes32" },
                  { name: "pricePerToken", type: "uint256" },
                  { name: "currency", type: "address" },
                  { name: "metadata", type: "string" },
                ],
              },
            ],
          },
        ],
      });
      
      // Get active condition ID
      const conditionId = await readContract({
        contract,
        method: "getActiveClaimConditionId",
      });
      
      // Get user's claimed tokens
      const userHoldings = await readContract({
        contract,
        method: "getSupplyClaimedByWallet",
        params: [conditionId, address],
      });
      
      // Set the actual holdings from blockchain
      setUserNFTHoldings(Number(userHoldings));
      
      // Calculate total value (1 AUSD per token)
      setTotalValue(Number(userHoldings)); // 1:1 token to AUSD ratio
      
    } catch (error) {
      console.error("Error fetching user NFT holdings:", error);
      
      // Reset values if there's an error
      setUserNFTHoldings(0);
      setTotalValue(0);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Skip rendering if not authenticated
  if (!isAuthenticated) return null;

  // Get the first asset for display (fallback to placeholder if no assets)
  const firstAsset = assets.length > 0 ? assets[0] : {
    name: 'Sample Property',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    location: 'Sample Location'
  };

  return (
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
                      {userNFTHoldings > 0 ? '1' : '0'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Investment Summary */}
            {userNFTHoldings > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-6">
                <div className="p-4 border-b border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900">Your Investments</h3>
                </div>
                <div className="divide-y divide-gray-100">
                  <div className="p-4 flex items-center">
                    <img 
                      src={firstAsset.image} 
                      alt={firstAsset.name} 
                      className="w-16 h-16 rounded object-cover mr-4"
                    />
                    <div className="flex-grow">
                      <h4 className="font-medium text-gray-900">{firstAsset.name}</h4>
                      <p className="text-sm text-gray-500">{firstAsset.location}</p>
                      <div className="mt-1 flex items-center">
                        <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                        <span className="text-sm font-medium text-green-600">
                          Premium Investment Property
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">You own</p>
                      <p className="font-bold text-indigo-600">{userNFTHoldings} tokens</p>
                      <p className="text-sm text-gray-500">
                        {formatCurrency(userNFTHoldings)} AUSD
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {userNFTHoldings === 0 && (
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <p className="text-blue-600 mb-2">You don't own any properties yet.</p>
                <p className="text-sm text-blue-500">Start investing by exploring available properties!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioDashboard;
