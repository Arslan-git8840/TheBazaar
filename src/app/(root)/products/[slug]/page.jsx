"use client";
import { useRouter } from "next/navigation";

import ProductGallery from "@/components/root/product/ProductGallery";
import ProductInfo from "@/components/root/product/ProductInfo";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ProductSection from "@/components/root/product/ProductSection";


const fetchProductBySlug = async (slug) => {
  const res = await axios.get("/api/product-by-slug", {
    params: { slug },
  });
  return res.data.product;
};

const fetchProductsByCategory = async (category) => {
  const res = await axios.get("/api/product-by-category", {
    params: { category },
  });
  return res.data.products;
};

const ProductDetail = ({ params }) => {
  const { slug } = params;
  const router = useRouter();

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["product"],
    queryFn: () => fetchProductBySlug(slug),
    enabled: !!slug,
  });

  const {
    data: relatedProducts,
    isLoading: loadingRelated,
    isError: errorRelated,
  } = useQuery({
    queryKey: ["related-products"],
    queryFn: () => fetchProductsByCategory(data.category),
    enabled: !!data?.category,
  });


  if (isLoading)
    return <p className="text-center py-10 text-gray-500">Loading product...</p>;

  if (isError)
    return (
      <p className="text-center py-10 text-red-600">
        Error: {error?.response?.data?.message || error.message}
      </p>
    );

  return (
    <div className="bg-white min-h-screen flex flex-col">

      <main className="flex-1 bg-white">
        <div className="container mx-auto px-4 py-4 md:py-6">
          {/* <Breadcrumb items={breadcrumbItems} className="mb-6" /> */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <ProductGallery images={data.images} productName={data.name} />
            <ProductInfo product={data} />
          </div>
        </div>

          <ProductSection products={relatedProducts} seeAllLink={"/popular-products"} title={"Related Products"} />
        
      </main>
    </div>
  );
};

export default ProductDetail;
