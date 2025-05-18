import React from 'react';
import { Clock, Building2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { formatCurrency } from '../../utils/formatters';

const PortfolioDashboard: React.FC = () => {
  const { portfolio } = useAuth();

  if (!portfolio) return null;

  const StatCard = ({ 
    title, 
    value, 
    subtext, 
    icon, 
    iconColor 
  }: { 
    title: string; 
    value: string; 
    subtext: string; 
    icon: React.ReactNode; 
    iconColor: string;
  }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-sm text-gray-500 mb-1">{title}</h3>
          <div className="text-2xl font-bold text-gray-900">{value}</div>
          <div className="text-sm text-gray-500 mt-1">{subtext}</div>
        </div>
        <div className={`p-2 rounded-lg ${iconColor}`}>
          {icon}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 px-4 py-8">
      <div className="container mx-auto">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Portfolio Overview</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <StatCard
            title="Portfolio Value"
            value={formatCurrency(portfolio.totalValue)}
            subtext={`↑ 16.5% this month`}
            icon={<Clock className="h-6 w-6 text-white" />}
            iconColor="bg-indigo-500"
          />
          <StatCard
            title="Active Projects"
            value={portfolio.totalInvestments.toString()}
            subtext={`${portfolio.totalInvestments} properties`}
            icon={<Building2 className="h-6 w-6 text-white" />}
            iconColor="bg-pink-500"
          />
        </div>

        {/* Asset Allocation Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Asset Allocation</h3>
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Pie Chart */}
            <div className="relative w-48 h-48">
              <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
                {portfolio.allocation.reduce((acc, item, index) => {
                  const previousTotal = acc.total;
                  const percentage = item.percentage;
                  const total = previousTotal + percentage;
                  
                  const colors = [
                    'rgb(99, 102, 241)', // indigo-500
                    'rgb(168, 85, 247)', // purple-500
                    'rgb(236, 72, 153)', // pink-500
                  ];

                  // Calculate the SVG arc path
                  const radius = 50;
                  const centerX = 50;
                  const centerY = 50;
                  
                  const startAngle = (previousTotal / 100) * Math.PI * 2 - Math.PI / 2;
                  const endAngle = (total / 100) * Math.PI * 2 - Math.PI / 2;
                  
                  const startX = centerX + radius * Math.cos(startAngle);
                  const startY = centerY + radius * Math.sin(startAngle);
                  const endX = centerX + radius * Math.cos(endAngle);
                  const endY = centerY + radius * Math.sin(endAngle);
                  
                  const largeArcFlag = percentage > 50 ? 1 : 0;
                  
                  const pathData = [
                    `M ${centerX} ${centerY}`,
                    `L ${startX} ${startY}`,
                    `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`,
                    'Z'
                  ].join(' ');

                  acc.paths.push(
                    <path
                      key={item.category}
                      d={pathData}
                      fill={colors[index]}
                      className="transition-all duration-300 hover:opacity-80"
                    />
                  );

                  acc.total = total;
                  return acc;
                }, { paths: [], total: 0 } as { paths: JSX.Element[], total: number }).paths}
              </svg>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-1 gap-4">
              {portfolio.allocation.map((item, index) => (
                <div key={item.category} className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full ${
                    index === 0 ? 'bg-indigo-500' :
                    index === 1 ? 'bg-purple-500' :
                    'bg-pink-500'
                  }`} />
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {item.category}
                    </div>
                    <div className="text-sm text-gray-500">
                      {formatCurrency(item.value)} ({item.percentage}%)
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioDashboard;
