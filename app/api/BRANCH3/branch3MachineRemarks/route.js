import { connectToDB } from "@/utils/database";
import Branch3MachineRemarks from "@/models/Branch3/Branch3MachineRemarks";
import { NextResponse } from "next/server";
import { Types } from "mongoose";
export async function GET() {
  await connectToDB();
  const branch3MachineRemarks = await Branch3MachineRemarks.find();
  return NextResponse.json({ branch3MachineRemarks });
}

export const POST = async (req) => {
  const body = await req.json();
  const { date, number, remarks } = body;

  try {
    await connectToDB();
    const newBranch3MachineRemarks = new Branch3MachineRemarks({
      _id: new Types.ObjectId(),
      date,
      number,
      remarks,
    });
    console.log(newBranch3MachineRemarks);
    await newBranch3MachineRemarks.save();
    return new Response(JSON.stringify(newBranch3MachineRemarks), {
      status: 201,
    });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectToDB();
  await Branch3MachineRemarks.findByIdAndDelete(id);
  return NextResponse.json(
    { message: "Delated a machine remarks Record" },
    { status: 201 }
  );
}
