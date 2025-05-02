'use client';
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const bannerImages = [
  {
    id: 1,
    imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    alt: "Tech Sale Banner",
    title: "HUGE TECH SALE",
    description: "Up to 40% off on premium electronics"
  },
  {
    id: 2,
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    alt: "New Arrivals Banner",
    title: "NEW ARRIVALS",
    description: "Check out the latest tech gadgets"
  },
  {
    id: 3,
    imageUrl: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    alt: "Limited Time Offer",
    title: "LIMITED TIME OFFER",
    description: "Flash deals on popular items"
  }
];

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerImages.length) % bannerImages.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden">
      <div 
        className="flex h-full transition-transform duration-500 ease-out" 
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {bannerImages.map((banner) => (
          <div key={banner.id} className="min-w-full h-full relative">
            <img
              src={banner.imageUrl}
              alt={banner.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center text-white">
              <h2 className="text-3xl md:text-5xl font-bold mb-2">{banner.title}</h2>
              <p className="text-lg md:text-xl">{banner.description}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-all"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {bannerImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${
              currentSlide === index ? "bg-white" : "bg-white bg-opacity-50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;