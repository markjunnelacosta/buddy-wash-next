import { connectToDB } from "@/utils/database";
import Branch from "@/models/branch";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDB();
  const branch = await Branch.find();
  return NextResponse.json({ branch });
}

export const POST = async (req) => {
  const body = await req.json();
  const { branchNumber, branchAddress, numberOfStaff } = body;

  try {
    await connectToDB();
    const newBranch = new Branch({ 
      branchNumber,
      branchAddress,
      numberOfStaff,
    });
    console.log(newBranch);
    await newBranch.save();
    return new Response(JSON.stringify(newBranch), { status: 201 });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};
