import { connectToDB } from "@/utils/database";
import BranchesStaff from "@/models/branch-staff";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  try {
    await connectToDB();
    const staff = await BranchesStaff.find({});
    const responseData = { branchStaffData: staff };
    return new Response(JSON.stringify(responseData), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to get staff" }), { status: 500 });
  }
  };