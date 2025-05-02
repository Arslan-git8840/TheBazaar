
import { NextResponse } from "next/server";
import { Product } from "@/database/schema/product";
import { dbConnect } from "@/database/dbConnect";

export async function GET(req) {
  try {
    await dbConnect();

    const url = new URL(req.url);
    const category = url.searchParams.get("category");

    if (!category) {
      return NextResponse.json(
        { success: false, message: "Category is required" },
        { status: 400 }
      );
    }

    const products = await Product.find({
      category: { $regex: new RegExp(`^${category}$`, "i") },
    });

    return NextResponse.json(
      { success: true, products },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
