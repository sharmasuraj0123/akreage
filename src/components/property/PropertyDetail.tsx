import React, { useState } from 'react';
import { ArrowLeft, Heart, MapPin, Calendar, TrendingUp, Home, Maximize2, BedDouble, Bath, CheckCircle, Loader, Clock } from 'lucide-react';
import { RealEstateAsset, Milestone } from '../../types';
import Button from '../ui/Button';
import { formatCurrency, formatDate } from '../../utils/formatters';

interface PropertyDetailProps {
  property: RealEstateAsset;
  onBack: () => void;
  onLike: (id: string) => void;
  isLiked: boolean;
}

const MilestoneItem: React.FC<{ milestone: Milestone }> = ({ milestone }) => {
  const getStatusIcon = () => {
    switch (milestone.status) {
      case 'Completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'In Progress':
        return <Loader className="h-5 w-5 text-blue-500 animate-spin" />;
      case 'Upcoming':
        return <Clock className="h-5 w-5 text-gray-400" />;
      default:
        return null;
    }
  };

  const getStatusColor = () => {
    switch (milestone.status) {
      case 'Completed':
        return 'border-green-500';
      case 'In Progress':
        return 'border-blue-500';
      case 'Upcoming':
        return 'border-gray-300';
      default:
        return 'border-gray-300';
    }
  };

  return (
    <li className="relative pl-8 pb-8">
      {/* Vertical line */}
      <div className={`absolute left-[10px] top-1 bottom-0 w-0.5 ${
        milestone.status === 'Completed' ? 'bg-green-500' : 
        milestone.status === 'In Progress' ? 'bg-blue-500' : 'bg-gray-300'
      }`}></div>
      
      {/* Icon */}
      <div className={`absolute left-0 top-0 flex items-center justify-center w-6 h-6 rounded-full bg-white border-2 ${getStatusColor()}`}>
        {getStatusIcon()}
      </div>
      
      {/* Content */}
      <div className="ml-4">
        <div className="flex items-center justify-between mb-1">
          <h4 className="text-md font-semibold text-gray-900">{milestone.title}</h4>
          <span className="text-xs text-gray-500">{formatDate(new Date(milestone.date))}</span>
        </div>
        <p className="text-sm text-gray-600">{milestone.description}</p>
      </div>
    </li>
  );
};

