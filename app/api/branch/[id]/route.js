import { connectToDB } from "@/utils/database";
import Branch from "@/models/branch";

export async function GET(request, { params }) {
  const { id } = params;
  await connectToDB();
  const branch = await Branch.findOne({ _id: id });
  return NextResponse.json({ branch }, { status: 200 });
}