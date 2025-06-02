import React from 'react';
import { 
  Shield, 
  Users, 
  Vote, 
  CheckCircle, 
  Clock, 
  Building2,
  TrendingUp,
  Lock,
  ArrowRight
} from 'lucide-react';
import Button from '../ui/Button';

interface GovernanceInfoPageProps {
  onLogin: () => void;
}

const GovernanceInfoPage: React.FC<GovernanceInfoPageProps> = ({ onLogin }) => {
  const features = [
    {
      icon: Vote,
      title: 'Democratic Voting',
      description: 'Participate in milestone approvals and project governance decisions through secure blockchain voting.'
    },
    {
      icon: Shield,
      title: 'Transparent Process',
      description: 'All governance decisions are recorded on-chain, ensuring complete transparency and accountability.'
    },
    {
      icon: Users,
      title: 'Council Membership',
      description: 'Join the governance council to help shape the future of real estate development on our platform.'
    },
    {
      icon: CheckCircle,
      title: 'Milestone Oversight',
      description: 'Review and approve project milestones to ensure developers meet their commitments to investors.'
    }
  ];

  const stats = [
    { label: 'Active Council Members', value: '5', icon: Users },
    { label: 'Projects Governed', value: '12', icon: Building2 },
    { label: 'Decisions Made', value: '47', icon: Vote },
    { label: 'Success Rate', value: '94%', icon: TrendingUp }
  ];

  const governanceProcess = [
    {
      step: '1',
      title: 'Project Submission',
      description: 'Developers submit projects and milestones for governance review'
    },
    {
      step: '2',
      title: 'Council Review',
      description: 'Governance council members review project details and documentation'
    },
    {
      step: '3',
      title: 'Voting Period',
      description: 'Council members cast their votes within the designated timeframe'
    },
    {
      step: '4',
      title: 'Decision Execution',
      description: 'Approved milestones are funded, rejected ones require revision'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-800 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 rounded-full backdrop-blur-sm">
                <Lock className="h-12 w-12" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Governance Council
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-indigo-100">
              Secure, transparent, and democratic oversight of real estate development projects
            </p>
            <div className="bg-amber-500/20 border border-amber-400/30 rounded-lg p-6 mb-8">
              <div className="flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-amber-300 mr-2" />
                <span className="text-lg font-semibold text-amber-100">Access Restricted</span>
              </div>
              <p className="text-amber-100">
                Governance council access is currently limited to verified members. 
                Connect your wallet to check your eligibility status.
              </p>
            </div>
            <Button 
              size="lg" 
              onClick={onLogin}
              className="bg-indigo-600 text-white hover:bg-indigo-700 font-semibold px-8 py-4"
            >
              Connect Wallet to Access
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-indigo-100 rounded-full">
                    <stat.icon className="h-6 w-6 text-indigo-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                How Governance Works
              </h2>
              <p className="text-xl text-gray-600">
                Our governance system ensures accountability and transparency in every project
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {features.map((feature, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-indigo-100 rounded-lg flex-shrink-0">
                      <feature.icon className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Governance Process
              </h2>
              <p className="text-xl text-gray-600">
                A transparent, step-by-step process for project oversight
              </p>
            </div>
            
            <div className="space-y-8">
              {governanceProcess.map((process, index) => (
                <div key={index} className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      {process.step}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {process.title}
                    </h3>
                    <p className="text-gray-600">
                      {process.description}
                    </p>
                  </div>
                  {index < governanceProcess.length - 1 && (
                    <div className="flex-shrink-0 w-px h-16 bg-gray-200 ml-6"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-indigo-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Participate in Governance?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Connect your wallet to check your governance eligibility and join the council
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={onLogin}
                className="bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Connect Wallet
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-indigo-600 text-indigo-600 hover:bg-indigo-50"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GovernanceInfoPage; 