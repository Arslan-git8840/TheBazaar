'use client';
import Banner from '@/components/root/product/Banner'
import CategorySection from '@/components/root/product/CategorySection'
import DealsSection from '@/components/root/product/DealsSection'
import NewsletterSection from '@/components/root/product/NewsletterSection'
import ProductSection from '@/components/root/product/ProductSection'
import React from 'react'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchPopularProducts = async () => {
  try {
    const res = await axios.get("/api/get-popular-products");
    return res?.data?.popularProducts;
  } catch (error) {
    console.log("Fetch popular products error:", error);
    return [];
  }
};

const fetchDiscountedProducts = async () => {
  try {
    const res = await axios.get("/api/get-discounted-products");
    return res?.data?.discountedProducts;
  } catch (error) {
    console.log("Fetch discounted products error:", error);
    return [];
  }
};

const fetchRecommendedProducts = async () => {
  try {
    const res = await axios.get("/api/get-recommended-products");
    return res?.data?.recommendedProducts;
  } catch (error) {
    console.log("Fetch recommended products error:", error);
    return [];
  }
};

const fetchTrendingProducts = async () => {
  try {
    const res = await axios.get("/api/get-trending-products");
    return res?.data?.trendingProducts;
  } catch (error) {
    console.log("Fetch trending products error:", error);
    return [];
  }
};


function Products() {


  const { data: popularProducts = [], isLoading: loadingPopular } = useQuery({
    queryKey: ['popularProducts'],
    queryFn: fetchPopularProducts,
  });

  const { data: trendingProducts = [], isLoading: loadingTrending } = useQuery({
    queryKey: ['trendingProducts'],
    queryFn: fetchTrendingProducts,
  });

  const { data: saleProducts = [], isLoading: loadingDiscounted } = useQuery({
    queryKey: ['discountedProducts'],
    queryFn: fetchDiscountedProducts,
  });

  const { data: recommendedProducts = [], isLoading: loadingRecommended } = useQuery({
    queryKey: ['recommendedProducts'],
    queryFn: fetchRecommendedProducts,
  });
  return (
    <main className="flex-grow">
      <Banner />

      <CategorySection />

      <ProductSection
        title="Popular Products"
        seeAllLink="/popular-products"
        products={popularProducts}
      />

      <DealsSection />

      <ProductSection
        title="Trending Now"
        seeAllLink="/trending-products"
        products={trendingProducts}
        background="bg-gray-50"
      />

      <ProductSection
        title="Hot Deals & Discounts"
        seeAllLink="/sale-products"
        products={saleProducts}
      />

      <ProductSection
        title="Recommended For You"
        products={recommendedProducts}
        background="bg-gray-50"
      />

      <NewsletterSection />
    </main>
  )
}

export default Products