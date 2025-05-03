import { Product } from "@/database/schema/product";
import { dbConnect } from "@/database/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    const recommendedProducts = await Product.aggregate([
      { $sample: { size: 10 } },
    ]);

    return NextResponse.json(
      { message: "Random products fetched successfully", recommendedProducts },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error fetching random products:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
