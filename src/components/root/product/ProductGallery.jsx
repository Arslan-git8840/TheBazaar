'use client';
import { useState } from "react";
import { cn } from "@/lib/utils";



const ProductGallery = ({ images, productName }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="flex flex-col">
      <div className="relative bg-gray-50 rounded-lg overflow-hidden mb-4 aspect-square">
        <img
          src={images[selectedImage]}
          alt={`${productName} - Image ${selectedImage + 1}`}
          className="object-contain w-full h-full p-2"
        />
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        {images.slice(0, 4).map((image, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setSelectedImage(index)}
            className={cn(
              "border rounded-md overflow-hidden aspect-square bg-gray-50",
              index === selectedImage ? "ring-2 ring-green-500" : "hover:border-gray-400"
            )}
          >
            <img
              src={image}
              alt={`${productName} - Thumbnail ${index + 1}`}
              className="object-contain w-full h-full p-1"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
