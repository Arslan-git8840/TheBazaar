'use client'
import { useState } from "react";
import { OrderList } from "@/components/root/OrderList";
import { orders } from "@/data/order";

export default function MyOrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState(orders[0]);

  const handleSelectOrder = (order) => {
    setSelectedOrder(order);
  };

  return (
    <div className="container mx-auto py-6 sm:px-8 px-3">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">My Orders</h1>
      </div>

      <OrderList 
        orders={orders}
        selectedOrder={selectedOrder}
        onSelectOrder={handleSelectOrder}
      />
    </div>
  );
}
