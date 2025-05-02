import { NextResponse } from "next/server";
import { Product } from "@/database/schema/product";
import { dbConnect } from "@/database/dbConnect";

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const { productId, ...updateData } = body;
    
    if (!productId) {
      return NextResponse.json(
        {
          success: false,
          message: "Product ID is required",
        },
        { status: 400 }
      );
    }

    // Find the product by ID and update it
    const product = await Product.findByIdAndUpdate(productId, updateData, {
      new: true, 
      runValidators: true, 
    });

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        product,
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
