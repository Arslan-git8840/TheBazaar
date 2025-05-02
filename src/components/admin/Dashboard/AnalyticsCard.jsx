import React from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';



const AnalyticsCard = ({ 
  title, 
  value, 
  period, 
  percentChange, 
  icon 
}) => {
  const isPositive = percentChange >= 0;
  
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
          <p className="text-gray-400 text-xs mb-3">{period}</p>
          <h2 className="text-3xl font-bold text-gray-800">{value}</h2>
        </div>
        <div className="p-3 rounded-full bg-opacity-10 mt-1" style={{ backgroundColor: 'rgba(102, 209, 183, 0.2)' }}>
          {icon}
        </div>
      </div>
      
      {percentChange !== 0 && (
        <div className="flex items-center mt-4">
          <div className={`flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {isPositive ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
            <span className="ml-1 text-sm font-medium">{Math.abs(percentChange)}%</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsCard;