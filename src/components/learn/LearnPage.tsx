import React, { useState } from 'react';
import { Book, Video, FileText, ChevronRight } from 'lucide-react';
import Card from '../ui/Card';

interface LearnResource {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'guide';
  duration: string;
  image: string;
  category: string;
}

const mockLearnResources: LearnResource[] = [
  {
    id: 'learn1',
    title: 'Introduction to Real Estate Tokenization',
    description: 'Learn the basics of how blockchain technology is revolutionizing real estate investment.',
    type: 'article',
    duration: '5 min read',
    image: 'https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    category: 'Basics'
  },
  {
    id: 'learn2',
    title: 'How to Evaluate Real Estate Investment Opportunities',
    description: 'A comprehensive guide to analyzing potential real estate investments on the blockchain.',
    type: 'guide',
    duration: '15 min read',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    category: 'Investment'
  },
  {
    id: 'learn3',
    title: 'Understanding Fractional Ownership in Real Estate',
    description: 'Explore how blockchain enables fractional ownership and what it means for investors.',
    type: 'video',
    duration: '8 min watch',
    image: 'https://images.unsplash.com/photo-1556155092-490a1ba16284?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    category: 'Basics'
  },
  {
    id: 'learn4',
    title: 'Real Estate Tokenomics Explained',
    description: 'Dive deep into the economics behind tokenized real estate assets.',
    type: 'article',
    duration: '10 min read',
    image: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    category: 'Advanced'
  },
  {
    id: 'learn5',
    title: 'Legal Considerations for Blockchain Real Estate',
    description: 'An overview of the regulatory landscape for tokenized real estate investments.',
    type: 'guide',
    duration: '12 min read',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    category: 'Legal'
  },
  {
    id: 'learn6',
    title: 'How to Create Your First Real Estate Token',
    description: 'Step-by-step tutorial for developers looking to tokenize real estate assets.',
    type: 'video',
    duration: '15 min watch',
    image: 'https://images.unsplash.com/photo-1558588942-930faae5a389?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    category: 'Development'
  },
  {
    id: 'learn7',
    title: 'The Future of Real Estate Investment',
    description: 'Explore emerging trends and predictions for the tokenized real estate market.',
    type: 'article',
    duration: '7 min read',
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    category: 'Trends'
  },
  {
    id: 'learn8',
    title: 'Case Study: Successful Tokenized Real Estate Projects',
    description: 'Analysis of real-world examples of successful blockchain real estate ventures.',
    type: 'guide',
    duration: '20 min read',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    category: 'Case Studies'
  }
];

interface LearnPageProps {
  onResourceClick: (id: string) => void;
}

const LearnPage: React.FC<LearnPageProps> = ({ onResourceClick }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const categories = ['All', 'Basics', 'Investment', 'Advanced', 'Legal', 'Development', 'Trends', 'Case Studies'];
  
  const filteredResources = activeCategory === 'All' 
    ? mockLearnResources 
    : mockLearnResources.filter(resource => resource.category === activeCategory);
  
  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'article':
        return <FileText className="h-5 w-5 text-indigo-500" />;
      case 'video':
        return <Video className="h-5 w-5 text-indigo-500" />;
      case 'guide':
        return <Book className="h-5 w-5 text-indigo-500" />;
      default:
        return <FileText className="h-5 w-5 text-indigo-500" />;
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Learn About Real Estate Tokenization</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Explore our educational resources to understand how blockchain technology is transforming real estate investment.
        </p>
      </div>
      
      {/* Category Filter */}
      <div className="mb-10 overflow-x-auto">
        <div className="flex space-x-2 pb-2 min-w-max">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      {/* Featured Resource */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Resource</h2>
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl overflow-hidden shadow-xl">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" 
                alt="Featured resource" 
                className="h-64 w-full object-cover md:h-full"
              />
            </div>
            <div className="p-8 md:w-1/2 flex flex-col justify-center">
              <div className="flex items-center mb-4">
                <Book className="h-6 w-6 text-white mr-2" />
                <span className="text-indigo-100 text-sm font-medium">Comprehensive Guide</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">The Complete Guide to Real Estate Tokenization</h3>
              <p className="text-indigo-100 mb-6">Everything you need to know about investing in tokenized real estate, from basic concepts to advanced strategies.</p>
              <button 
                className="bg-white text-indigo-600 font-medium py-2 px-6 rounded-full inline-flex items-center hover:bg-indigo-50 transition-colors self-start"
                onClick={() => onResourceClick('learn1')}
              >
                Read Now
                <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Resource Grid */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">All Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredResources.map(resource => (
            <Card 
              key={resource.id} 
              className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onResourceClick(resource.id)}
            >
              <div className="relative h-48">
                <img 
                  src={resource.image} 
                  alt={resource.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-white rounded-full py-1 px-3 flex items-center">
                  {getTypeIcon(resource.type)}
                  <span className="ml-1 text-xs font-medium text-gray-700">{resource.duration}</span>
                </div>
              </div>
              <div className="p-5">
                <div className="text-xs font-medium text-indigo-600 mb-2">{resource.category}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{resource.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
                <button className="text-indigo-600 font-medium text-sm inline-flex items-center hover:text-indigo-800 transition-colors">
                  Read More
                  <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LearnPage;
