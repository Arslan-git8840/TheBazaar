import { NextResponse } from "next/server";
import { User } from "@/database/schema/user.model";
import { dbConnect } from "@/database/dbConnect";

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();

    if (!body.userId) {
      return NextResponse.json(
        {
          success: false,
          message: "User ID is required",
        },
        { status: 400 }
      );
    }

    const user = await User.findById(body.userId);
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    user.name = body.name || user.name;
    user.email = body.email || user.email;
    user.role = body.role || user.role;
    user.phone = body.phone || user.phone;
    user.addresses = body.addresses || user.addresses;
    user.wishlist = body.wishlist || user.wishlist;

    await user.save();

    return NextResponse.json(
      {
        success: true,
        user,
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
