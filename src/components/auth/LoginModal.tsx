import React from 'react';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { useAuth } from '../../context/AuthContext';

interface LoginModalProps {
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
  const { connectWallet, isConnecting } = useAuth();

  const handleLogin = async () => {
    try {
      await connectWallet();
      onClose();
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  return (
    <motion.div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div 
        className="bg-white rounded-lg p-6 w-full max-w-md relative"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">Welcome Back</h2>
        
        <div className="flex flex-col items-center justify-center space-y-6">
          <Button 
            onClick={handleLogin} 
            className="w-full justify-center bg-indigo-600 text-white hover:bg-indigo-700"
            disabled={isConnecting}
          >
            {isConnecting ? 'Connecting...' : 'Login with Google'}
          </Button>
          <div className="text-center text-sm text-gray-600 mt-4">
            Connect with your Google account to access the platform
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LoginModal;
