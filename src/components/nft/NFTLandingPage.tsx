import React from 'react';
import { Shield, Globe, TrendingUp, Zap, CheckCircle, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import NFTGrid from './NFTGrid';
import { RealEstateAsset } from '../../types';

interface NFTLandingPageProps {
  properties: RealEstateAsset[];
  onPropertyClick: (id: string) => void;
  onLikeProperty: (id: string) => void;
  likedProperties: Record<string, boolean>;
}

const NFTLandingPage: React.FC<NFTLandingPageProps> = ({
  properties,
  onPropertyClick,
  onLikeProperty,
  likedProperties
}) => {
  const nftProperties = properties.filter(property => property.nftContractAddress);

  const benefits = [
    {
      icon: Shield,
      title: "Blockchain Verified",
      description: "Every property is backed by smart contracts ensuring transparency and security"
    },
    {
      icon: Globe,
      title: "Global Access",
      description: "Invest in premium real estate worldwide with fractional ownership"
    },
    {
      icon: TrendingUp,
      title: "Real Returns",
      description: "Earn from property appreciation and rental income through tokenized assets"
    },
    {
      icon: Zap,
      title: "Instant Trading",
      description: "Buy, sell, and trade property tokens instantly on the blockchain"
    }
  ];

  const stats = [
    { label: "NFT Properties", value: `${nftProperties.length}` },
    { label: "Total Value", value: "$50M+" },
    { label: "Blockchain Verified", value: "100%" },
    { label: "Global Locations", value: "15+" }
  ];

  const features = [
    "Fractional ownership through NFT tokens",
    "Smart contract-backed property rights",
    "Transparent funding and milestone tracking",
    "Global real estate portfolio access",
    "Instant liquidity through token trading",
    "Verified property documentation on-chain"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative py-16 md:py-24 overflow-hidden">
        <img
          src="/background.gif"
          alt="Background animation"
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
          style={{ filter: 'brightness(0.6)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-700 opacity-10 z-10"></div>
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
              Own Real Estate as <span className="text-yellow-400">NFTs</span>
            </h1>
            <p className="text-xl text-white mb-8 drop-shadow-md max-w-3xl mx-auto">
              Invest in tokenized real estate properties backed by blockchain technology. 
              Get fractional ownership, transparent returns, and global access to premium properties.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100">
                Explore NFT Properties
              </Button>
              <Button size="lg" variant="outline" className="group text-white border-white hover:bg-white hover:text-indigo-600">
                <span>Learn More</span>
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>

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

      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why NFT Real Estate?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Blockchain technology revolutionizes real estate investment with transparency, accessibility, and security
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

      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                The Future of Real Estate Investment
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Our NFT-backed properties combine traditional real estate value with 
                cutting-edge blockchain technology for a new investment experience.
              </p>
              
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Ready to Invest?</h3>
                <p className="text-indigo-100 mb-6">
                  Join thousands of investors who are building wealth through tokenized real estate.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                    <span className="text-sm">Start with any amount</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                    <span className="text-sm">Instant global access</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                    <span className="text-sm">Blockchain security</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">NFT-Enabled Properties</h2>
            <p className="text-xl text-gray-600">
              Discover premium real estate properties available as blockchain-verified NFTs
            </p>
          </div>
          
          <NFTGrid 
            properties={nftProperties}
            onPropertyClick={onPropertyClick}
            onLikeProperty={onLikeProperty}
            likedProperties={likedProperties}
          />
        </div>
      </div>
    </div>
  );
};

export default NFTLandingPage;
