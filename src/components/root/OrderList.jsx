import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function OrderList({ orders, selectedOrder, onSelectOrder }) {
  return (
    <div className="rounded-md border">
      <div className="relative w-full overflow-auto">
        <table className="w-full caption-bottom text-sm">
          <thead className="[&_tr]:border-b">
            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
              <th className="h-12 px-4 text-left align-middle font-medium"></th>
              <th className="h-12 px-4 text-left align-middle font-medium">Order</th>
              <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
              <th className="h-12 px-4 text-left align-middle font-medium">Total</th>
              <th className="h-12 px-4 text-left align-middle font-medium">Date</th>
              <th className="h-12 px-4 text-left align-middle font-medium"></th>
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {orders.map((order) => (
              <tr
                key={order._id}
                className={cn(
                  "border-b transition-colors hover:bg-muted/50 cursor-pointer",
                  selectedOrder?._id === order._id && "bg-muted/50"
                )}
                onClick={() => onSelectOrder(order)}
              >
                <td className="p-4 align-middle">
                  <Link href={`/products/${order.product.slug}`} className="flex gap-2 items-center">
                    <img
                      src={order?.product?.thumbnail}
                      alt={order?.product?.name}
                      className="h-10 w-10 rounded object-cover bg-muted"
                    />
                  </Link>
                </td>
                <td className="p-4 align-middle font-medium">
                  <Link href={`/products/${order.product.slug}`} className="hover:underline">
                    {order.product.name}
                  </Link>
                </td>
                <td className="p-4 align-middle">
                  <span className={cn(
                    "px-2 py-1 rounded-full text-xs font-semibold",
                    order.orderStatus === "shipped" && "bg-yellow-100",
                    order.orderStatus === "cancelled" && "bg-orange-100",
                    order.orderStatus === "delivered" && "bg-green-100",
                    order.orderStatus === "processing" && "bg-blue-100"
                  )}>
                    {order.orderStatus}
                  </span>
                </td>
                <td className="p-4 align-middle">${order.product.price}</td>
                <td className="p-4 align-middle"> {new Date(order.createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric"
                })}</td>
                <td className="p-4 align-middle text-right">
                  <Button variant="ghost" size="icon">
                    <span className="sr-only">More</span>
                    <div className="h-4 w-4 flex items-center justify-center">...</div>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
