import { dbConnect } from "@/database/dbConnect";
import { Cart } from "@/database/schema/cart.model";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();
    const { userId, productId } = await req.json();

    if (!userId || !productId) {
      return NextResponse.json(
        { error: "Missing userId or productId" },
        { status: 400 }
      );
    }

    const deletedItem = await Cart.findOneAndDelete({
      user: userId,
      _id: productId,
    });

    if (!deletedItem) {
      return NextResponse.json(
        { error: "Cart item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Cart item deleted successfully", deletedItem },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting cart item:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
