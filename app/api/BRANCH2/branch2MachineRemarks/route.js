import { connectToDB } from "@/utils/database";
import Branch2MachineRemarks from "@/models/Branch2/Branch2MachineRemarks";
import { NextResponse } from "next/server";
import { Types } from "mongoose";
export async function GET() {
  await connectToDB();
  const branch2MachineRemarks = await Branch2MachineRemarks.find();
  return NextResponse.json({ branch2MachineRemarks });
}

export const POST = async (req) => {
  const body = await req.json();
  const { date, number, remarks } = body;

  try {
    await connectToDB();
    const newBranch2MachineRemarks = new Branch2MachineRemarks({
      _id: new Types.ObjectId(),
      date,
      number,
      remarks,
    });
    console.log(newBranch2MachineRemarks);
    await newBranch2MachineRemarks.save();
    return new Response(JSON.stringify(newBranch2MachineRemarks), {
      status: 201,
    });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectToDB();
  await Branch2MachineRemarks.findByIdAndDelete(id);
  return NextResponse.json(
    { message: "Delated a machine remarks Record" },
    { status: 201 }
  );
}
