'use client'

import { useUser } from '@clerk/nextjs';
import { useEffect } from 'react';
import axios from 'axios';

import BrandsSection from "@/components/root/brands-section";
import FeaturedProducts from "@/components/root/featured-products";
import HeroSection from "@/components/root/hero-section";
import TrendingSection from "@/components/root/trending-section";

export default function RootPage() {
  const { user } = useUser();

  useEffect(() => {
    if (!user) return;

    console.log(user);

    const syncUser = async () => {
      const name = `${user.firstName} ${user.lastName}`;
      const email = user.emailAddresses?.[0]?.emailAddress;
      const phone = user.phoneNumbers?.[0]?.phoneNumber;

      try {
        await axios.post('/api/user-routes/save-user', {
          name,
          email,
          phone
        });
        console.log("User saved successfully");
      } catch (error) {
        console.error("Error saving user:", error.message);
      }
    };

    syncUser();
  }, [user]);




  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <BrandsSection />
      <FeaturedProducts />
      <TrendingSection />
    </div>
  );
}