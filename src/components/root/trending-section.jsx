import React from 'react';

const TrendingSection = () => {
  return (
    <section className="w-full md:py-12 py-6 px-4 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#2D3748] rounded-lg p-8">
          <h2 className="text-3xl text-white font-bold mb-4 flex items-center">
            Trending Fashion 
            <span className="ml-2">🔥</span>
          </h2>
          
          {/* We'll show trending products here */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white rounded-lg overflow-hidden">
                <div className="aspect-[3/4] bg-gray-100 relative">
                  <img 
                    src="/nike.jpg" 
                    alt={`Trending product ${item}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;
