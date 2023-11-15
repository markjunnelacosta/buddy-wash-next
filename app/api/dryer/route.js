import { connectToDB } from "@/utils/database";
import Dryer from "@/models/dryers";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  try {
    await connectToDB();
    const dryers = await Dryer.find({});
    const responseData = { dryerData: dryers };
    return new Response(JSON.stringify(responseData), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to get Dryers" }), { status: 500 });
  }
};

export const POST = async (req) => {
  const body = await req.json();
  const { dryerNumber, useCount, action, timer, queue, status } = body;

  try {
    await connectToDB();
    const newDryer = new Dryer({
      dryerNumber,
      useCount,
      action,
      timer,
      queue,
      status,
    });
    console.log(newDryer);
    await newDryer.save();
    return new Response(JSON.stringify(newDryer), { status: 201 });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectToDB();
  await Dryer.findByIdAndDelete(id);
  return NextResponse.json({ message: "Deleted a dryer." }, { status: 201 });
}
