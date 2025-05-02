
import dynamic from "next/dynamic";
import { Suspense } from "react";

const ProductClientPage = dynamic(() => import("@/components/root/product/ProductList"), {
  
});

export default function ProductPage() {
  return (
    <Suspense fallback={<p>Loading search page...</p>}>
      <ProductClientPage />
    </Suspense>
  );
}
// agar kuch error hua to productlist root/pproduct se copy krke yaha paste krdenge bs
