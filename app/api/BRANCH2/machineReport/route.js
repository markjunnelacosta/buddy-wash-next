import { connectToDB } from "@/utils/database";
import MachineReport from "@/models/Branch2/Branch2MachineReport";
import { NextResponse } from "next/server";
import { Types } from "mongoose";
export async function GET() {
  await connectToDB();
  const machineReport = await MachineReport.find();
  return NextResponse.json({ machineReport });
}

export const POST = async (req) => {
  const body = await req.json();
  const { date, type, machineNumber, useCount } = body;

  try {
    await connectToDB();
    const newMachineReport = new MachineReport({
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
  await MachineReport.findByIdAndDelete(id);
  return NextResponse.json(
    { message: "Delated a machine report Record" },
    { status: 201 }
  );
}
