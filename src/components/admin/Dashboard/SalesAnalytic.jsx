'use client'
import React from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);



const FinancialItem= ({ 
  label, 
  value, 
  percentChange, 
  changeType 
}) => {
  const isPositive = changeType === 'positive';
  const arrowIcon = isPositive ? <ArrowUp size={14} /> : <ArrowDown size={14} />;
  const textColor = isPositive ? 'text-green-500' : 'text-red-500';
  
  return (
    <div className="flex-1">
      <p className="text-gray-500 text-sm mb-1">{label}</p>
      <h3 className="text-xl font-bold mb-1">{value}</h3>
      <div className={`inline-flex items-center ${textColor} text-xs font-medium px-2 py-1 rounded-full`}
           style={{ backgroundColor: isPositive ? 'rgba(52, 211, 153, 0.1)' : 'rgba(239, 68, 68, 0.1)' }}>
        {arrowIcon}
        <span className="ml-1">+{percentChange}%</span>
      </div>
    </div>
  );
};

const SalesAnalytic = () => {
  const data = {
    labels: ['22 July', '23 July', '24 July', '25 July', '26 July', '27 July', '28 July', '29 July'],
    datasets: [
      {
        fill: true,
        label: 'Sales',
        data: [65, 59, 80, 81, 56, 55, 40, 70],
        borderColor: '#66D1B7',
        backgroundColor: 'rgba(102, 209, 183, 0.1)',
        tension: 0.4,
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
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#f0f0f0',
        },
        ticks: {
          callback: (value) => `${value}%`,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Sales Analytic</h2>
        <div className="relative">
          <select 
            className="appearance-none bg-gray-100 text-gray-700 py-2 px-4 pr-8 rounded-lg focus:outline-none text-sm"
            defaultValue="Jul 2023"
          >
            <option>Jul 2023</option>
            <option>Jun 2023</option>
            <option>May 2023</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
            </svg>
          </div>
        </div>
      </div>

      <div className="flex gap-6 mb-8">
        <FinancialItem 
          label="Income" 
          value="23,262.00" 
          percentChange={20} 
          changeType="positive" 
        />
        <FinancialItem 
          label="Expenses" 
          value="11,135.00" 
          percentChange={10} 
          changeType="positive" 
        />
        <FinancialItem 
          label="Balance" 
          value="48,135.00" 
          percentChange={20} 
          changeType="positive" 
        />
      </div>

      <div className="h-48 w-full">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default SalesAnalytic;