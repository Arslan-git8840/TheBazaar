import { NextResponse } from "next/server";
import { dbConnect } from "@/database/dbConnect";
import { ShippingAddress } from "@/database/schema/shipping.model";

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();

    const { user, fullName, phone, address, city, state, postalCode, country } =
      body;

    if (
      !user ||
      !fullName ||
      !phone ||
      !address ||
      !city ||
      !state ||
      !postalCode ||
      !country
    ) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const newShippingAddress = new ShippingAddress({
      user,
      fullName,
      phone,
      address,
      city,
      state,
      postalCode,
      country,
    });

    const savedAddress = await newShippingAddress.save();

    return NextResponse.json({ savedAddress }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
