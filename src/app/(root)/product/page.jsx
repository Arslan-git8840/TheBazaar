// 'use client';

// import ProductSection from "@/components/root/product/ProductSection";
// import { useSearchParams } from 'next/navigation';
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { Suspense } from "react";

// const fetchProductsBySearch = async (query) => {
//   if (!query) return [];
//   const { data } = await axios.get("/api/product-search", {
//     params: { q: query },
//   });
//   if (!data.success) throw new Error(data.message);
//   return data.products;
// };

// function ProductClientPage() {
//   const searchParams = useSearchParams();
//   const searchQuery = searchParams.get('q');

//   const { data, isLoading, error } = useQuery({
//     queryKey: ["search-products", searchQuery],
//     queryFn: () => fetchProductsBySearch(searchQuery),
//     enabled: !!searchQuery, 
//   });

//   if (!searchQuery) return <p>Please enter a search term.</p>;
//   if (isLoading) return <p>Loading search results...</p>;
//   if (error) return <p>Error fetching search results.</p>;

//   return (
//     <div>
//       <h1>Search Result for: {searchQuery}</h1>
//       <ProductSection seeAllLink="/popular-products" products={data} />
//     </div>
//   );
// }

// export default function Page() {
//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <ProductClientPage />
//     </Suspense>
//   );
// }


'use client';

import ProductSection from "@/components/root/product/ProductSection";
import { useSearchParams } from 'next/navigation';
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function ProductClientPage() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q');

  // const searchQuery = 'bacca';
  const fetchProductsBySearch = async (query) => {
    if (!query) return [];
    const { data } = await axios.get("/api/product-search", {
      params: { q: query },
    });
    if (!data.success) throw new Error(data.message);
    return data.products;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["search-products", searchQuery],
    queryFn: () => fetchProductsBySearch(searchQuery),
    enabled: !!searchQuery,
  });

  if (!searchQuery) return <p>Please enter a search term.</p>;
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-green-500"></div>
      </div>
    );
  }
  if (error) return <p>Error fetching search results.</p>;

  return (<div> <h1 className="pl-8">Search Result for: {searchQuery}</h1> <ProductSection seeAllLink="/popular-products" products={data} /> </div>
  );
}
