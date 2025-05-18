import React from 'react';
import { Project } from '../../types';
import { formatCurrency } from '../../utils/formatters';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const fundingPercentage = (project.totalFundingRaised / project.totalFundingGoal) * 100;
  
  return (
    <div 
      className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-[1.02] hover:shadow-lg"
      onClick={onClick}
    >
      <div className="h-48">
        <img 
          src={project.image} 
          alt={project.name} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.name}</h3>
        
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{project.description}</p>
        
        <div className="flex justify-between text-xs text-gray-500 mb-3">
          <span>{project.location}</span>
          <span>{project.properties} Properties</span>
        </div>
        
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
        
        <div className="flex justify-between text-xs text-gray-500">
          <div>
            <span className="block text-gray-900 font-medium">{formatCurrency(project.totalFundingRaised)} AUSD</span>
            <span>Raised</span>
          </div>
          <div className="text-right">
            <span className="block text-gray-900 font-medium">{formatCurrency(project.minInvestment)} AUSD</span>
            <span>Min. Investment</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
