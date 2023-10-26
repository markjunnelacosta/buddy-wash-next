import { connectToDB } from "@/utils/database";
import Branch from "@/models/branch";
import { NextResponse } from "next/server";

// export async function GET() {
//   await connectToDB();
//   const branch = await Branch.find();
//   return NextResponse.json({ branch });
// }

export const GET = async (req, res) => {
try {
  await connectToDB();
  const branch = await Branch.find({});
  const responseData = { branchesData: branch };
  return new Response(JSON.stringify(responseData), { status: 200 });
} catch (error) {
  return new Response(JSON.stringify({ error: "Failed to get branches" }), { status: 500 });
}
};

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

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectToDB();
  await Branch.findByIdAndDelete(id);
  return NextResponse.json(
    { message: "Deleted a branch Record" },
    { status: 201 }
  );
}
