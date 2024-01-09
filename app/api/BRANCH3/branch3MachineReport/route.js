import { connectToDB } from "@/utils/database";
import Branch3MachineReport from "@/models/Branch3/Branch3MachineReport";
import { NextResponse } from "next/server";
import { Types } from "mongoose";
export async function GET() {
  await connectToDB();
  const machineReports = await Branch3MachineReport.find();
  return NextResponse.json({ machineReports });
}

export const POST = async (req) => {
  const body = await req.json();
  const { date, type, machineNumber, useCount } = body;

  try {
    await connectToDB();
    const newMachineReport = new Branch3MachineReport({
      _id: new Types.ObjectId(),
      date,
      type,
      machineNumber,
      useCount,
    });
    console.log(newMachineReport);
    await newMachineReport.save();
    return new Response(JSON.stringify(newMachineReport), { status: 201 });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectToDB();
  await Branch3MachineReport.findByIdAndDelete(id);
  return NextResponse.json(
    { message: "Deleted a machine report Record" },
    { status: 201 }
  );
}
