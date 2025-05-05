import { NextResponse } from "next/server";
import { dbConnect } from "@/database/dbConnect";
import { Order } from "@/database/schema/order.model";

export async function PATCH(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { paymentStatus, productId } = body;

    if (!["pending", "paid", "failed"].includes(paymentStatus)) {
      return NextResponse.json(
        { error: "Invalid payment status" },
        { status: 400 }
      );
    }

    const updatedOrder = await Order.findOneAndUpdate(
      { product: productId },
      { paymentStatus },
      { new: true }
    );

    if (!updatedOrder) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Payment status updated",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
