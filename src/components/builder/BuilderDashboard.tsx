import React, { useState } from 'react';
import { Plus, Building, DollarSign, Users, TrendingUp, Clock, CheckCircle, XCircle } from 'lucide-react';
import Button from '../ui/Button';
import { ProjectCard } from './ProjectCard';
import { ProjectDetails } from './ProjectDetails';
import { useBuilderProjects } from '../../hooks/useBuilderProjects';
import { useAuth } from '../../context/AuthContext';
import { Project } from '../../types';

interface BuilderDashboardProps {
  onCreateProject: () => void;
}

// Transform database project to match Project interface
const transformProject = (dbProject: any): Project => ({
  id: dbProject.id,
  name: dbProject.name,
  description: dbProject.description || '',
  image: dbProject.image || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  developer: dbProject.developer?.name || 'Unknown Developer',
  properties: dbProject.properties_count || 1,
  minInvestment: dbProject.min_investment || 0,
  location: dbProject.location || '',
  totalFundingGoal: dbProject.funding_goal || 0,
  totalFundingRaised: dbProject.funding_raised || 0,
  progress: dbProject.progress || 0,
  status: dbProject.status || 'Planning',
  duration: dbProject.duration,
  startDate: dbProject.start_date,
  totalInvestment: dbProject.funding_goal || 0,
  fundingRaised: dbProject.funding_raised || 0,
  investorCount: dbProject.investor_count || 0,
  milestones: dbProject.milestones || []
});

const BuilderDashboard: React.FC<BuilderDashboardProps> = ({ onCreateProject }) => {
  const { user } = useAuth();
  const { projects, loading, error, refetch } = useBuilderProjects();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleProjectClick = (project: any) => {
    const transformedProject = transformProject(project);
    setSelectedProject(transformedProject);
  };

  const handleBackToProjects = () => {
    setSelectedProject(null);
    // Refetch projects to get any updates
    refetch();
  };

  // Calculate dashboard stats
  const totalProjects = projects.length;
  const approvedProjects = projects.filter(project => project.approved).length;
  const pendingProjects = projects.filter(project => !project.approved).length;
  const totalFunding = projects.reduce((sum, project) => sum + (project.funding_raised || 0), 0);
  const activeProjects = projects.filter(project => 
    project.status === 'In Progress' || project.status === 'Construction'
  ).length;
  const avgProgress = projects.length > 0 
    ? Math.round(projects.reduce((sum, project) => sum + (project.progress || 0), 0) / projects.length)
    : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your projects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading projects: {error}</p>
          <Button onClick={refetch}>
            Retry
          </Button>
        </div>
      </div>
    );
  }

  if (selectedProject) {
    return (
      <ProjectDetails 
        project={selectedProject} 
        onBack={handleBackToProjects} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Builder Dashboard</h1>
              <p className="text-gray-600 mt-2">
                Welcome back{user?.name ? `, ${user.name}` : ''}! Manage your real estate projects and track their progress.
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <Button 
                onClick={onCreateProject}
                className="bg-indigo-600 hover:bg-indigo-700 flex items-center"
              >
                <Plus className="h-5 w-5 mr-2" />
                Create New Project
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 rounded-full p-3 mr-4">
                <Building className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Projects</p>
                <p className="text-2xl font-bold text-gray-900">{totalProjects}</p>
                <p className="text-xs text-gray-400">
                  {approvedProjects} approved, {pendingProjects} pending
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <div className="flex items-center">
              <div className="bg-green-100 rounded-full p-3 mr-4">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Funding Raised</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${(totalFunding / 1000000).toFixed(1)}M
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 rounded-full p-3 mr-4">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Active Projects</p>
                <p className="text-2xl font-bold text-gray-900">{activeProjects}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <div className="flex items-center">
              <div className="bg-orange-100 rounded-full p-3 mr-4">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Avg. Progress</p>
                <p className="text-2xl font-bold text-gray-900">{avgProgress}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Your Projects</h2>
              <span className="text-sm text-gray-500">{projects.length} projects</span>
            </div>
          </div>

          {projects.length > 0 ? (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <div key={project.id} className="relative">
                    <ProjectCard
                      title={project.name}
                      location={project.location}
                      progress={project.progress || 0}
                      image={project.image || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'}
                      status={project.status}
                      onClick={() => handleProjectClick(project)}
                    />
                    {/* Approval Status Badge */}
                    <div className="absolute top-2 right-2">
                      {project.approved ? (
                        <div className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full flex items-center">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Approved
                        </div>
                      ) : (
                        <div className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          Pending Review
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-12 text-center">
              <Building className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                Get started by creating your first real estate project. Connect with investors 
                and bring your vision to life.
              </p>
              <Button 
                onClick={onCreateProject}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                <Plus className="h-5 w-5 mr-2" />
                Create Your First Project
              </Button>
            </div>
          )}
        </div>

        {/* Information Section */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-900 mb-2">Project Approval Process</h3>
          <p className="text-blue-800 mb-4">
            All new projects undergo a review process before being visible to investors. This ensures quality and compliance with our platform standards.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-start">
              <div className="bg-blue-100 rounded-full p-2 mr-3 mt-0.5">
                <Building className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-blue-900">Submit Project</h4>
                <p className="text-blue-700">Create and submit your project details</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-100 rounded-full p-2 mr-3 mt-0.5">
                <Clock className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-blue-900">Under Review</h4>
                <p className="text-blue-700">Our team reviews your project (1-3 business days)</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-100 rounded-full p-2 mr-3 mt-0.5">
                <CheckCircle className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-blue-900">Go Live</h4>
                <p className="text-blue-700">Approved projects become visible to investors</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Project Resources</h3>
            <p className="text-gray-600 text-sm mb-4">
              Access guides and templates to help you create successful projects.
            </p>
            <Button variant="outline" size="sm">
              View Resources
            </Button>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Investor Network</h3>
            <p className="text-gray-600 text-sm mb-4">
              Connect with potential investors and build relationships.
            </p>
            <Button variant="outline" size="sm">
              Browse Investors
            </Button>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Analytics</h3>
            <p className="text-gray-600 text-sm mb-4">
              Track your project performance and investor engagement.
            </p>
            <Button variant="outline" size="sm">
              View Analytics
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuilderDashboard; 