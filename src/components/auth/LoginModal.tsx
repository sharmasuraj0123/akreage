import React from 'react';
import { X } from 'lucide-react';
import { ConnectButton } from "thirdweb/react";
import { inAppWallet } from "thirdweb/wallets";
import Button from '../ui/Button';
import { useAuth } from '../../context/AuthContext';

interface LoginModalProps {
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
  const { client, isConnecting } = useAuth();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">Welcome Back</h2>
        
        <div className="flex flex-col items-center justify-center space-y-6">
          <ConnectButton
            client={client}
            wallets={[inAppWallet()]}
            connectButton={{
              label: isConnecting ? 'Connecting...' : 'Login with Google',
              className: "w-full justify-center bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-md font-medium transition-colors disabled:opacity-50"
            }}
            onConnect={() => {
              console.log("Wallet connected via ConnectButton");
              setTimeout(() => onClose(), 1000); // Close modal after connection
            }}
            autoConnect={{
              timeout: 10000,
            }}
          />
          <div className="text-center text-sm text-gray-600 mt-4">
            Connect with your Google account to access the platform
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
