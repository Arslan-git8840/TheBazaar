import Banner from '@/components/root/product/Banner'
import CategorySection from '@/components/root/product/CategorySection'
import DealsSection from '@/components/root/product/DealsSection'
import NewsletterSection from '@/components/root/product/NewsletterSection'
import ProductSection from '@/components/root/product/ProductSection'
import { popularProducts, trendingProducts, saleProducts, recommendedProducts } from "@/data/mockData";
import React from 'react'

function Products() {
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