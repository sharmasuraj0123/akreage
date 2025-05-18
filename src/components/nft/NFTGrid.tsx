import React, { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import NFTCard from './NFTCard';
import { RealEstateAsset } from '../../types';
import { formatCurrency } from '../../utils/formatters';

interface NFTGridProps {
  properties: RealEstateAsset[];
  onPropertyClick: (id: string) => void;
  onLikeProperty: (id: string) => void;
  likedProperties: Record<string, boolean>;
}

const NFTGrid: React.FC<NFTGridProps> = ({
  properties,
  onPropertyClick,
  onLikeProperty,
  likedProperties
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [returnRange, setReturnRange] = useState<[number, number]>([0, 15]);
  
  // Get unique locations from properties
  const locations = Array.from(new Set(properties.map(p => p.location)));
  
  // Filter properties based on search and filters
  const filteredProperties = properties.filter(property => {
    // Search term filter
    const matchesSearch = searchTerm === '' || 
      property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Price range filter
    const matchesPrice = property.price >= priceRange[0] && property.price <= priceRange[1];
    
    // Location filter
    const matchesLocation = selectedLocations.length === 0 || selectedLocations.includes(property.location);
    
    // Return filter
    const matchesReturn = property.expectedReturn >= returnRange[0] && property.expectedReturn <= returnRange[1];
    
    return matchesSearch && matchesPrice && matchesLocation && matchesReturn;
  });
  
  // Update properties with current like status
  const propertiesWithLikes = filteredProperties.map(property => ({
    ...property,
    isLiked: likedProperties[property.id] || false
  }));
  
  const handleLocationToggle = (location: string) => {
    if (selectedLocations.includes(location)) {
      setSelectedLocations(selectedLocations.filter(loc => loc !== location));
    } else {
      setSelectedLocations([...selectedLocations, location]);
    }
  };
  
  const clearFilters = () => {
    setPriceRange([0, 200000]);
    setSelectedLocations([]);
    setReturnRange([0, 15]);
  };
  
  return (
    <div>
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search properties by name, description, or location" 
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <button 
            className="flex items-center text-gray-700 hover:text-indigo-600"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="h-5 w-5 mr-2" />
            <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
          </button>
        </div>
        
        {showFilters && (
          <div className="mt-4 bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Filters</h3>
              <button 
                className="text-sm text-indigo-600 hover:text-indigo-800"
                onClick={clearFilters}
              >
                Clear All
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Price Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range (AUSD)
                </label>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">{formatCurrency(priceRange[0])}</span>
                  <span className="text-sm text-gray-500">{formatCurrency(priceRange[1])}</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="200000" 
                  step="5000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              
              {/* Location Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {locations.map(location => (
                    <div key={location} className="flex items-center">
                      <input 
                        type="checkbox" 
                        id={`location-${location}`}
                        checked={selectedLocations.includes(location)}
                        onChange={() => handleLocationToggle(location)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label 
                        htmlFor={`location-${location}`}
                        className="ml-2 text-sm text-gray-700"
                      >
                        {location}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Expected Return Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expected Return (%)
                </label>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">{returnRange[0]}%</span>
                  <span className="text-sm text-gray-500">{returnRange[1]}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="15" 
                  step="0.5"
                  value={returnRange[1]}
                  onChange={(e) => setReturnRange([returnRange[0], parseFloat(e.target.value)])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
            
            {selectedLocations.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {selectedLocations.map(location => (
                  <div 
                    key={location}
                    className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full flex items-center"
                  >
                    <span>{location}</span>
                    <button 
                      className="ml-1"
                      onClick={() => handleLocationToggle(location)}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      
      {propertiesWithLikes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No properties found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {propertiesWithLikes.map(property => (
            <NFTCard 
              key={property.id} 
              property={property} 
              onLike={onLikeProperty}
              onClick={onPropertyClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NFTGrid;
