import React from 'react';
import { Button } from '../ui/button';


const HeroSection = () => {
  return (
    <section className="w-full py-8 md:py-16 px-4 md:px-12 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center">
        {/* Left Content */}
        <div className="w-full lg:w-1/2 mb-10 lg:mb-0 pr-0 lg:pr-8">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2D3748] mb-4 leading-tight">
            Best Place For <br />
            Buy <span className="text-[#FF6B6B]">Amazing</span> <br />
            Products
          </h1>
          <p className="text-gray-600 mb-8 max-w-lg">
            Contrary to Popular Belief, Lorem Ipsum is not Simply Random Text. It has Roots in a Piece of Classical Latin Literature
          </p>
          <div className="flex flex-wrap gap-4">
            <Button className="bg-[#2D3748] text-white px-6 py-3 rounded font-medium">
              Learn More
            </Button>
            <Button className="border border-gray-300 text-[#2D3748] px-6 py-3 rounded font-medium flex items-center bg-white hover:bg-transparent">
              <span className="mr-2">How It Work</span>
              <div className="w-4 h-4 rounded-full border-2 border-[#2D3748] flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-[#2D3748]"></div>
              </div>
            </Button>
          </div>
        </div>

        {/* Right Images and Boxes */}
        <div className="w-full lg:w-1/2 relative h-[450px]">
          {/* Yellow circle with image */}
          <div className="bg-[#FCD34D] rounded-full w-72 h-72 absolute top-0 right-0 overflow-hidden">
            <img 
              src="/demo-1.png" 
              alt="Woman shopping" 
              className="object-contain object-center w-full h-full"
            />
          </div>

          {/* Green circle with image */}
          <div className="bg-[#34D399] rounded-full w-72 h-72 absolute -bottom-10 -right-20 overflow-hidden">
            <img 
              src="/demo-1.png" 
              alt="Boy on scooter" 
              className="object-contain object-center w-full h-full"
            />
          </div>

          {/* Stats Box */}
          <div className="absolute top-0 left-16 bg-white shadow-md rounded-lg p-4 z-10">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#34D399] rounded-full"></div>
              <p className="text-xs text-gray-500">YOY Growth</p>
            </div>
            <p className="text-2xl font-bold text-[#2D3748]">24576</p>
          </div>

          {/* Price Box */}
          <div className="absolute bottom-0 left-0 bg-white shadow-md rounded-lg p-4 z-10">
            <p className="text-xs text-gray-500">Total Value</p>
            <p className="text-2xl font-bold text-[#2D3748]">$5,99620</p>
            <button className="bg-[#2D3748] text-white text-xs px-4 py-1 rounded mt-2">
              View
            </button>
          </div>

          {/* Orange tag */}
          <div className="absolute bottom-20 right-0 bg-[#FEBB63] p-2 rounded-lg z-10 shadow-md">
            <div className="w-6 h-6 bg-white rounded-md"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
