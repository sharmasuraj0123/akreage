import React, { useState } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/home/Hero';
import NFTGrid from './components/nft/NFTGrid';
import NFTLandingPage from './components/nft/NFTLandingPage';
import PropertyDetail from './components/property/PropertyDetail';
import DevelopersGrid from './components/developer/DevelopersGrid';
import DeveloperDetail from './components/developer/DeveloperDetail';
import LearnPage from './components/learn/LearnPage';
import LearnResourceDetail from './components/learn/LearnResourceDetail';
import PortfolioDashboard from './components/portfolio/PortfolioDashboard';
import ProfilePage from './components/profile/ProfilePage';
import FundingCard from './components/property/FundingCard';
import HowItWorksPage from './components/how-it-works/HowItWorksPage';
import { useAuth } from './context/AuthContext';
import { mockUsers } from './data/mockData';
import { useAssets } from './hooks/useAssets';
import { useProjects } from './hooks/useProjects';
import GovernancePage from './components/governance/GovernancePage';
// Builder components
import { ProjectLaunchForm } from './components/builder/ProjectLaunchForm';
import BuilderLanding from './components/builder/BuilderLanding';
import BuilderDashboard from './components/builder/BuilderDashboard';
import { DashboardContent } from './components/builder/DashboardContent';
import { Stats } from './components/builder/Stats';

function App() {
  const [currentPath, setCurrentPath] = useState('/');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [selectedDeveloperId, setSelectedDeveloperId] = useState<string | null>(null);
  const [selectedLearnResourceId, setSelectedLearnResourceId] = useState<string | null>(null);
  const [likedProperties, setLikedProperties] = useState<Record<string, boolean>>({});
  const { isAuthenticated, connectWallet } = useAuth();
  
  // Fetch data from database
  const { assets, loading: assetsLoading, error: assetsError } = useAssets();
  const { projects, loading: projectsLoading, error: projectsError } = useProjects();
  
  // Debug logging
  console.log('Assets from DB:', assets);
  console.log('Assets loading:', assetsLoading);
  console.log('Assets error:', assetsError);
  
  // Use database assets consistently across all pages
  const displayAssets = assets;
  
  // Find the selected property
  const selectedProperty = selectedPropertyId 
    ? displayAssets.find(p => p.id === selectedPropertyId) || null
    : null;
  
  // Find the selected developer
  const selectedDeveloper = selectedDeveloperId
    ? mockUsers.find(d => d.id === selectedDeveloperId) || null
    : null;
  
  // Get properties by developer
  const propertiesByDeveloper = selectedDeveloperId
    ? displayAssets.filter(p => p.developer === selectedDeveloperId)
    : [];
  
  // Get projects by developer
  const projectsByDeveloper = selectedDeveloperId
    ? projects.filter(p => p.developer_id === selectedDeveloperId)
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
    handleNavigate('/marketplace');
  };
  
  const handleCreate = () => {
    handleNavigate('/builder');
  };

  const handleBuilderLogin = async () => {
    // This will trigger the wallet connection from AuthContext
    try {
      await connectWallet();
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleCreateProject = () => {
    handleNavigate('/builder/create');
  };

  // Show loading state
  if (assetsLoading || projectsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (assetsError || projectsError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading data: {assetsError || projectsError}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    if (selectedPropertyId && selectedProperty) {
      return (
        <PropertyDetail
          property={selectedProperty}
          onBack={handleBackFromProperty}
          onLike={handleLikeProperty}
          isLiked={likedProperties[selectedPropertyId] || false}
        />
      );
    }
    
    if (selectedDeveloperId && selectedDeveloper) {
      return (
        <DeveloperDetail
          developer={selectedDeveloper}
          properties={propertiesByDeveloper}
          projects={projectsByDeveloper}
          onBack={handleBackFromDeveloper}
          onPropertyClick={handlePropertyClick}
          onProjectClick={() => {}} // TODO: Implement project detail view
          onLikeProperty={handleLikeProperty}
          likedProperties={likedProperties}
        />
      );
    }
    
    if (selectedLearnResourceId) {
      return (
        <LearnResourceDetail
          resourceId={selectedLearnResourceId}
          onBack={handleBackFromLearnResource}
        />
      );
    }

    switch (currentPath) {
      case '/':
        return (
          <>
            <Hero onExplore={handleExplore} onCreate={handleCreate} />
            
            <div className="container mx-auto px-4 py-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Properties</h2>
              <NFTGrid 
                properties={displayAssets}
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
              properties={displayAssets}
              onPropertyClick={handlePropertyClick}
              onLikeProperty={handleLikeProperty}
              likedProperties={likedProperties}
            />
          </div>
        );
      case '/marketplace':
        return (
          <NFTGrid 
            properties={displayAssets}
            onPropertyClick={handlePropertyClick}
            onLikeProperty={handleLikeProperty}
            likedProperties={likedProperties}
          />
        );
      case '/nfts':
        return (
          <NFTLandingPage 
            properties={displayAssets}
            onPropertyClick={handlePropertyClick}
            onLikeProperty={handleLikeProperty}
            likedProperties={likedProperties}
          />
        );
      case '/developers':
        return (
          <DevelopersGrid 
            developers={mockUsers}
            onDeveloperClick={handleDeveloperClick}
          />
        );
      case '/learn':
        return <LearnPage onResourceClick={handleLearnResourceClick} />;
      case '/portfolio':
        return <PortfolioDashboard />;
      case '/profile':
        return <ProfilePage />;
      case '/how-it-works':
        return <HowItWorksPage />;
      case '/governance':
        return <GovernancePage />;
      case '/builder':
        // Show different content based on authentication status
        if (isAuthenticated) {
          return (
            <BuilderDashboard 
              onCreateProject={handleCreateProject}
            />
          );
        } else {
          return (
            <BuilderLanding
              onLogin={handleBuilderLogin}
              onPropertyClick={handlePropertyClick}
              onLikeProperty={handleLikeProperty}
              likedProperties={likedProperties}
              featuredProperties={displayAssets}
            />
          );
        }
      case '/builder/create':
        // Only show project creation form if authenticated
        if (isAuthenticated) {
          return <ProjectLaunchForm onSuccess={() => handleNavigate('/builder')} />;
        } else {
          // Redirect to builder landing if not authenticated
          handleNavigate('/builder');
          return null;
        }
      case '/builder/dashboard':
        if (isAuthenticated) {
          return <DashboardContent />;
        } else {
          handleNavigate('/builder');
          return null;
        }
      case '/builder/stats':
        if (isAuthenticated) {
          return <Stats />;
        } else {
          handleNavigate('/builder');
          return null;
        }
      default:
        return (
          <>
            <Hero onExplore={handleExplore} onCreate={handleCreate} />
            <NFTGrid 
              properties={displayAssets}
              onPropertyClick={handlePropertyClick}
              onLikeProperty={handleLikeProperty}
              likedProperties={likedProperties}
            />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        currentPath={currentPath} 
        onNavigate={handleNavigate}
      />
      <main>
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
}

export default App;
