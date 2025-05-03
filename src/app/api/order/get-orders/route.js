import { dbConnect } from "@/database/dbConnect";
import { Order } from "@/database/schema/order.model";
import { NextResponse } from "next/server";
import { Product } from "@/database/schema/product";

export async function GET(req) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    const orders = await Order.find({ user: userId }).populate('product');

    return NextResponse.json(
      { message: "Order placed successfully", orders },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
