import { NextResponse } from "next/server";
import { Product } from "@/database/schema/product";
import { dbConnect } from "@/database/dbConnect";

export async function POST(req) {
  try {
    await dbConnect();

    // Fetch all products from the database
    const products = await Product.find();

    if (products.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No products found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        products,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}
