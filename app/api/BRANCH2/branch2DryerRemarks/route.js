import { connectToDB } from "@/utils/database";
import Branch2DryerRemarks from "@/models/Branch2/Branch2DryerRemarks";
import { NextResponse } from "next/server";
import { Types } from "mongoose";
export async function GET() {
  await connectToDB();
  const branch2DryerRemarks = await Branch2DryerRemarks.find();
  return NextResponse.json({ branch2DryerRemarks });
}

export const POST = async (req) => {
  const body = await req.json();
  const { date, number, remarks } = body;

  try {
    await connectToDB();
    const newBranch2DryerRemarks = new Branch2DryerRemarks({
      _id: new Types.ObjectId(),
      date,
      number,
      remarks,
    });
    console.log(newBranch2DryerRemarks);
    await newBranch2DryerRemarks.save();
    return new Response(JSON.stringify(newBranch2DryerRemarks), {
      status: 201,
    });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectToDB();
  await Branch2DryerRemarks.findByIdAndDelete(id);
  return NextResponse.json(
    { message: "Delated a dryer remarks Record" },
    { status: 201 }
  );
}
