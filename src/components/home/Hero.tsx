import React from 'react';
import { ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
interface HeroProps {
  onExplore?: () => void;
  onCreate?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onExplore, onCreate }) => {
  return (
    <div className="bg-gradient-to-br from-indigo-50 to-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Buidl the Future, One Akre at a Time
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Invest in Global Infrastructure Projects: Hotels, Condos, Stadiums and more using AUSD.
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
