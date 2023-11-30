import { connectToDB } from "@/utils/database";
import Dryer from "@/models/dryers";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  try {
    await connectToDB();
    const dryers = await Dryer.find({});
    // const dryers = await Dryer.find({ branchNumber });
    const responseData = { dryerData: dryers };
    return new Response(JSON.stringify(responseData), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to get Dryers" }), {
      status: 500,
    });
  }
};

export const POST = async (req) => {
  const body = await req.json();
  const { dryerNumber, action, timer, queue, useCount, status } = body;

  try {
    await connectToDB();
    const newDryer = new Dryer({
      dryerNumber,
      action,
      timer,
      queue,
      useCount,
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

export async function PATCH(request) {
  const id = request.nextUrl.searchParams.get("id");
  const body = await request.json();

  try {
    await connectToDB();

    // Update the document with all fields from the request body
    await Dryer.findByIdAndUpdate(id, body);

    console.log(id);
    return NextResponse.json(
      { message: "Updated Dryer Table" },
      { status: 201 }
    );
  } catch (error) {
    return new Response(error, { status: 500 });
  }
}
