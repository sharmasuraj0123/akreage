import React from 'react';
import { Building, Users, DollarSign, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import NFTGrid from '../nft/NFTGrid';

interface BuilderLandingProps {
  onLogin: () => void;
  onPropertyClick: (id: string) => void;
  onLikeProperty: (id: string) => void;
  likedProperties: Record<string, boolean>;
  featuredProperties: any[];
}

const BuilderLanding: React.FC<BuilderLandingProps> = ({
  onLogin,
  onPropertyClick,
  onLikeProperty,
  likedProperties,
  featuredProperties
}) => {
  const benefits = [
    {
      icon: Building,
      title: "Launch Real Estate Projects",
      description: "Create and manage your real estate development projects with blockchain transparency"
    },
    {
      icon: Users,
      title: "Access Global Investors",
      description: "Connect with a worldwide network of crypto-savvy real estate investors"
    },
    {
      icon: DollarSign,
      title: "Fractional Funding",
      description: "Raise capital through fractional ownership using AUSD tokens"
    },
    {
      icon: TrendingUp,
      title: "Track Performance",
      description: "Monitor project progress and investor engagement in real-time"
    }
  ];

  const features = [
    "Create detailed project proposals with milestones",
    "Set funding goals and deadlines",
    "Upload project documents and images",
    "Communicate with investors transparently",
    "Track funding progress in real-time",
    "Manage project updates and milestones"
  ];

  const stats = [
    { label: "Active Builders", value: "150+" },
    { label: "Projects Funded", value: "$42M+" },
    { label: "Success Rate", value: "94%" },
    { label: "Avg. Funding Time", value: "45 days" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative py-16 md:py-24 overflow-hidden">
        {/* Background GIF */}
        <img
          src="/background.gif"
          alt="Background animation"
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
          style={{ filter: 'brightness(0.6)' }}
        />
        {/* Optional overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-white opacity-80 z-10"></div>
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Build the Future of <span className="text-indigo-600">Real Estate</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Join Akreage's builder platform to launch real estate projects, connect with global investors, 
              and revolutionize property development through blockchain technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={onLogin} className="bg-indigo-600 hover:bg-indigo-700">
                Start Building Today
              </Button>
              <Button size="lg" variant="outline" className="group">
                <span>Learn More</span>
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-indigo-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Akreage?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform provides everything you need to successfully launch and manage real estate projects
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <div className="bg-indigo-100 rounded-full p-3 w-fit mb-4">
                  <benefit.icon className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Everything You Need to Launch Successfully
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Our comprehensive builder platform provides all the tools and features you need 
                to create compelling project proposals and attract investors.
              </p>
              
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <Button onClick={onLogin} className="bg-indigo-600 hover:bg-indigo-700">
                  Get Started Now
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Ready to Launch?</h3>
                <p className="text-indigo-100 mb-6">
                  Join successful builders who have raised millions in funding through our platform.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                    <span className="text-sm">Free to create projects</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                    <span className="text-sm">No upfront costs</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                    <span className="text-sm">Global investor network</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Properties Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Projects</h2>
            <p className="text-xl text-gray-600">
              See what other builders have created on our platform
            </p>
          </div>
          
          <NFTGrid 
            properties={featuredProperties}
            onPropertyClick={onPropertyClick}
            onLikeProperty={onLikeProperty}
            likedProperties={likedProperties}
          />
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-indigo-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Real Estate?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join the next generation of real estate developers using blockchain technology 
            to create transparent, accessible investment opportunities.
          </p>
          <Button 
            size="lg" 
            onClick={onLogin}
            className="bg-white text-indigo-600 hover:bg-gray-100"
          >
            Start Your First Project
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BuilderLanding; 