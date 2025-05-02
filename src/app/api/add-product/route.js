import { NextResponse } from "next/server";
import { Product } from "@/database/schema/product";
import { dbConnect } from "@/database/dbConnect";

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    if (!body) {
      return NextResponse.json(
        {
          success: false,
          message: "No data found",
        },
        { status: 400 }
      );
    }

    const product = await Product.create(body);

    return NextResponse.json(
      {
        success: true,
        product,
      },
      { status: 201 }
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
