import { Product } from "@/database/schema/product";
import { dbConnect } from "@/database/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    
    const trendingProducts = await Product.find({ numReviews: { $gt: 400 } })
      .sort({ numReviews: -1 }) 
      .limit(10);

    return NextResponse.json(
      { message: "Discounted products fetched successfully", trendingProducts },
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
