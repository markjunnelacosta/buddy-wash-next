import { connectToDB } from "@/utils/database";
import Branch from "@/models/branch";
import { NextResponse } from "next/server";
import archiveBranch from "@/models/archiveData/archiveBranch";

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
  const { branchNumber, branchAddress} = body;

  try {
    await connectToDB();
    const newBranch = new Branch({
      branchNumber,
      branchAddress
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
  try {
    await connectToDB();

    const archivedBranch = await Branch.findById(id);

    const newArchivedBranch = new archiveBranch({
      branchNumber: archivedBranch.branchNumber,
      branchAddress: archivedBranch.branchAddress,
      deletedAt: new Date(),
    });

    await newArchivedBranch.save();

    await Branch.findByIdAndDelete(id);

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