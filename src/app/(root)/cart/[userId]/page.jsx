'use client';
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Trash, Plus, Minus } from "lucide-react";
import axios from "axios";
import { useQuery } from '@tanstack/react-query';
import { useParams } from "next/navigation";
import { useEContext } from "@/context/context";
import Link from 'next/link';

const getCartItems = async (userId) => {
  const res = await axios.get("/api/get-cart-items", {
    params: { userId },
  });
  return res.data.cartItems;
};

export default function CartPage() {
  const { cartsItems, setCartsItems, setNoOfCartItems } = useEContext();
  const params = useParams();
  const userId = params.userId;

  const { data: fetchedCartItems = [], isLoading } = useQuery({
    queryKey: ['cart-items', userId],
    queryFn: () => getCartItems(userId),
    enabled: !!userId,
  });

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setCartItems(fetchedCartItems);
    setNoOfCartItems(fetchedCartItems.length);
  }, [fetchedCartItems]);

  const handleIncrement = (itemId) => {
    const updatedItems = cartItems.map((item) =>
      item._id === itemId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCartItems(updatedItems);
  };

  const handleDecrement = (itemId) => {
    const updatedItems = cartItems.map((item) =>
      item._id === itemId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedItems);
  };

  const handleDelete = async (itemId) => {
    const updatedItems = cartItems.filter((item) => item._id !== itemId);
    setCartItems(updatedItems);

    await axios.post("/api/delete-cart-item", {
      userId,
      productId: itemId,
    });
  };

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + (item.product.price * item.quantity),
    0
  );



  // const checkout = async () => {
  //   const cleanedCart = cartItems.map(item => ({
  //     productId: item.product._id,
  //     quantity: item.quantity,
  //     price: item.product.price,
  //     totalPrice: item.product.price * item.quantity
  //   }));

  //   setCartsItems(cleanedCart);
  //   console.log('cartsItems', cleanedCart);

  // };

  const checkout = async () => {

    const cleanedCart = cartItems.map(item => ({
      productId: item.product._id,
      quantity: item.quantity,
      price: item.product.price,
      totalPrice: item.product.price * item.quantity,
      _id: item._id,
      thumbnail: item.product.thumbnail,
      name: item.product.name
    }));

    setCartsItems(cleanedCart);
    setNoOfCartItems(0);
    try {
      await Promise.all(
        cleanedCart.map(async (item) => {
          try {

            await axios.post('/api/delete-cart-item', {
              userId,
              productId: item._id,
            });
            console.log(`Successfully deleted product ${item.productId}`);
          } catch (error) {
            console.error(`Error deleting product ${item.productId}:`, error);
          }
        })
      );

      console.log('Cart cleaned up and items deleted successfully');
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };



  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-green-500"></div>
    </div>
    );
  }

  return (
    <div className="container mx-auto py-6 sm:px-8 px-3">
      <h1 className="text-3xl font-bold tracking-tight mb-6">My Cart</h1>
      <div className="overflow-auto rounded-md shadow-lg border">
        <table className="w-full caption-bottom text-sm">
          <thead className="[&_tr]:border-b">
            <tr className="border-b transition-colors hover:bg-muted/50">
              <th className="h-12 px-4 text-left align-middle font-medium">Item</th>
              <th className="h-12 px-4 text-left align-middle font-medium">Price</th>
              <th className="h-12 px-4 text-left align-middle font-medium">Quantity</th>
              <th className="h-12 px-4 text-left align-middle font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item._id} className="border-b transition-colors hover:bg-muted/50">
                <td className="p-4 flex items-center space-x-4">
                  <img
                    src={item.product.thumbnail}
                    alt={item.product.name}
                    className="w-12 h-12 object-cover rounded-md"
                  />
                  <span>{item.product.name}</span>
                </td>
                <td className="p-4">${(item.product.price * item.quantity).toFixed(2)}</td>

                <td className="p-4 flex items-center space-x-2">
                  <button
                    onClick={() => handleDecrement(item._id)}
                    className="p-2 bg-gray-200 rounded-md transition-all hover:bg-gray-300"
                  >
                    <Minus size={16} />
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => handleIncrement(item._id)}
                    className="p-2 bg-gray-200 rounded-md transition-all hover:bg-gray-300"
                  >
                    <Plus size={16} />
                  </button>
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-red-500 transition-all hover:text-red-600"
                  >
                    <Trash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <span className="font-semibold text-lg">Total:</span>
        <span className="font-semibold text-lg">${totalAmount.toFixed(2)}</span>
      </div>
      <div className="mt-4 flex justify-end">
        <Link href={'/checkout'}>
          <Button className="bg-blue-500 text-white py-2 px-6 rounded-md transition-all hover:bg-blue-600" onClick={checkout}>
            Checkout
          </Button>
        </Link>
      </div>
    </div>
  );
}
