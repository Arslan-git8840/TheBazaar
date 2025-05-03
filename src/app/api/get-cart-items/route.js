import { dbConnect } from "@/database/dbConnect";
import { Cart } from "@/database/schema/cart.model";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    const cartItems = await Cart.find({ user: userId }).populate("product");

    return NextResponse.json(
      { message: "Cart items fetched successfully", cartItems },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
