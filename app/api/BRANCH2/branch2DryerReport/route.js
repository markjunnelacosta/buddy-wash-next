import { connectToDB } from "@/utils/database";
import Branch2DryerReport from "@/models/Branch2/Branch2DryerReport";
import { NextResponse } from "next/server";
import { Types } from "mongoose";
export async function GET() {
  await connectToDB();
  const dryerReports = await Branch2DryerReport.find();
  return NextResponse.json({ dryerReports });
}

export const POST = async (req) => {
  const body = await req.json();
  const { date, dryerNumber, useCount } = body;

  try {
    await connectToDB();
    const newDryerReport = new Branch2DryerReport({
      _id: new Types.ObjectId(),
      date,
      dryerNumber,
      useCount,
    });
    console.log(newDryerReport);
    await newDryerReport.save();
    return new Response(JSON.stringify(newDryerReport), { status: 201 });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectToDB();
  await Branch2DryerReport.findByIdAndDelete(id);
  return NextResponse.json(
    { message: "Delated a dryer report Record" },
    { status: 201 }
  );
}
