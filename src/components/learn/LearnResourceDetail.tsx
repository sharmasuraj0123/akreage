import React from 'react';
import { ArrowLeft, Clock, Calendar, User, Share2, Bookmark } from 'lucide-react';

interface LearnResourceDetailProps {
  onBack: () => void;
  resourceId?: string;
}

const LearnResourceDetail: React.FC<LearnResourceDetailProps> = ({ onBack, resourceId }) => {
  // This is a mock component that would display a single learning resource
  // In a real application, you would fetch the resource data based on the ID
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Resources
      </button>
      
      <div className="max-w-4xl mx-auto">
        {/* Article Header */}
        <div className="mb-8">
          <div className="text-sm font-medium text-indigo-600 mb-2">Basics</div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Introduction to Real Estate Tokenization
          </h1>
          
          <div className="flex flex-wrap items-center text-sm text-gray-500 mb-6">
            <div className="flex items-center mr-6 mb-2">
              <Clock className="h-4 w-4 mr-1" />
              <span>5 min read</span>
            </div>
            <div className="flex items-center mr-6 mb-2">
              <Calendar className="h-4 w-4 mr-1" />
              <span>May 15, 2023</span>
            </div>
            <div className="flex items-center mb-2">
              <User className="h-4 w-4 mr-1" />
              <span>By Alex Johnson</span>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full py-1 px-3 text-sm flex items-center transition-colors">
              <Share2 className="h-4 w-4 mr-1" />
              Share
            </button>
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full py-1 px-3 text-sm flex items-center transition-colors">
              <Bookmark className="h-4 w-4 mr-1" />
              Save
            </button>
          </div>
        </div>
        
        {/* Featured Image */}
        <div className="mb-8">
          <img 
            src="https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" 
            alt="Real Estate Tokenization" 
            className="w-full h-auto rounded-xl"
          />
        </div>
        
        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <h2>What is Real Estate Tokenization?</h2>
          <p>
            Real estate tokenization is the process of converting ownership rights in a real estate asset into digital tokens on a blockchain. These tokens represent a share of the property and can be bought, sold, and traded on various platforms.
          </p>
          
          <p>
            This innovative approach to real estate investment offers several advantages over traditional methods:
          </p>
          
          <ul>
            <li>Lower barriers to entry for investors</li>
            <li>Increased liquidity for real estate assets</li>
            <li>Transparent and secure transactions</li>
            <li>Global accessibility to real estate markets</li>
            <li>Automated compliance and dividend distributions</li>
          </ul>
          
          <h2>How Does Tokenization Work?</h2>
          <p>
            The tokenization process typically involves the following steps:
          </p>
          
          <ol>
            <li>A property owner or developer decides to tokenize their real estate asset.</li>
            <li>The asset is placed in a legal entity, such as a Special Purpose Vehicle (SPV).</li>
            <li>The ownership of the SPV is divided into digital tokens on a blockchain.</li>
            <li>These tokens are offered to investors through various means, such as Security Token Offerings (STOs).</li>
            <li>Token holders receive benefits proportional to their ownership, such as rental income or appreciation.</li>
          </ol>
          
          <h2>Benefits for Investors</h2>
          <p>
            Tokenized real estate offers numerous benefits for investors of all sizes:
          </p>
          
          <p>
            <strong>Fractional Ownership:</strong> Investors can purchase small portions of high-value properties that would otherwise be inaccessible.
          </p>
          
          <p>
            <strong>Liquidity:</strong> Unlike traditional real estate investments, tokens can be traded more easily on secondary markets.
          </p>
          
          <p>
            <strong>Transparency:</strong> All transactions are recorded on the blockchain, providing a clear history of ownership and valuation.
          </p>
          
          <h2>Getting Started</h2>
          <p>
            If you're interested in investing in tokenized real estate, here are some steps to get started:
          </p>
          
          <ol>
            <li>Educate yourself about blockchain technology and tokenized assets.</li>
            <li>Research platforms that offer real estate tokens.</li>
            <li>Understand the legal and regulatory considerations in your jurisdiction.</li>
            <li>Start with a small investment to gain experience.</li>
            <li>Diversify your portfolio across different types of properties and locations.</li>
          </ol>
          
          <p>
            As the market for tokenized real estate continues to grow, early adopters have the opportunity to benefit from this revolutionary approach to property investment.
          </p>
        </div>
        
        {/* Related Resources */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Related Resources</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-lg p-5">
              <div className="text-xs font-medium text-indigo-600 mb-2">Investment</div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">How to Evaluate Real Estate Investment Opportunities</h4>
              <button className="text-indigo-600 font-medium text-sm inline-flex items-center hover:text-indigo-800 transition-colors">
                Read More
                <ArrowLeft className="h-4 w-4 ml-1 transform rotate-180" />
              </button>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-5">
              <div className="text-xs font-medium text-indigo-600 mb-2">Basics</div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Understanding Fractional Ownership in Real Estate</h4>
              <button className="text-indigo-600 font-medium text-sm inline-flex items-center hover:text-indigo-800 transition-colors">
                Read More
                <ArrowLeft className="h-4 w-4 ml-1 transform rotate-180" />
              </button>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-5">
              <div className="text-xs font-medium text-indigo-600 mb-2">Advanced</div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Real Estate Tokenomics Explained</h4>
              <button className="text-indigo-600 font-medium text-sm inline-flex items-center hover:text-indigo-800 transition-colors">
                Read More
                <ArrowLeft className="h-4 w-4 ml-1 transform rotate-180" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnResourceDetail;
