import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { ausdToken } from '../../data/mockData';

interface HeroProps {
  onExplore?: () => void;
  onCreate?: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0
  }
};

const statVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1
  }
};

const Hero: React.FC<HeroProps> = ({ onExplore, onCreate }) => {
  return (
    <div
      className="bg-gradient-to-br from-indigo-50 to-white py-16 md:py-24 relative"
    >
    <img
        src="/background.gi"
        alt="Background animation"
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        style={{ filter: 'brightness(0.6)' }}
      />
      <div className="container mx-auto px-4">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div>
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              variants={itemVariants}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              Invest in Real Estate with <span className="text-indigo-600">AUSD</span>
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 mb-8"
              variants={itemVariants}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              Fractional ownership of premium properties using {ausdToken.name} ({ausdToken.symbol}). 
              Invest in real estate assets from around the world with as little as 100 AUSD.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              variants={itemVariants}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <Button size="lg" onClick={onExplore}>
                Explore Properties
              </Button>
              <Button size="lg" variant="outline" className="group" onClick={onCreate}>
                <span>Launch Project</span>
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </div>
          
          <motion.div 
            className="relative"
            variants={itemVariants}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-indigo-100 rounded-full z-0"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-indigo-100 rounded-full z-0"></div>
            
            <div className="relative z-10 bg-white p-6 rounded-2xl shadow-xl">
              <motion.div 
                className="grid grid-cols-3 gap-6"
                variants={containerVariants}
              >
                <motion.div 
                  className="bg-indigo-50 p-4 rounded-xl flex flex-col items-center justify-center text-center"
                  variants={statVariants}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                >
                  <div className="text-sm text-gray-500">Total Value Locked</div>
                  <div className="text-2xl font-bold text-gray-900 mt-1">42.5M</div>
                  <div className="text-sm font-medium text-gray-900">AUSD</div>
                </motion.div>
                <motion.div 
                  className="bg-indigo-50 p-4 rounded-xl flex flex-col items-center justify-center text-center"
                  variants={statVariants}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                >
                  <div className="text-sm text-gray-500">Active Projects</div>
                  <div className="text-2xl font-bold text-gray-900 mt-1">24</div>
                  <div className="text-sm font-medium text-gray-900">&nbsp;</div>
                </motion.div>
                <motion.div 
                  className="bg-indigo-50 p-4 rounded-xl flex flex-col items-center justify-center text-center"
                  variants={statVariants}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                >
                  <div className="text-sm text-gray-500">Investors</div>
                  <div className="text-2xl font-bold text-gray-900 mt-1">12.4K</div>
                  <div className="text-sm font-medium text-gray-900">&nbsp;</div>
                </motion.div>
              </motion.div>
              
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
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
