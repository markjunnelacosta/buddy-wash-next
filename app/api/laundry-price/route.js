import { connectToDB } from "@/utils/database";
import Price from "@/models/prices";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
    try {
      await connectToDB();
      const price = await Price.find({});
      const responseData = { laundryModeData: price };
      return new Response(JSON.stringify(responseData), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ error: "Failed to get laundry mode data" }), { status: 500 });
    }
  };

  export const POST = async (req) => {
    const body = await req.json();
    const { modeName, category, price, timer } = body;
    try {
      await connectToDB();
      const newLaundryMode = new Price({
        modeName, category, price, timer
      });
      console.log(newLaundryMode);
      await newLaundryMode.save();
      return new Response(JSON.stringify(newLaundryMode), { status: 201 });
    } catch (error) {
      return new Response(error, { status: 500 });
    }
  };

  export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectToDB();
    await Price.findByIdAndDelete(id);
    return NextResponse.json(
      { message: "Deleted a laundry mode" },
      { status: 201 }
    );
  }