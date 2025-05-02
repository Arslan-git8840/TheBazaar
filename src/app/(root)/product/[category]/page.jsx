'use client';
import ProductSection from "@/components/root/product/ProductSection";
import { popularProducts } from "@/data/mockData";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function Page({ params }) {
  const category = params.category;

  const fetchProductsByCategory = async (category) => {
    const { data } = await axios.get("/api/product-by-category", {
      params: { category },
    });
    if (!data.success) throw new Error(data.message);
    return data.products;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: () => fetchProductsByCategory(category),
  });

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products</p>;

  return (
    <div>
      <h1>Category: {category}</h1>
      <ProductSection
        seeAllLink="/popular-products"
        products={data}
      />
    </div>
  );
}
