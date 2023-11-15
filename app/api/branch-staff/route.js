import { connectToDB } from "@/utils/database";
import BranchesStaff from "@/models/branch-staff";
import { NextResponse } from "next/server";

// export const GET = async (req, res) => {
//   try {
//     await connectToDB();
//     const branchStaff = await BranchesStaff.find({}).populate({ path: 'staffBranchId', model: 'Branch'});
//     const responseData = { branchStaffData: branchStaff };
//     return new Response(JSON.stringify(responseData), { status: 200 });
//   } catch (error) {
//     return new Response(JSON.stringify({ error: "Failed to get branch staff" }), { status: 500 });
//   }
// };

// Update the GET request handler in app\api\branch-staff\route.js
export const GET = async (req, res) => {
  try {
    await connectToDB();
    const { branchId } = params;
    console.log(params);
    if (branchId) {
      // const branchId = id;
      console.log(branchId);
      const branchStaff = await BranchesStaff.find({
        staffBranchId: branchId,
      }).populate({ path: "staffBranchId", model: "Branch" });
      const responseData = { branchStaffData: branchStaff };
      return new Response(JSON.stringify(responseData), { status: 200 });
    } else {
      return new Response(
        JSON.stringify({ error: "branchId query parameter is missing" }),
        { status: 400 }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to get branch staff" }),
      { status: 500 }
    );
  }
};

export const POST = async (req) => {
  const body = await req.json();
  const { staffName, staffAddress, phoneNumber, staffPosition, staffBranchId } =
    body;

  try {
    await connectToDB();
    const newBranchesStaff = new BranchesStaff({
      staffName,
      staffAddress,
      phoneNumber,
      staffPosition,
      staffBranchId,
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
