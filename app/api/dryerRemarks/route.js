import { connectToDB } from "@/utils/database";
import DryerRemarks from "@/models/dryerRemarks";
import { NextResponse } from "next/server";
import { Types } from "mongoose";
export async function GET() {
  await connectToDB();
  const dryerRemarks = await DryerRemarks.find();
  return NextResponse.json({ dryerRemarks });
}

export const POST = async (req) => {
  const body = await req.json();
  const { date, number, remarks } = body;

  try {
    await connectToDB();
    const newDryerRemarks = new DryerRemarks({
      _id: new Types.ObjectId(),
      date,
      number,
      remarks,
    });
    console.log(newDryerRemarks);
    await newDryerRemarks.save();
    return new Response(JSON.stringify(newDryerRemarks), { status: 201 });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectToDB();
  await DryerRemarks.findByIdAndDelete(id);
  return NextResponse.json(
    { message: "Delated a dryer remarks Record" },
    { status: 201 }
  );
}
