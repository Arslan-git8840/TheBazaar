'use client'
import React from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);



const TargetItem= ({ label, value, isUp }) => {
  return (
    <div className="flex items-center mb-4 last:mb-0">
      <div className="w-4 h-4 rounded-full mr-3 flex-shrink-0" style={{ backgroundColor: isUp ? '#66D1B7' : '#9CA3AF' }} />
      <div className="flex-grow">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-sm">{label}</span>
          <div className="flex items-center">
            {isUp ? (
              <ArrowUp size={14} className="text-green-500 mr-1" />
            ) : (
              <ArrowDown size={14} className="text-red-500 mr-1" />
            )}
            <span className={`text-sm font-medium ${isUp ? 'text-green-500' : 'text-red-500'}`}>
              {value}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const SalesTarget = () => {
  const data = {
    datasets: [
      {
        data: [67, 33],
        backgroundColor: ['#66D1B7', '#E5E7EB'],
        borderWidth: 0,
        cutout: '80%',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    rotation: -90,
    circumference: 360,
  };
  
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Sales Target</h2>
      
      <div className="flex items-center justify-between">
        <div className="space-y-4">
          <TargetItem label="Daily Target" value="650" isUp={false} />
          <TargetItem label="Monthly Target" value="145,00" isUp={true} />
        </div>
        
        <div className="relative w-32 h-32">
          <Doughnut data={data} options={options} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-bold text-gray-800">67%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesTarget;