import React from 'react';
import { ArrowRight, Shield, DollarSign, Users, TrendingUp, FileText, CheckCircle } from 'lucide-react';
import Button from '../ui/Button';

const HowItWorksPage: React.FC = () => {
  const steps = [
    {
      id: 1,
      title: 'Connect Your Wallet',
      description: 'Connect your crypto wallet to start investing in real estate properties using AUSD tokens.',
      icon: <Shield className="h-8 w-8 text-indigo-600" />,
      details: [
        'Support for MetaMask, Coinbase Wallet, and other popular wallets',
        'Secure blockchain-based authentication',
        'No personal information required'
      ]
    },
    {
      id: 2,
      title: 'Browse Properties',
      description: 'Explore our curated selection of real estate investment opportunities from verified developers.',
      icon: <FileText className="h-8 w-8 text-indigo-600" />,
      details: [
        'Detailed property information and documentation',
        'Transparent investment progress and milestones',
        'Professional property management'
      ]
    },
    {
      id: 3,
      title: 'Invest with AUSD',
      description: 'Purchase property tokens using AUSD to gain fractional ownership of real estate assets.',
      icon: <DollarSign className="h-8 w-8 text-indigo-600" />,
      details: [
        'Minimum investment as low as 100 AUSD',
        'Instant token ownership on blockchain',
        'Transparent pricing and fees'
      ]
    },
    {
      id: 4,
      title: 'Track Your Portfolio',
      description: 'Monitor your investments, track property performance, and receive regular updates.',
      icon: <TrendingUp className="h-8 w-8 text-indigo-600" />,
      details: [
        'Real-time portfolio valuation',
        'Property milestone updates',
        'Performance analytics and reporting'
      ]
    }
  ];

  const benefits = [
    {
      title: 'Fractional Ownership',
      description: 'Own a piece of premium real estate with minimal capital requirements.',
      icon: <Users className="h-6 w-6 text-indigo-600" />
    },
    {
      title: 'Blockchain Security',
      description: 'All transactions are secured by blockchain technology for transparency and trust.',
      icon: <Shield className="h-6 w-6 text-indigo-600" />
    },
    {
      title: 'Professional Management',
      description: 'Properties are professionally managed by experienced real estate developers.',
      icon: <CheckCircle className="h-6 w-6 text-indigo-600" />
    },
    {
      title: 'Global Access',
      description: 'Invest in real estate properties from around the world using cryptocurrency.',
      icon: <TrendingUp className="h-6 w-6 text-indigo-600" />
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">How Akreage Works</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Akreage is a decentralized platform that enables fractional real estate investment using blockchain technology. 
          Here's how you can start building your real estate portfolio with AUSD tokens.
        </p>
      </div>

      {/* Steps */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Getting Started</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.id} className="relative">
              <div className="bg-white rounded-lg shadow-md p-6 h-full">
                <div className="flex items-center mb-4">
                  <div className="bg-indigo-100 rounded-full p-3 mr-4">
                    {step.icon}
                  </div>
                  <div className="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    {step.id}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 mb-4">{step.description}</p>
                <ul className="space-y-2">
                  {step.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-500">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <ArrowRight className="h-6 w-6 text-gray-400" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Benefits */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Why Choose Akreage?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start">
                <div className="bg-indigo-100 rounded-full p-3 mr-4">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Investment Process */}
      <div className="bg-gray-50 rounded-lg p-8 mb-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Investment Process</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Token-Based Ownership</h3>
            <p className="text-gray-600 mb-4">
              Each property is tokenized on the blockchain, allowing you to purchase fractional ownership through AUSD tokens. 
              Your tokens represent your share of the property and entitle you to proportional benefits.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Transparent ownership records on blockchain
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Instant liquidity through token trading
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Proportional rental income distribution
              </li>
            </ul>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Example Investment</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Property Value:</span>
                <span className="font-medium">1,000,000 AUSD</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Your Investment:</span>
                <span className="font-medium">10,000 AUSD</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Ownership Share:</span>
                <span className="font-medium text-indigo-600">1%</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monthly Rental Income:</span>
                  <span className="font-medium text-green-600">~83 AUSD</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What is AUSD?</h3>
              <p className="text-gray-600">
                AUSD (Akreage USD) is our platform's native token used for all real estate investments. 
                It's pegged to the US Dollar for stability and ease of use.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I get AUSD tokens?</h3>
              <p className="text-gray-600">
                You can acquire AUSD tokens through our platform or supported exchanges. 
                We also provide conversion services from major cryptocurrencies.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Are my investments secure?</h3>
              <p className="text-gray-600">
                Yes, all investments are secured by blockchain technology and smart contracts. 
                Property ownership is legally documented and verified.
              </p>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What's the minimum investment?</h3>
              <p className="text-gray-600">
                The minimum investment varies by property but typically starts at 100 AUSD, 
                making real estate investment accessible to everyone.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How are properties selected?</h3>
              <p className="text-gray-600">
                All properties undergo rigorous due diligence by our team, including legal verification, 
                market analysis, and developer background checks.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I sell my tokens?</h3>
              <p className="text-gray-600">
                Yes, tokens can be traded on our platform's marketplace, providing liquidity 
                for your real estate investments when needed.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center bg-indigo-50 rounded-lg p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Start Investing?</h2>
        <p className="text-xl text-gray-600 mb-6">
          Join thousands of investors building their real estate portfolio with Akreage.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg">
            Explore Properties
          </Button>
          <Button size="lg" variant="outline">
            Connect Wallet
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage; 