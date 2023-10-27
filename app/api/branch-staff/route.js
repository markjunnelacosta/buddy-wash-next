import { connectToDB } from "@/utils/database";
import BranchesStaff from "@/models/branch-staff";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
try {
  await connectToDB();
  const branchStaff = await BranchesStaff.find({});
  const responseData = { branchStaffData: branchStaff };
  return new Response(JSON.stringify(responseData), { status: 200 });
} catch (error) {
  return new Response(JSON.stringify({ error: "Failed to get branch staff" }), { status: 500 });
}
};

export const POST = async (req) => {
  const body = await req.json();
  const { staffName, staffAddress, phoneNumber, staffPosition, branch } = body;

  try {
    await connectToDB();
    const newBranchStaff = new BranchesStaff({ 
      staffName,
      staffAddress,
      phoneNumber,
      staffPosition,
      branch,
    });
    console.log(newBranchStaff);
    await newBranchStaff.save();
    return new Response(JSON.stringify(newBranchStaff), { status: 201 });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectToDB();
  await BranchesStaff.findByIdAndDelete(id);
  return NextResponse.json(
    { message: "Deleted a branch staff" },
    { status: 201 }
  );
}
