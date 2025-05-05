'use client';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEContext } from "@/context/context";
// import { useToast } from "@/hooks/use-toast";


const ProductInfo = ({ product }) => {

  const { cartsItems, setCartsItems } = useEContext();
  const { user } = useUser();
  const router = useRouter();
  console.log(user);
  const email = user.emailAddresses[0]?.emailAddress;

  //   const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  // const [selectedColor, setSelectedColor] = useState(product.colors[0]);

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < product?.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleAddToCart = async () => {
    try {
      const res = await axios.get('/api/user-routes/get-user-by-email', {
        params: { email }
      })

      const userId = res?.data?.user?._id;
      const cartItem = await axios.post('/api/add-to-cart', {
        userId, productId: product._id, quantity
      })
      if (cartItem) router.push(`/cart/${userId}`)
    } catch (error) {
      console.log('')
    }

    // toast({
    //   title: "Added to cart",
    //   description: `${quantity} x ${product.name} (${selectedColor.name})`,
    // });
  };

  const handleBuyNow = () => {

    const productDetails = [{
      productId: product._id,
      quantity,
      price: product.price,
      totalPrice: product.price * quantity,
      thumbnail: product.thumbnail,
      name: product.name  
    }];

    setCartsItems(productDetails);
    console.log(cartsItems);

    // toast({
    //   title: "Proceeding to checkout",
    //   description: `Preparing ${quantity} x ${product.name} for purchase`,
    // });
  };

  // Stars rendering helper
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className="text-green-500 text-lg">★</span>
      );
    }
    return stars;
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-3xl font-bold mb-2">{product?.name}</h1>
        <p className="text-gray-600">{product?.description}</p>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex">
          {renderStars()}
        </div>
        <span className="text-gray-500">({product?.numReviews})</span>
      </div>

      <div className="pt-4">
        <div className="flex items-baseline gap-2">
          <div className="text-2xl font-bold">${product?.price.toFixed(2)}</div>
          {/* {product.monthlyPrice && (
            <div className="text-lg">or {product?.monthlyPrice.toFixed(2)}/month</div>
          )} */}
        </div>

        {/* {product.financing && (
          <p className="text-sm text-gray-600 mt-1">{product?.financing}</p>
        )} */}
      </div>

      {/* <div className="pt-4">
        <h3 className="text-lg font-medium mb-4">Choose a Color</h3>
        <div className="flex flex-wrap gap-3">
          {product.colors.map((color) => (
            <button
              key={color.name}
              type="button"
              onClick={() => setSelectedColor(color)}
              className={`w-10 h-10 rounded-full ${selectedColor.name === color.name
                ? "ring-2 ring-offset-2 ring-primary"
                : ""
                }`}
              style={{ backgroundColor: color.value }}
              title={color.name}
            />
          ))}
        </div>
      </div> */}

      <div className="flex items-center gap-4 pt-4">
        <div className="flex items-center border rounded-md">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDecrement}
            disabled={quantity <= 1}
            className="h-10 w-10 rounded-l-md"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-10 text-center">{quantity}</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleIncrement}
            disabled={quantity >= product?.stock}
            className="h-10 w-10 rounded-r-md"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {product?.stock <= 20 && (
          <div className="text-sm">
            Only <span className="text-orange-500 font-medium">{product?.stock} items</span> Left!<br />
            Don't miss it
          </div>
        )}
      </div>

      <div className="flex gap-4 pt-4">
        <Link href={'/checkout'}>
          <Button
            className="bg-green-800 hover:bg-green-900 text-white flex-1 py-6"
            onClick={handleBuyNow}
          >
            Buy Now
          </Button>
        </Link>
        <Button
          variant="outline"
          className="flex-1 py-6 border-gray-300"
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>

      </div>

      <div className="border-t pt-6 space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 flex items-center justify-center bg-amber-100 text-amber-800 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
              <polyline points="16 6 12 2 8 6"></polyline>
              <line x1="12" y1="2" x2="12" y2="15"></line>
            </svg>
          </div>
          <div>
            <div className="font-medium">Free Delivery</div>
            <div className="text-sm text-blue-600 underline cursor-pointer">
              Enter your Postal code for Delivery Availability
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-6 h-6 flex items-center justify-center bg-amber-100 text-amber-800 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10H3"></path>
              <path d="M21 6H3"></path>
              <path d="M21 14H3"></path>
              <path d="M21 18H3"></path>
            </svg>
          </div>
          <div>
            <div className="font-medium">Return Delivery</div>
            <div className="text-sm text-gray-600">
              Free 30days Delivery Returns. <span className="text-blue-600 cursor-pointer">Details</span>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default ProductInfo;