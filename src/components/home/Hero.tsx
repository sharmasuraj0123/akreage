import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import { ausdToken } from '../../data/mockData';

interface HeroProps {
  onExplore?: () => void;
  onCreate?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onExplore, onCreate }) => {
  const [backgroundError, setBackgroundError] = useState(false);

  // Inline SVG background as data URL
  const svgBackgroundDataUrl = `data:image/svg+xml;base64,${btoa(`
    <svg width="1920" height="1080" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#6366f1;stop-opacity:0.1">
            <animate attributeName="stop-opacity" values="0.1;0.3;0.1" dur="4s" repeatCount="indefinite"/>
          </stop>
          <stop offset="50%" style="stop-color:#8b5cf6;stop-opacity:0.15">
            <animate attributeName="stop-opacity" values="0.15;0.35;0.15" dur="3s" repeatCount="indefinite"/>
          </stop>
          <stop offset="100%" style="stop-color:#06b6d4;stop-opacity:0.1">
            <animate attributeName="stop-opacity" values="0.1;0.25;0.1" dur="5s" repeatCount="indefinite"/>
          </stop>
        </linearGradient>
        <linearGradient id="bg2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#f59e0b;stop-opacity:0.05">
            <animate attributeName="stop-opacity" values="0.05;0.2;0.05" dur="6s" repeatCount="indefinite"/>
          </stop>
          <stop offset="100%" style="stop-color:#10b981;stop-opacity:0.08">
            <animate attributeName="stop-opacity" values="0.08;0.25;0.08" dur="4.5s" repeatCount="indefinite"/>
          </stop>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg1)"/>
      <rect width="100%" height="100%" fill="url(#bg2)"/>
      <circle cx="200" cy="200" r="50" fill="#6366f1" opacity="0.1">
        <animateTransform attributeName="transform" type="translate" values="0,0; 100,50; 0,0" dur="8s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.1;0.3;0.1" dur="8s" repeatCount="indefinite"/>
      </circle>
      <rect x="1600" y="800" width="80" height="80" fill="#8b5cf6" opacity="0.15" rx="10">
        <animateTransform attributeName="transform" type="translate" values="0,0; -80,-30; 0,0" dur="10s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.15;0.35;0.15" dur="10s" repeatCount="indefinite"/>
      </rect>
      <polygon points="1000,100 1100,300 900,300" fill="#06b6d4" opacity="0.1">
        <animateTransform attributeName="transform" type="translate" values="0,0; 50,100; 0,0" dur="12s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.1;0.25;0.1" dur="12s" repeatCount="indefinite"/>
      </polygon>
    </svg>
  `)}`;

  return (
    <div
      className="bg-gradient-to-br from-indigo-50 to-white py-16 md:py-24 relative overflow-hidden"
    >
      
      {/* Background with fallback to SVG */}
      <img
        src="/background.gif"
        alt="Background animation"
        className={`absolute inset-0 w-full h-full object-cover z-0 pointer-events-none ${
          backgroundError ? 'hidden' : 'block'
        }`}
        style={{ filter: 'brightness(0.6)' }}
        onError={() => setBackgroundError(true)}
        onLoad={() => setBackgroundError(false)}
      />
      
      {/* SVG fallback when GIF fails to load */}
      {backgroundError && (
        <div 
          className="absolute inset-0 w-full h-full z-0 pointer-events-none"
          style={{ 
            backgroundImage: `url(${svgBackgroundDataUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.6)'
          }}
        />
      )}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Invest in Real Estate with <span className="text-indigo-600">AUSD</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Fractional ownership of premium properties using {ausdToken.name} ({ausdToken.symbol}). 
              Invest in real estate assets from around the world with as little as 100 AUSD.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={onExplore}>
                Explore Properties
              </Button>
              <Button size="lg" variant="outline" className="group" onClick={onCreate}>
                <span>Launch Project</span>
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-indigo-100 rounded-full z-0"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-indigo-100 rounded-full z-0"></div>
            
            <div className="relative z-10 bg-white p-6 rounded-2xl shadow-xl">
              <div className="grid grid-cols-3 gap-6">
                <div className="bg-indigo-50 p-4 rounded-xl flex flex-col items-center justify-center text-center">
                  <div className="text-sm text-gray-500">Total Value Locked</div>
                  <div className="text-2xl font-bold text-gray-900 mt-1">42.5M</div>
                  <div className="text-sm font-medium text-gray-900">AUSD</div>
                </div>
                <div className="bg-indigo-50 p-4 rounded-xl flex flex-col items-center justify-center text-center">
                  <div className="text-sm text-gray-500">Active Projects</div>
                  <div className="text-2xl font-bold text-gray-900 mt-1">24</div>
                  <div className="text-sm font-medium text-gray-900">&nbsp;</div>
                </div>
                <div className="bg-indigo-50 p-4 rounded-xl flex flex-col items-center justify-center text-center">
                  <div className="text-sm text-gray-500">Investors</div>
                  <div className="text-2xl font-bold text-gray-900 mt-1">12.4K</div>
                  <div className="text-sm font-medium text-gray-900">&nbsp;</div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-indigo-600 rounded-xl text-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-indigo-100">AUSD Price</span>
                  <span className="font-medium">$1.00 USD</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-indigo-100">Market Cap</span>
                  <span className="font-medium">$75M USD</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
