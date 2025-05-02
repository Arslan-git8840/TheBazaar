import React from 'react';

const Offer = ({ title, expiresOn, backgroundColor = 'bg-gray-100' }) => {
  return (
    <div className={`${backgroundColor} rounded-lg p-4 mb-3 last:mb-0 transition-transform hover:scale-[1.01] duration-300`}>
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-gray-800">{title}</h3>
        <p className="text-xs text-gray-500">Expire on: {expiresOn}</p>
      </div>
    </div>
  );
};

const CurrentOffer = () => {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Current Offer</h2>
      
      <Offer 
        title="40% Discount Offer" 
        expiresOn="05-08"
        backgroundColor="bg-amber-50"
      />
      <Offer 
        title="100 Taka Cupon" 
        expiresOn="15-08"
        backgroundColor="bg-blue-50"
      />
      
      <div className="flex justify-between items-center bg-gray-100 rounded-lg p-4">
        <h3 className="font-medium text-gray-800">Stock Out Sell</h3>
        <p className="text-xs text-green-600 font-medium">Upcoming on: 19-08</p>
      </div>
      
      <button 
        className="w-full mt-4 py-2.5 rounded-lg text-white font-medium transition-colors duration-300"
        style={{ backgroundColor: '#66D1B7' }}
      >
        View All Offers
      </button>
    </div>
  );
};

export default CurrentOffer;