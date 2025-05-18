import React from 'react';
import { User, RealEstateAsset, Project } from '../../types';
import Button from '../ui/Button';
import { ArrowLeft, Users, Building } from 'lucide-react';
import NFTCard from '../nft/NFTCard';
import ProjectCard from '../collection/CollectionCard';

interface DeveloperDetailProps {
  developer: User;
  properties: RealEstateAsset[];
  projects: Project[];
  onBack: () => void;
  onPropertyClick: (id: string) => void;
  onProjectClick: (id: string) => void;
  onLikeProperty: (id: string) => void;
  likedProperties: Record<string, boolean>;
}

const DeveloperDetail: React.FC<DeveloperDetailProps> = ({ 
  developer, 
  properties, 
  projects, 
  onBack, 
  onPropertyClick, 
  onProjectClick,
  onLikeProperty,
  likedProperties
}) => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Developers
      </button>
      
      {/* Developer Profile Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <img 
            src={developer.avatar} 
            alt={developer.name} 
            className="w-32 h-32 rounded-full object-cover border-4 border-indigo-100 mb-4 md:mb-0 md:mr-6"
          />
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{developer.name}</h1>
            
            <p className="text-gray-600 mb-4">{developer.bio}</p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4">
              <div className="flex items-center">
                <Users className="h-5 w-5 text-indigo-500 mr-2" />
                <div>
                  <div className="font-medium">{developer.followers.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">Followers</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <Building className="h-5 w-5 text-indigo-500 mr-2" />
                <div>
                  <div className="font-medium">{projects.length}</div>
                  <div className="text-sm text-gray-500">Projects</div>
                </div>
              </div>
            </div>
            
            <Button variant="primary">Follow</Button>
          </div>
        </div>
      </div>
      
      {/* Developer's Projects */}
      {projects.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Projects</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(project => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onClick={() => onProjectClick(project.id)}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Developer's Properties */}
      {properties.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Properties</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {properties.map(property => (
              <NFTCard 
                key={property.id} 
                property={{
                  ...property,
                  isLiked: likedProperties[property.id] || false
                }} 
                onLike={() => onLikeProperty(property.id)}
                onClick={() => onPropertyClick(property.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DeveloperDetail;
