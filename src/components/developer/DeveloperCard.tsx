import React from 'react';
import { User } from '../../types';
import Card from '../ui/Card';

interface DeveloperCardProps {
  developer: User;
  onClick?: () => void;
}

const DeveloperCard: React.FC<DeveloperCardProps> = ({ developer, onClick }) => {
  return (
    <Card onClick={onClick} className="cursor-pointer overflow-hidden">
      <div className="flex flex-col items-center p-6">
        <img 
          src={developer.avatar} 
          alt={developer.name} 
          className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-indigo-100"
        />
        
        <h3 className="text-xl font-bold text-gray-900 mb-1">{developer.name}</h3>
        
        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <span className="font-medium">{developer.followers.toLocaleString()}</span>
            <span className="ml-1">Followers</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium">{developer.following.toLocaleString()}</span>
            <span className="ml-1">Following</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-center mb-4">{developer.bio}</p>
        
        <button className="bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-medium py-2 px-4 rounded-full transition-colors">
          Follow
        </button>
      </div>
    </Card>
  );
};

export default DeveloperCard;
