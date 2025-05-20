import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import Button from '../ui/Button';
import { formatCurrency } from '../../utils/formatters';
import { getClaimConditionData, connectUserWallet } from '../../utils/blockchain';
import { useAuth } from '../../context/AuthContext';

interface FundingCardProps {
  tokenSymbol: string;
  nftContractAddress?: string;
  fundingDeadline: string;
  fundingRaised: number;
  fundingGoal: number;
  projectName: string;
  onInvest?: () => void;
}

const FundingCard: React.FC<FundingCardProps> = ({
  tokenSymbol,
  nftContractAddress,
  fundingDeadline,
  fundingRaised: initialFundingRaised,
  fundingGoal: initialFundingGoal,
  projectName,
  onInvest
}) => {
  const { isAuthenticated } = useAuth();
  const [claimData, setClaimData] = useState<{
    maxClaimableSupply: bigint;
    supplyClaimed: bigint;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(!!nftContractAddress);
  const [isUserWalletConnected, setIsUserWalletConnected] = useState(false);
  
  // Calculate funding percentage based on raised amount and goal
  const fundingPercentage = claimData 
    ? Number((claimData.supplyClaimed * BigInt(100)) / claimData.maxClaimableSupply)
    : (initialFundingRaised / initialFundingGoal) * 100;
  
  // Set actual funding raised and goal based on blockchain data when available
  const fundingRaised = claimData 
    ? Number(claimData.supplyClaimed)
    : initialFundingRaised;
  
  const fundingGoal = claimData 
    ? Number(claimData.maxClaimableSupply)
    : initialFundingGoal;
  
  const tokensAvailable = claimData 
    ? Number(claimData.maxClaimableSupply - claimData.supplyClaimed)
    : initialFundingGoal - initialFundingRaised;
  
  // Calculate days left
  const daysLeft = Math.max(0, Math.ceil(
    (new Date(fundingDeadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  ));
  
  // Check auth status from context
  useEffect(() => {
    setIsUserWalletConnected(isAuthenticated);
  }, [isAuthenticated]);
  
  // Fetch blockchain data if nftContractAddress is available
  useEffect(() => {
    if (nftContractAddress) {
      fetchClaimData();
    } else {
      setIsLoading(false);
    }
  }, [nftContractAddress]);
  
  const fetchClaimData = async () => {
    if (!nftContractAddress) return;
    
    setIsLoading(true);
    try {
      const result = await getClaimConditionData(nftContractAddress);
      if (result) {
        setClaimData({
          maxClaimableSupply: result.maxClaimableSupply,
          supplyClaimed: result.supplyClaimed
        });
      }
    } catch (error) {
      console.error("Error fetching claim data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleConnectWallet = async () => {
    if (!isUserWalletConnected) {
      try {
        await connectUserWallet();
        // Wait briefly for auth context to update
        setTimeout(() => {
          setIsUserWalletConnected(true);
        }, 500);
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    } else if (onInvest) {
      onInvest();
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
      <div className="mb-4">
        <span className="block text-sm text-gray-500">Token Symbol</span>
        <span className="font-medium">{tokenSymbol}</span>
      </div>
      
      <div className="mb-4">
        <span className="block text-sm text-gray-500">Funding Deadline</span>
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-1 text-gray-400" />
          <span>{daysLeft} days left</span>
        </div>
      </div>
      
      <div className="mb-3">
        <div className="flex justify-between text-sm mb-1">
          <span>Funding Progress</span>
          <span>{isLoading ? "Loading..." : `${Math.min(fundingPercentage, 100).toFixed(0)}%`}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-indigo-600 h-3 rounded-full" 
            style={{ width: `${Math.min(fundingPercentage, 100)}%` }}
          ></div>
        </div>
      </div>
      
      <div className="flex justify-between text-sm text-gray-500 mb-4">
        <span>{isLoading ? "Loading..." : `${formatCurrency(fundingRaised)} AUSD raised`}</span>
        <span>Goal: {isLoading ? "Loading..." : `${formatCurrency(fundingGoal)} AUSD`}</span>
      </div>
      
      {nftContractAddress && !isLoading && (
        <div className="text-sm text-indigo-600 mb-4">
          <span>Available: {formatCurrency(tokensAvailable)} AUSD tokens</span>
        </div>
      )}
      
      <Button 
        className="w-full" 
        onClick={handleConnectWallet}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : 
          !isUserWalletConnected ? "Connect Wallet to Invest" : 
          `Invest in ${projectName}`}
      </Button>
    </div>
  );
};

export default FundingCard; 