import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";


const ProductCard = ({ product }) => {
  const discountPercentage = product.discount || 
    (product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0);

  return (
    <div className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <Link href={`/products/${product.slug}`} key={product.slug} className="block relative">
        <div className="h-48 overflow-hidden">
          <img
            src={product.images[0] || product.image}  // or product.thumbnail
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        {product.isNew && (
          <Badge className="absolute top-2 left-2 bg-blue-500">New</Badge>
        )}
        
        {product.isBestSeller && (
          <Badge className="absolute top-2 right-2 bg-yellow-500">Best Seller</Badge>
        )}
        
        {discountPercentage > 0 && (
          <div className="absolute bottom-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {discountPercentage}% OFF
          </div>
        )}
      </Link>
      
      <div className="p-4">
        <Link href={`/product/${product.id}`} className="block">
          <h3 className="font-medium text-gray-900 mb-1 truncate group-hover:text-blue-600">
            {product.name}
          </h3>
          
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, index) => (
                <svg
                  key={index}
                  className={`h-4 w-4 ${
                    index < Math.floor(product.ratings) ? "text-yellow-400" : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              {/* <span className="text-xs text-gray-500 ml-1">({product.ratingCount})</span> */}
            </div>
          </div>
          
          <div className="flex items-center">
            <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="ml-2 text-sm text-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </Link>
        
        <div className="mt-3">
          <Button className="w-full bg-blue-600 hover:bg-blue-700" size="sm">
            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
