'use client';

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const DealsSection = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 10,
    minutes: 30,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num) => {
    return num.toString().padStart(2, "0");
  };

  return (
    <section className="py-8 bg-gradient-to-r from-red-500 to-orange-500 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="mb-6 lg:mb-0 text-center lg:text-left lg:w-1/2">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Flash Deals of the Day!</h2>
            <p className="text-lg mb-6 text-white/90">
              Hurry up and grab the best deals before they're gone!
            </p>
            
            <div className="flex justify-center lg:justify-start mb-6">
              <div className="flex space-x-3">
                <div className="flex flex-col items-center">
                  <div className="bg-white text-red-600 font-bold text-2xl rounded-lg p-3 w-16">
                    {formatNumber(timeLeft.hours)}
                  </div>
                  <span className="text-sm mt-1">Hours</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-white text-red-600 font-bold text-2xl rounded-lg p-3 w-16">
                    {formatNumber(timeLeft.minutes)}
                  </div>
                  <span className="text-sm mt-1">Mins</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-white text-red-600 font-bold text-2xl rounded-lg p-3 w-16">
                    {formatNumber(timeLeft.seconds)}
                  </div>
                  <span className="text-sm mt-1">Secs</span>
                </div>
              </div>
            </div>
            
            <Button className="bg-white text-red-600 hover:bg-gray-100 font-medium px-8 py-6">
              Shop Now
            </Button>
          </div>
          
          <div className="lg:w-1/2">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="bg-white rounded-lg p-3 transform hover:scale-105 transition-transform">
                  <div className="aspect-square bg-gray-100 rounded mb-2"></div>
                  <div className="h-4 bg-gray-100 rounded mb-2"></div>
                  <div className="h-4 w-1/2 bg-gray-100 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DealsSection;