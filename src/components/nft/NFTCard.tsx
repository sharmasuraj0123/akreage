import React from 'react';
import { Heart } from 'lucide-react';
import { RealEstateAsset } from '../../types';
import { formatCurrency } from '../../utils/formatters';

interface NFTCardProps {
  property: RealEstateAsset;
  onLike: (id: string) => void;
  onClick: (id: string) => void;
}

const NFTCard: React.FC<NFTCardProps> = ({ property, onLike, onClick }) => {
  const fundingPercentage = (property.fundingRaised / property.fundingGoal) * 100;
  
  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLike(property.id);
  };
  
  return (
    <div 
      className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-[1.02] hover:shadow-lg"
      onClick={() => onClick(property.id)}
    >
      <div className="relative h-48">
        <img 
          src={property.image} 
          alt={property.name} 
          className="w-full h-full object-cover"
        />
        <button 
          className={`absolute top-3 right-3 p-2 rounded-full ${
            property.isLiked ? 'bg-pink-100' : 'bg-white'
          }`}
          onClick={handleLikeClick}
        >
          <Heart 
            className={`h-5 w-5 ${
              property.isLiked ? 'text-pink-500 fill-pink-500' : 'text-gray-400'
            }`} 
          />
        </button>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 truncate">{property.name}</h3>
          <div className="text-sm font-medium text-indigo-600">{formatCurrency(property.price)} AUSD</div>
        </div>
        
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{property.description}</p>
        
        <div className="text-xs text-gray-500 mb-3">{property.location}</div>
        
        <div className="mb-3">
          <div className="flex justify-between text-xs mb-1">
            <span>Funding Progress</span>
            <span>{fundingPercentage.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-indigo-600 h-2 rounded-full" 
              style={{ width: `${Math.min(fundingPercentage, 100)}%` }}
            ></div>
          </div>
        </div>
        
        <div className="text-xs text-gray-500">
          <div>
            <span className="block text-gray-900 font-medium">{formatCurrency(property.fundingRaised)} AUSD</span>
            <span>Raised</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
