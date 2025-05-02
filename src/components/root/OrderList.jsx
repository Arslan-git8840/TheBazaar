import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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
                key={order.id}
                className={cn(
                  "border-b transition-colors hover:bg-muted/50 cursor-pointer",
                  selectedOrder?.id === order.id && "bg-muted/50"
                )}
                onClick={() => onSelectOrder(order)}
              >
                <td className="p-4 align-middle">
                  <div className="flex gap-2">
                      <img
                        key={order.items.id}
                        src={order.items.image}
                        alt={order.items.name}
                        className="h-10 w-10 rounded object-cover bg-muted"
                      />
                  </div>
                </td>
                <td className="p-4 align-middle font-medium">{order.orderNumber}</td>
                <td className="p-4 align-middle">
                  <span className={cn(
                    "px-2 py-1 rounded-full text-xs font-semibold",
                    order.status === "Paid" && "bg-yellow-100",
                    order.status === "Delivered" && "bg-orange-100",
                    order.status === "Completed" && "bg-green-100",
                    order.status === "Processing" && "bg-blue-100"
                  )}>
                    {order.status}
                  </span>
                </td>
                <td className="p-4 align-middle">${order.total.toFixed(2)}</td>
                <td className="p-4 align-middle">{order.date}</td>
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
