import { connectToDB } from "@/utils/database";
import Branch from "@/models/branch";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  try {
    await connectToDB();
    console.log("params", res.params.id);
    const branch = await Branch.findOne({ _id : res.params.id });
    console.log(branch);
    if (!branch) return new Response("Branch Not Found", { status: 404 });

    return new Response(JSON.stringify(branch), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};

export async function PUT(request, { params }) {
  const { id } = params;
  const { newBranchAddress: branchAddress, newBranchNumber: branchNumber } =
    await request.json();
  await connectToDB();
  await Branch.findByIdAndUpdate(id, { branchAddress, branchNumber });
  return NextResponse.json(
    { message: "Branch Details Updated" },
    { status: 200 }
  );
}