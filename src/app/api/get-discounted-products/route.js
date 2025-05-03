import { Product } from "@/database/schema/product";
import { dbConnect } from "@/database/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    
    const discountedProducts = await Product.find({ discount: { $gt: 25 } })
      .sort({ discount: -1 }) 
      .limit(10);

    return NextResponse.json(
      { message: "Discounted products fetched successfully", discountedProducts },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error fetching discounted products:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
