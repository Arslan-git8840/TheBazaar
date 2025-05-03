import { NextResponse } from "next/server";
import { User } from "@/database/schema/user.model";
import { dbConnect } from "@/database/dbConnect";

export async function GET(req) {
  try {
    await dbConnect();

    const users = await User.find({});

    if (users.length === 0) {
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
        users,
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