const PropertyDetail: React.FC<PropertyDetailProps> = ({ 
  property, 
  onBack, 
  onLike,
  isLiked
}) => {
  const fundingPercentage = (property.fundingRaised / property.fundingGoal) * 100;
  const daysLeft = Math.max(0, Math.ceil(
    (new Date(property.fundingDeadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  ));

  // Image carousel state
  const images = property.images && property.images.length > 0 ? property.images : [property.image];
  const [currentImage, setCurrentImage] = useState(0);
  const goPrev = () => setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const goNext = () => setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  return (
    <div className="container mx-auto px-4 py-8">
      <button 
        onClick={onBack}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to properties
      </button>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (Image, Details, Location) */}
        <div className="lg:col-span-2">
          <div className="relative rounded-xl overflow-hidden mb-6">
            <img 
              src={images[currentImage]} 
              alt={property.name} 
              className="w-full h-auto object-cover transition-all duration-300"
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={goPrev}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full p-2 shadow"
                  aria-label="Previous image"
                >
                  <svg className="h-5 w-5 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button
                  onClick={goNext}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full p-2 shadow"
                  aria-label="Next image"
                >
                  <svg className="h-5 w-5 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                </button>
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {images.map((_, idx) => (
                    <span
                      key={idx}
                      className={`inline-block w-2 h-2 rounded-full ${idx === currentImage ? 'bg-indigo-600' : 'bg-gray-300'}`}
                    />
                  ))}
                </div>
              </>
            )}
            <button 
              className={`absolute top-4 right-4 p-2 rounded-full ${
                isLiked ? 'bg-pink-100' : 'bg-white'
              }`}
              onClick={() => onLike(property.id)}
            >
              <Heart 
                className={`h-5 w-5 ${
                  isLiked ? 'text-pink-500 fill-pink-500' : 'text-gray-400'
                }`} 
              />
            </button>
          </div>
          
          {/* Property Details */}
          <div className="mb-6 bg-white rounded-lg shadow-sm p-5 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Details</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center">
                <Home className="h-5 w-5 text-indigo-500 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Property Type</p>
                  <p className="font-medium">Apartment</p>
                </div>
              </div>
              <div className="flex items-center">
                <Maximize2 className="h-5 w-5 text-indigo-500 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Size</p>
                  <p className="font-medium">1,200 sq ft</p>
                </div>
              </div>
              <div className="flex items-center">
                <BedDouble className="h-5 w-5 text-indigo-500 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Bedrooms</p>
                  <p className="font-medium">2</p>
                </div>
              </div>
              <div className="flex items-center">
                <Bath className="h-5 w-5 text-indigo-500 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Bathrooms</p>
                  <p className="font-medium">2</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Documents Section */}
          {property.documents && property.documents.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-100 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Documents</h3>
              <ul className="space-y-3">
                {property.documents.map((doc, idx) => (
                  <li key={idx} className="flex items-center justify-between">
                    <div>
                      <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline font-medium flex items-center">
                        {doc.name}
                        {doc.type && (
                          <span className="ml-2 text-xs text-gray-500 bg-gray-100 rounded px-2 py-0.5">{doc.type}</span>
                        )}
                      </a>
                    </div>
                    {doc.uploadedAt && (
                      <span className="text-xs text-gray-400">Uploaded: {doc.uploadedAt}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Location Information */}
          <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Location</h3>
            <div className="flex items-start mb-3">
              <MapPin className="h-5 w-5 text-indigo-500 mr-2 mt-0.5" />
              <div>
                <p className="font-medium">{property.location}</p>
                <p className="text-sm text-gray-500">Prime location in the heart of the city</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Column (Info, Funding, About, Highlights, Milestones, Developer) */}
        <div className="lg:col-span-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.name}</h1>
          
          <div className="flex items-center text-gray-500 mb-4">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{property.location}</span>
          </div>
          
          {/* Funding Box */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-100">
            <div className="flex justify-between mb-2">
              <div>
                <span className="block text-sm text-gray-500">Price</span>
                <span className="text-xl font-bold text-gray-900">{formatCurrency(property.price)} AUSD</span>
              </div>
              <div className="text-right">
                <span className="block text-sm text-gray-500">Expected Return</span>
                <span className="text-xl font-bold text-indigo-600">{property.expectedReturn}%</span>
              </div>
            </div>
            
            <div className="flex justify-between mb-4">
              <div>
                <span className="block text-sm text-gray-500">Token Symbol</span>
                <span className="font-medium">{property.tokenSymbol}</span>
              </div>
              <div className="text-right">
                <span className="block text-sm text-gray-500">Funding Deadline</span>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                  <span>{daysLeft} days left</span>
                </div>
              </div>
            </div>
            
            <div className="mb-3">
              <div className="flex justify-between text-sm mb-1">
                <span>Funding Progress</span>
                <span>{fundingPercentage.toFixed(0)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-indigo-600 h-3 rounded-full" 
                  style={{ width: `${Math.min(fundingPercentage, 100)}%` }}
                ></div>
              </div>
            </div>
            
            <div className="flex justify-between text-sm text-gray-500 mb-4">
              <span>{formatCurrency(property.fundingRaised)} AUSD raised</span>
              <span>Goal: {formatCurrency(property.fundingGoal)} AUSD</span>
            </div>
            
            <Button className="w-full">Invest Now</Button>
          </div>
          
          {/* About */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">About this property</h2>
            <p className="text-gray-600">{property.description}</p>
          </div>
          
          {/* Investment Highlights */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Investment Highlights</h2>
            <ul className="space-y-2">
              <li className="flex items-start">
                <TrendingUp className="h-5 w-5 text-indigo-600 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600">Projected annual return of {property.expectedReturn}% based on rental income and property appreciation.</span>
              </li>
              <li className="flex items-start">
                <TrendingUp className="h-5 w-5 text-indigo-600 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600">Prime location with strong rental demand and growth potential.</span>
              </li>
              <li className="flex items-start">
                <TrendingUp className="h-5 w-5 text-indigo-600 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600">Professionally managed with quarterly distributions to token holders.</span>
              </li>
            </ul>
          </div>

          {/* Project Milestones */}
          {property.milestones && property.milestones.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Project Milestones</h2>
              <ul className="relative">
                {property.milestones.map((milestone, index) => (
                  <MilestoneItem key={milestone.id} milestone={milestone} />
                ))}
                {/* Remove the bottom line from the last item */}
                <style>{`ul li:last-child > div:first-child { display: none; }`}</style>
              </ul>
            </div>
          )}
          
          {/* Neighborhood */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Neighborhood</h2>
            <p className="text-gray-600 mb-3">
              Located in a vibrant neighborhood with excellent amenities including:
            </p>
            <ul className="space-y-1 text-gray-600">
              <li>• Premium shopping centers</li>
              <li>• Top-rated restaurants and cafes</li>
              <li>• Public transportation access</li>
              <li>• Parks and recreational areas</li>
            </ul>
          </div>
          
          {/* Developer Information */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Property Developer</h2>
            <div className="flex items-center">
              <img 
                src="https://randomuser.me/api/portraits/men/32.jpg" 
                alt="Developer" 
                className="w-12 h-12 rounded-full mr-3"
              />
              <div>
                <p className="font-medium">Alex Johnson</p>
                <p className="text-sm text-gray-500">15+ years experience</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
