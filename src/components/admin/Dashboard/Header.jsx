import React from 'react';
import { Search, Bell, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="h-16 flex items-center justify-between px-4 md:px-6 bg-white shadow-md mb-4 rounded-xl">
      <div className="flex items-center flex-1">
        <h1 className="text-lg md:text-xl font-bold text-gray-800 mr-4 md:mr-8 whitespace-nowrap">
          Overview
        </h1>

        {/* Responsive Input */}
        <div className="relative flex-1 hidden md:block max-w-xl">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-[#66D1B7] focus:outline-none text-sm"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      <div className="flex items-center space-x-3 md:space-x-4 ml-4">
        <div className="bg-white border border-gray-200 rounded-lg py-1.5 px-3 text-sm font-medium hidden sm:flex items-center">
          <span className="mr-1">30 May</span>
        </div>

        <Button className="relative p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
          <Bell size={20} color='black'/>
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </Button>

        <Button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
          <MessageSquare size={20} color='black'/>
        </Button>
      </div>
    </header>
  );
};

export default Header;
