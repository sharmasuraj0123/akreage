import React, { useState } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/home/Hero';
import NFTGrid from './components/nft/NFTGrid';
import PropertyDetail from './components/property/PropertyDetail';
import DevelopersGrid from './components/developer/DevelopersGrid';
import DeveloperDetail from './components/developer/DeveloperDetail';
import LearnPage from './components/learn/LearnPage';
import LearnResourceDetail from './components/learn/LearnResourceDetail';
import PortfolioDashboard from './components/portfolio/PortfolioDashboard';
import ProfilePage from './components/profile/ProfilePage';
import FundingCard from './components/property/FundingCard';
import { useAuth } from './context/AuthContext';
import { mockRealEstateAssets, mockUsers, mockProjects } from './data/mockData';
import GovernancePage from './components/governance/GovernancePage';

function App() {
  const [currentPath, setCurrentPath] = useState('/');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [selectedDeveloperId, setSelectedDeveloperId] = useState<string | null>(null);
  const [selectedLearnResourceId, setSelectedLearnResourceId] = useState<string | null>(null);
  const [likedProperties, setLikedProperties] = useState<Record<string, boolean>>({});
  const { isAuthenticated } = useAuth();
  
  // Find the selected property
  const selectedProperty = selectedPropertyId 
    ? mockRealEstateAssets.find(p => p.id === selectedPropertyId) || null
    : null;
  
  // Find the selected developer
  const selectedDeveloper = selectedDeveloperId
    ? mockUsers.find(d => d.id === selectedDeveloperId) || null
    : null;
  
  // Get properties by developer
  const propertiesByDeveloper = selectedDeveloperId
    ? mockRealEstateAssets.filter(p => p.developer === selectedDeveloperId)
    : [];
  
  // Get projects by developer
  const projectsByDeveloper = selectedDeveloperId
    ? mockProjects.filter(p => p.developer === selectedDeveloperId)
    : [];

  const handleNavigate = (path: string) => {
    console.log("Navigating to:", path);
    setCurrentPath(path);
    setSelectedPropertyId(null);
    setSelectedDeveloperId(null);
    setSelectedLearnResourceId(null);
    window.scrollTo(0, 0);
  };
  
  const handlePropertyClick = (id: string) => {
    setSelectedPropertyId(id);
    window.scrollTo(0, 0);
  };
  
  const handleDeveloperClick = (id: string) => {
    setSelectedDeveloperId(id);
    window.scrollTo(0, 0);
  };
  
  const handleLearnResourceClick = (id: string) => {
    setSelectedLearnResourceId(id);
    window.scrollTo(0, 0);
  };
  
  const handleLikeProperty = (id: string) => {
    setLikedProperties(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  const handleBackFromProperty = () => {
    setSelectedPropertyId(null);
    window.scrollTo(0, 0);
  };
  
  const handleBackFromDeveloper = () => {
    setSelectedDeveloperId(null);
    window.scrollTo(0, 0);
  };
  
  const handleBackFromLearnResource = () => {
    setSelectedLearnResourceId(null);
    window.scrollTo(0, 0);
  };
  
  const handleExplore = () => {
    handleNavigate('/properties');
  };
  
  const handleCreate = () => {
    console.log("Create project clicked");
    // Implement project creation flow
  };

  const renderContent = () => {
    // Property detail view
    if (selectedPropertyId && selectedProperty) {
      return (
        <>
          {isAuthenticated && <PortfolioDashboard />}
          <PropertyDetail 
            property={selectedProperty}
            onBack={handleBackFromProperty}
            onLike={handleLikeProperty}
            isLiked={likedProperties[selectedPropertyId] || false}
          />
        </>
      );
    }
    
    // Developer detail view
    if (selectedDeveloperId && selectedDeveloper) {
      return (
        <DeveloperDetail 
          developer={selectedDeveloper}
          properties={propertiesByDeveloper}
          projects={projectsByDeveloper}
          onBack={handleBackFromDeveloper}
          onPropertyClick={handlePropertyClick}
          onProjectClick={(id) => console.log(`Project clicked: ${id}`)}
          onLikeProperty={handleLikeProperty}
          likedProperties={likedProperties}
        />
      );
    }
    
    // Learn resource detail view
    if (currentPath === '/learn' && selectedLearnResourceId) {
      return (
        <LearnResourceDetail 
          resourceId={selectedLearnResourceId}
          onBack={handleBackFromLearnResource}
        />
      );
    }
    
    // Main routes
    switch (currentPath) {
      case '/':
        return (
          <>
            {isAuthenticated && <PortfolioDashboard />}
            <Hero onExplore={handleExplore} onCreate={handleCreate} />
            
            <div className="container mx-auto px-4 py-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Properties</h2>
              <NFTGrid 
                properties={mockRealEstateAssets.slice(0, 3)}
                onPropertyClick={handlePropertyClick}
                onLikeProperty={handleLikeProperty}
                likedProperties={likedProperties}
              />
            </div>
          </>
        );
      
      case '/properties':
        return (
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">All Properties</h1>
            <NFTGrid 
              properties={mockRealEstateAssets.slice(0, 3)}
              onPropertyClick={handlePropertyClick}
              onLikeProperty={handleLikeProperty}
              likedProperties={likedProperties}
            />
          </div>
        );
      
      case '/developers':
        return (
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Developers</h1>
            <DevelopersGrid 
              developers={mockUsers}
              onDeveloperClick={handleDeveloperClick}
            />
          </div>
        );
      
      case '/learn':
        return (
          <LearnPage onResourceClick={handleLearnResourceClick} />
        );
      
      case '/about':
        return (
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">About Akreage</h1>
            <div className="prose max-w-none">
              <p className="text-lg text-gray-600">
                Akreage is a decentralized platform for real estate investment and development. 
                We connect property developers with investors using blockchain technology to 
                provide transparent, secure, and accessible real estate investment opportunities.
              </p>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Mission</h2>
              <p className="text-lg text-gray-600">
                To democratize access to real estate investment and development by leveraging 
                blockchain technology and creating a transparent, efficient marketplace for 
                property developers and investors.
              </p>
            </div>
          </div>
        );
      
      case '/governance':
        return <GovernancePage />;
      
      case '/profile':
        return <ProfilePage />;
      
      default:
        return (
          <div className="container mx-auto px-4 py-12 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h1>
            <p className="text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
            <button 
              className="text-indigo-600 hover:text-indigo-800 font-medium"
              onClick={() => handleNavigate('/')}
            >
              Go back home
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header onNavigate={handleNavigate} currentPath={currentPath} />
      <main className="flex-grow">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
}

export default App;
