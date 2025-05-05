import React from 'react';

const FeaturedProducts = () => {
  return (
    <section className="w-full py-0 px-4 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Left column promos */}
          <div className="grid grid-cols-1 gap-6">

            {/* Tank Tops Promo */}
            <div className="bg-[#E9D8FD] p-6 rounded-lg flex items-center justify-between relative overflow-hidden">
              <div className="z-10">
                <h2 className="text-2xl md:text-3xl font-bold text-[#2D3748]">
                  20% Off On<br />Tank tops
                </h2>
                <p className="text-gray-600 mt-2 mb-4">Lorem ipsum dolor</p>
                <button className="bg-white text-[#2D3748] px-5 py-2 rounded shadow-sm text-sm font-medium">
                  Get Now
                </button>
              </div>
              <div className="absolute right-0 top-0 h-full">
                <img 
                  src="/nike.jpg" 
                  alt="Tank Tops" 
                  className="h-full object-cover"
                />
              </div>
            </div>

            {/* Eyewear Promo */}
            <div className="bg-[#E9D8FD] p-6 rounded-lg flex items-center justify-between relative overflow-hidden">
              <div className="z-10">
                <h2 className="text-2xl md:text-3xl font-bold text-[#2D3748]">
                  Latest Shoes<br />For You
                </h2>
                <p className="text-gray-600 mt-2 mb-4">Lorem ipsum dolor</p>
                <button className="bg-white text-[#2D3748] px-5 py-2 rounded shadow-sm text-sm font-medium">
                  Find More
                </button>
              </div>
              <div className="absolute right-0 top-0 h-full">
                <img 
                  src="/nike.jpg" 
                  alt="Eyewear Promo" 
                  className="h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Main Promo Right */}
          <div className="bg-[#FEAC5E] p-6 rounded-lg flex flex-col justify-between h-full">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2D3748]">
                Let's Lorem<br />Suit Up!
              </h2>
              <p className="text-gray-700 mt-2">Lorem ipsum dolor</p>
            </div>
            <div className="flex justify-between items-end">
              <button className="bg-white text-[#2D3748] px-5 py-2 rounded shadow-sm text-sm font-medium">
                Find More
              </button>
              <img 
                src="/nike.jpg" 
                alt="Main Promo" 
                className="h-64 object-contain"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
