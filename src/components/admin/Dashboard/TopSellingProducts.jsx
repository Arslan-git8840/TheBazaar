import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';


const products = [
  {
    id: 1,
    name: "Air Jordan 8",
    quantity: "752 Pcs",
    image: "https://images.pexels.com/photos/2385477/pexels-photo-2385477.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: 2,
    name: "Air Jordan 5",
    quantity: "752 Pcs",
    image: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: 3,
    name: "Air Jordan 13",
    quantity: "752 Pcs",
    image: "https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: 4,
    name: "Nike Air Max",
    quantity: "752 Pcs",
    image: "https://images.pexels.com/photos/2759783/pexels-photo-2759783.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: 5,
    name: "Nike Blazer",
    quantity: "752 Pcs",
    image: "https://images.pexels.com/photos/1240892/pexels-photo-1240892.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  }
];

const TopSellingProducts = () => {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Top Selling Products</h2>
        <div className="flex space-x-2">
          <button className="p-1 rounded-full hover:bg-gray-100 transition-colors">
            <ChevronLeft size={20} />
          </button>
          <button className="p-1 rounded-full hover:bg-gray-100 transition-colors">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      
      <div className="flex space-x-4 overflow-x-auto pb-2 hide-scrollbar">
        {products.map((product) => (
          <div key={product.id} className="min-w-[120px] flex-shrink-0">
            <div className="bg-gray-100 rounded-lg overflow-hidden h-24 mb-2">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-sm font-medium text-gray-800 truncate">{product.name}</h3>
            <p className="text-xs text-gray-500">{product.quantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSellingProducts;