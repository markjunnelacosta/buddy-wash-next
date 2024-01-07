import { connectToDB } from "@/utils/database";
import MachineRemarks from "@/models/machineRemarks";
import { NextResponse } from "next/server";
import { Types } from "mongoose";
export async function GET() {
  await connectToDB();
  const machineRemarks = await MachineRemarks.find();
  return NextResponse.json({ machineRemarks });
}

export const POST = async (req) => {
  const body = await req.json();
  const { date, number, remarks } = body;

  try {
    await connectToDB();
    const newMachineRemarks = new MachineRemarks({
      _id: new Types.ObjectId(),
      date,
      number,
      remarks,
    });
    console.log(newMachineRemarks);
    await newMachineRemarks.save();
    return new Response(JSON.stringify(newMachineRemarks), { status: 201 });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectToDB();
  await MachineRemarks.findByIdAndDelete(id);
  return NextResponse.json(
    { message: "Delated a machine remarks Record" },
    { status: 201 }
  );
}
