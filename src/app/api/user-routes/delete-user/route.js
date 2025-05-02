import { NextResponse } from "next/server";
import { User } from "@/database/schema/user.model";
import { dbConnect } from "@/database/dbConnect";

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();

    // Validate input: Ensure userId is provided
    if (!body.userId) {
      return NextResponse.json(
        {
          success: false,
          message: "User ID is required",
        },
        { status: 400 }
      );
    }

    // Find and delete the user by userId
    const user = await User.findByIdAndDelete(body.userId);
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "User deleted successfully",
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
