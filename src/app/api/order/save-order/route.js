import { dbConnect } from "@/database/dbConnect";
import { Order } from "@/database/schema/order.model";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();

    const {
      user,
      product,
      quantity,
      price,
      shippingAddress,
      totalAmount,
      paymentId,
    } = await req.json();

    if (!user || !product || !quantity || !price || !shippingAddress || !totalAmount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newOrder = await Order.create({
      user,
      product,
      quantity,
      price,
      shippingAddress,
      totalAmount,
      paymentId,
    });

    return NextResponse.json({ message: "Order placed successfully", order: newOrder }, { status: 201 });
  } catch (error) {
    console.error("Error placing order:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
