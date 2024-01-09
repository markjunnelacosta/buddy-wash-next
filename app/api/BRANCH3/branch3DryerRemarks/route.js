import { connectToDB } from "@/utils/database";
import Branch3DryerRemarks from "@/models/Branch3/Branch3DryerRemarks";
import { NextResponse } from "next/server";
import { Types } from "mongoose";
export async function GET() {
  await connectToDB();
  const branch3DryerRemarks = await Branch3DryerRemarks.find();
  return NextResponse.json({ branch3DryerRemarks });
}

export const POST = async (req) => {
  const body = await req.json();
  const { date, number, remarks } = body;

  try {
    await connectToDB();
    const newBranch3DryerRemarks = new Branch3DryerRemarks({
      _id: new Types.ObjectId(),
      date,
      number,
      remarks,
    });
    console.log(newBranch3DryerRemarks);
    await newBranch3DryerRemarks.save();
    return new Response(JSON.stringify(newBranch3DryerRemarks), {
      status: 201,
    });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectToDB();
  await Branch3DryerRemarks.findByIdAndDelete(id);
  return NextResponse.json(
    { message: "Delated a dryer remarks Record" },
    { status: 201 }
  );
}
