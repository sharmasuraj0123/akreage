import React from 'react';
import { User } from '../../types';
import DeveloperCard from './DeveloperCard';

interface DevelopersGridProps {
  developers: User[];
  onDeveloperClick: (id: string) => void;
}

const DevelopersGrid: React.FC<DevelopersGridProps> = ({ developers, onDeveloperClick }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {developers.map(developer => (
          <DeveloperCard 
            key={developer.id} 
            developer={developer} 
            onClick={() => onDeveloperClick(developer.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default DevelopersGrid;
