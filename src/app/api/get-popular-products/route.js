import { Product } from "@/database/schema/product";
import { dbConnect } from "@/database/dbConnect";
import { NextResponse } from "next/server";
export async function GET() {
  try {
    await dbConnect();
    const popularProducts = await Product.find({ ratings: { $gt: 3 } })
      .sort({ ratings: -1 }) 
      .limit(10); 

   return NextResponse.json(
     { message: "Popular products fetched successfully", popularProducts },
     { status: 201 }
   )
  } catch (error) {
    console.error("Error fetching popular products:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
