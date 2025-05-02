'use client'
import { useState } from "react";
import { Trash, Plus, Minus } from "lucide-react"; // Import Lucide icons

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Ryobi ONE drill/driver",
      price: 409.0,
      quantity: 1,
      image: "/nike.jpg",
    },
    {
      id: 2,
      name: "Socket System Electric",
      price: 238.0,
      quantity: 1,
      image: "/nike.jpg",
    },
  ]);

  const handleIncrement = (itemId) => {
    const updatedItems = cartItems.map((item) =>
      item.id === itemId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCartItems(updatedItems);
  };

  const handleDecrement = (itemId) => {
    const updatedItems = cartItems.map((item) =>
      item.id === itemId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedItems);
  };

  const handleDelete = (itemId) => {
    const updatedItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedItems);
  };

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

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
              <tr
                key={item.id}
                className="border-b transition-colors hover:bg-muted/50"
              >
                <td className="p-4 flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded-md"
                  />
                  <span>{item.name}</span>
                </td>
                <td className="p-4">${item.price.toFixed(2)}</td>
                <td className="p-4 flex items-center space-x-2">
                  <button
                    onClick={() => handleDecrement(item.id)}
                    className="p-2 bg-gray-200 rounded-md transition-all hover:bg-gray-300"
                  >
                    <Minus size={16} />
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => handleIncrement(item.id)}
                    className="p-2 bg-gray-200 rounded-md transition-all hover:bg-gray-300"
                  >
                    <Plus size={16} />
                  </button>
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => handleDelete(item.id)}
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
        <button
          className="bg-blue-500 text-white py-2 px-6 rounded-md transition-all hover:bg-blue-600"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
