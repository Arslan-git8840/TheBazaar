import { NextResponse } from "next/server";
import { User } from "@/database/schema/user.model";
import { dbConnect } from "@/database/dbConnect";

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();

 
    if (!body.name || !body.email) {
      return NextResponse.json(
        {
          success: false,
          message: "Name and email are required",
        },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is already taken",
        },
        { status: 400 }
      );
    }

    const user = new User({
      name: body.name,
      email: body.email,
      role: body.role || 'user', 
      phone: body.phone,
      addresses: body.addresses || [], 
      wishlist: body.wishlist || [], 
    });
  
    await user.save();

    return NextResponse.json(
      {
        success: true,
        user,
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
