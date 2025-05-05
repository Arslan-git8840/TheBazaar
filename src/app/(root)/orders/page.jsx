'use client'
import { useEffect, useState } from "react";
import { OrderList } from "@/components/root/OrderList";
// import { orders } from "@/data/order";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";
import axios from "axios";

const fetchOrder = async (userId) => {
  try {
    const res = await axios.get("/api/order/get-orders", {
      params: { userId },
    });
    return res.data.orders;
  } catch (error) {
    console.log("Fetch orders error:", error);
    return [];
  }
};

export default function MyOrdersPage() {
  const { user, isLoaded } = useUser();
  const [userId, setUserId] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const getUserId = async () => {
      if (!isLoaded || !user) return;
      const email = user?.emailAddresses[0]?.emailAddress;
      try {
        const dbUser = await axios.get("/api/user-routes/get-user-by-email", {
          params: { email },
        });
        const _id = dbUser?.data?.user?._id;
        setUserId(_id);
      } catch (error) {
        console.log("Fetch userId error:", error);
      }
    };

    getUserId();
  }, [user, isLoaded]);


  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["orderss"],
    queryFn: () => fetchOrder(userId),
    enabled: !!userId,
  });

  useEffect(() => {
    if (orders.length > 0 && !selectedOrder) {
      setSelectedOrder(orders[0]);
    }
  }, [orders]);

  const handleSelectOrder = (order) => {
    setSelectedOrder(order);
  };


  return (
    <div className="container mx-auto py-6 sm:px-8 px-3">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">My Orders</h1>
      </div>

      {isLoading ? (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-green-500"></div>
      </div>
    ) : (
      <OrderList
        orders={orders}
        selectedOrder={selectedOrder}
        onSelectOrder={handleSelectOrder}
      />
    )}
    </div>
  );
}
