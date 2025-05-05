'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Search, Menu, X } from 'lucide-react';
import { Urbanist } from 'next/font/google';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { useEContext } from '@/context/context';

const font = Urbanist({ weight: ['400', '500'], subsets: ['latin'] });

const Navbar = () => {
  const { user } = useUser();
  const [userId, setUserId] = useState(null);
  const { noOfCartItems, setNoOfCartItems } = useEContext();
  useEffect(() => {
    const dbUser = async () => {
      if (!user) return;
      const email = user?.emailAddresses[0]?.emailAddress;
      try {
        const dbRes = await axios.get("/api/user-routes/get-user-by-email", {
          params: { email },
        });
        const _id = dbRes?.data?.user?._id;
        console.log(_id);
        setUserId(_id);
        const res = await axios.get("/api/get-cart-items", {
          params: { userId: _id },
        });
        const items = res.data.cartItems;
        console.log(items.length);
        setNoOfCartItems(items.length);
      } catch (error) {
        console.log("Fetch userId error:", error);
      }
    };
    if (user) {
      dbUser();
    }
  }, [user])

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const router = useRouter()

  const handleSearch = () => {
    router.push(`/product?q=${searchValue}`)
  }

  return (
    <nav className={`bg-white py-4 md:py-6 px-4 md:px-12 ${font.className}`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
        <div className="flex items-center">
          <Link href="/" className="mr-8">
            <img src="/icons/bazaar-logo.png" alt="Bazaar logo" className="w-36 min-w-[110px]" />
          </Link>


          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center lg:space-x-8 space-x-4">
            <Link href="/" className="text-[#2D3748] font-medium">Home</Link>
            <Link href="/orders" className="text-[#2D3748] font-medium">Orders</Link>
            <Link href="/products" className="text-[#2D3748] font-medium">Products</Link>
          </div>
        </div>

        {/* Search and Cart */}
        <div className="flex items-center space-x-4">
          {/* Desktop Search */}
          <div className="hidden md:flex items-center relative">
            <input
              type="text"
              placeholder="Search more products"
              className="lg:w-96 md:w-72 sm:w-60 w-36 px-4 py-2 pr-10 bg-gray-100 rounded-full focus:outline-none"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <Search className="absolute right-3 text-gray-500 w-5 h-5" onClick={handleSearch} />
          </div>

          {/* Cart */}
          <Link href={`/cart/${userId}`} className="relative">
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
              <ShoppingCart className="text-white w-5 h-5" />
            </div>
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
              {noOfCartItems}
            </span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white p-5 pt-20 md:hidden">
          <button
            className="absolute top-5 right-5"
            onClick={() => setIsMenuOpen(false)}
          >
            <X />
          </button>

          <div className="flex flex-col space-y-5">
            <Link href="/" className="text-[#2D3748] text-xl font-medium" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link href="/orders" className="text-[#2D3748] text-xl font-medium" onClick={() => setIsMenuOpen(false)}>Orders</Link>
            <Link href="/products" className="text-[#2D3748] text-xl font-medium" onClick={() => setIsMenuOpen(false)}>Products</Link>

            {/* Mobile Search */}
            <div className="mt-5 relative">
              <input
                type="text"
                placeholder="Search more products"
                className="w-full px-4 py-2 pr-10 bg-gray-100 rounded-full focus:outline-none"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <Search className="absolute right-3 text-gray-500 w-5 h-5" />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
