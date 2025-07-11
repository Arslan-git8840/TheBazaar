import { NextResponse } from "next/server";
import { Product } from "@/database/schema/product";
import { dbConnect } from "@/database/dbConnect";

export async function GET(req) {
  try {
    await dbConnect();

    const productss = await Product.find({});

    if (productss.length === 0) {
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
        productss,
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
