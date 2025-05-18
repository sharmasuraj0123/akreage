import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, Search, ChevronDown, User, Settings, LogOut } from 'lucide-react';
import Button from '../ui/Button';
import { useAuth } from '../../context/AuthContext';
import LoginModal from '../auth/LoginModal';

interface HeaderProps {
  onNavigate: (path: string) => void;
  currentPath: string;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentPath }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const profileMenuRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => currentPath === path;

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const NavButton: React.FC<{
    to: string;
    children: React.ReactNode;
  }> = ({ to, children }) => (
    <button
      onClick={() => onNavigate(to)}
      className={`relative px-3 py-2 text-sm font-medium transition-colors ${
        isActive(to)
          ? 'text-indigo-600'
          : 'text-gray-600 hover:text-gray-900'
      }`}
    >
      {children}
      {isActive(to) && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
      )}
    </button>
  );

  const ProfileMenu = () => (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-200">
      <button
        onClick={() => {
          onNavigate('/profile');
          setShowProfileMenu(false);
        }}
        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
      >
        <User className="h-4 w-4 mr-2" />
        Profile
      </button>
      <button
        onClick={() => {
          onNavigate('/settings');
          setShowProfileMenu(false);
        }}
        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
      >
        <Settings className="h-4 w-4 mr-2" />
        Settings
      </button>
      <div className="h-px bg-gray-200 my-1" />
      <button
        onClick={() => {
          logout();
          setShowProfileMenu(false);
        }}
        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
      >
        <LogOut className="h-4 w-4 mr-2" />
        Sign out
      </button>
    </div>
  );

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => onNavigate('/')}
          >
            <div className="w-8 h-8 bg-indigo-600 rounded-md flex items-center justify-center">
              <span className="text-white font-bold">A</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Akreage</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavButton to="/">Home</NavButton>
            <NavButton to="/properties">Properties</NavButton>
            <NavButton to="/governance">Governance</NavButton>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search properties" 
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-64"
              />
            </div>

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="bg-indigo-50 px-4 py-2 rounded-md">
                  <div className="text-xs text-gray-500">Balance</div>
                  <div className="text-sm font-medium text-indigo-600">
                    {user?.walletBalance} AUSD
                  </div>
                </div>
                
                {/* Profile Menu */}
                <div className="relative" ref={profileMenuRef}>
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center space-x-2 focus:outline-none"
                  >
                    <div className="relative">
                      <img
                        src={user?.avatar}
                        alt={user?.name}
                        className="h-8 w-8 rounded-full object-cover ring-2 ring-white"
                      />
                      <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white" />
                    </div>
                  </button>
                  
                  {showProfileMenu && <ProfileMenu />}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowLoginModal(true)}
                >
                  Login
                </Button>
                <Button variant="primary" size="sm">
                  Sign up
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-3 space-y-3">
            <button
              onClick={() => { onNavigate('/'); setIsMenuOpen(false); }}
              className={`block w-full text-left px-3 py-2 text-sm rounded-md ${isActive('/') ? 'text-indigo-600' : 'text-gray-700 hover:bg-gray-50'}`}
            >
              Home
            </button>
            <button
              onClick={() => { onNavigate('/properties'); setIsMenuOpen(false); }}
              className={`block w-full text-left px-3 py-2 text-sm rounded-md ${isActive('/properties') ? 'text-indigo-600' : 'text-gray-700 hover:bg-gray-50'}`}
            >
              Properties
            </button>
            <button
              onClick={() => { onNavigate('/developers'); setIsMenuOpen(false); }}
              className={`block w-full text-left px-3 py-2 text-sm rounded-md ${isActive('/developers') ? 'text-indigo-600' : 'text-gray-700 hover:bg-gray-50'}`}
            >
              Developers
            </button>
            <button
              onClick={() => { onNavigate('/governance'); setIsMenuOpen(false); }}
              className={`block w-full text-left px-3 py-2 text-sm rounded-md ${isActive('/governance') ? 'text-indigo-600' : 'text-gray-700 hover:bg-gray-50'}`}
            >
              Governance
            </button>
          </div>

          {isAuthenticated ? (
            <div className="px-4 py-3 border-t border-gray-200">
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-white"
                />
                <div>
                  <div className="font-medium text-gray-900">{user?.name}</div>
                  <div className="text-sm text-gray-500">{user?.email}</div>
                </div>
              </div>
              
              <div className="space-y-1">
                <button
                  onClick={() => {
                    onNavigate('/profile');
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </button>
                <button
                  onClick={() => {
                    onNavigate('/settings');
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </button>
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign out
                </button>
              </div>
            </div>
          ) : (
            <div className="px-4 py-3 border-t border-gray-200 space-y-2">
              <Button
                variant="outline"
                fullWidth
                onClick={() => {
                  setShowLoginModal(true);
                  setIsMenuOpen(false);
                }}
              >
                Login
              </Button>
              <Button variant="primary" fullWidth>
                Sign up
              </Button>
            </div>
          )}
        </div>
      )}

      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
    </header>
  );
};

export default Header;
