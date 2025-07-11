import { NextResponse } from "next/server";
import { User } from "@/database/schema/user.model";
import { dbConnect } from "@/database/dbConnect";

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const { userDetails } = body;

    if (!userDetails._id) {
      return NextResponse.json(
        {
          success: false,
          message: "User ID is required",
        },
        { status: 400 }
      );
    }

    const user = await User.findById(userDetails._id);
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    user.name = userDetails.name || user.name;
    user.email = userDetails.email || user.email;
    user.role = userDetails.role || user.role;
    user.phone = userDetails.phone || user.phone;
    user.addresses = userDetails.addresses || user.addresses;
    user.wishlist = userDetails.wishlist || user.wishlist;
    user.imageUrl = userDetails.imageUrl || user.imageUrl;

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
