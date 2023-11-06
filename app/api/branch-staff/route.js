import { connectToDB } from "@/utils/database";
import BranchesStaff from "@/models/branch-staff";
import Branch from "@/models/branch";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  try {
    await connectToDB();
    const branchStaff = await BranchesStaff.find({}).populate({ path: 'staffBranchId', model: 'Branch'});
    const responseData = { branchStaffData: branchStaff };
    return new Response(JSON.stringify(responseData), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to get branch staff" }), { status: 500 });
  }
};

export const POST = async (req) => {
  const body = await req.json();
  const { staffName, staffAddress, phoneNumber, staffPosition, staffBranchId} = body;

  try {
    await connectToDB();
    const newBranchesStaff = new BranchesStaff({
      staffName,
      staffAddress,
      phoneNumber,
      staffPosition,
      staffBranchId
    });
    console.log(newBranchesStaff);
    await newBranchesStaff.save();
    return new Response(JSON.stringify(newBranchesStaff), { status: 201 });
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


// export const GET = async (req, res) => {
//   try {
//     await connectToDB();
//     const branchStaff = await BranchesStaff.find({});
//     const responseData = { branchStaffData: branchStaff };
//     return new Response(JSON.stringify(responseData), { status: 200 });
//   } catch (error) {
//     return new Response(JSON.stringify({ error: "Failed to get branch staff" }), { status: 500 });
//   }
// };


// export const POST = async (req) => {
//   const body = await req.json();
//   const { staffName, staffAddress, phoneNumber, staffPosition} = body;

//   try {
//     await connectToDB();
//     const newBranchesStaff = new BranchesStaff({
//       staffName,
//       staffAddress,
//       phoneNumber,
//       staffPosition,
//     });
//     console.log(newBranchesStaff);
//     await newBranchesStaff.save();
//     return new Response(JSON.stringify(newBranchesStaff), { status: 201 });
//   } catch (error) {
//     return new Response(error, { status: 500 });
//   }
// };
