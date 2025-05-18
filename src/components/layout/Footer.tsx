import React from 'react';
import { Twitter, Instagram, Facebook, Github } from 'lucide-react';

const Footer: React.FC = () => {
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    alert(`Subscribed with email: ${email}`);
    form.reset();
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <h2 className="text-xl font-bold mb-4">Akreage Launchpad</h2>
            <p className="text-gray-400 mb-4">
              The world's first decentralized crowdfunding platform for real estate developers to raise capital using crypto assets.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white" aria-label="Github">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Platform</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">All Properties</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Residential</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Commercial</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Developers</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Account</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Profile</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Investments</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Watchlist</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">My Projects</a></li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay in the loop</h3>
            <p className="text-gray-400 mb-4">
              Join our mailing list to stay updated with new property listings, investment opportunities, and platform updates.
            </p>
            <form onSubmit={handleSubscribe}>
              <div className="flex">
                <input
                  type="email"
                  name="email"
                  placeholder="Your email address"
                  className="px-4 py-2 w-full text-gray-900 rounded-l-lg focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-r-lg"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2023 Akreage Launchpad. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
