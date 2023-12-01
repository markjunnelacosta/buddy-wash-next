import { connectToDB } from "@/utils/database";
import BranchesStaff from "@/models/branch-staff";
import archiveBranchStaff from "@/models/archiveData/archiveBranchStaff";
import { NextResponse } from "next/server";


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
  const { staffName, staffAddress, phoneNumber, staffPosition, selectedBranch, staffBranchId } =
    body;

  try {
    await connectToDB();
    const newBranchesStaff = new BranchesStaff({
      staffName,
      staffAddress,
      phoneNumber,
      staffPosition,
      selectedBranch,
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
  try {
    await connectToDB();

    const archivedBranchStaff = await BranchesStaff.findById(id);

    const newArchivedBranchStaff = new archiveBranchStaff({
      staffName: archivedBranchStaff.staffName,
      staffAddress: archivedBranchStaff.staffAddress,
      phoneNumber: archivedBranchStaff.phoneNumber,
      staffPosition: archivedBranchStaff.staffPosition,
      selectedBranch: archivedBranchStaff.selectedBranch,
      staffBranchId: archivedBranchStaff.staffBranchId,
      deletedAt: new Date(),
    });

    await newArchivedBranchStaff.save();

    await BranchesStaff.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "Deleted a Record and added details to archived table" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete and add details to archived table" },
      { status: 500 }
    );
  }
}