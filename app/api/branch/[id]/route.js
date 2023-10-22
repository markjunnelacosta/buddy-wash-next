import { connectToDB } from "@/utils/database";
import Branch from "@/models/branch";

// export const GET = async (req, res) => {
//   try {
//     await connectToDB();
//     console.log("params", res.params.id);
//     const branch = await Branch.findOne({ branchId: res.params.id });
//     console.log(branch);
//     if (!branch) return new Response("Branch Not Found", { status: 404 });

//     return new Response(JSON.stringify(branch), { status: 200 });
//   } catch (error) {
//     return new Response("Internal Server Error", { status: 500 });
//   }
// };

export async function GET(request, { params }) {
  const { id } = params;
  await connectToDB();
  const branch = await Branch.findOne({ _id: id });
  return NextResponse.json({ branch }, { status: 200 });
}
