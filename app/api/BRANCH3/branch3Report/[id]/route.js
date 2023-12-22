import { connectToDB } from "@/utils/database";
import Branch3Reports from "@/models/Branch3/Branch3Reports";

export const GET = async (req, res) => {
  try {
    await connectToDB();
    console.log("params", res.params.id);
    const report = await Branch3Reports.findOne({ _id: res.params.id });
    console.log(report);
    if (!report) return new Response("Report Not Found", { status: 404 });

    return new Response(JSON.stringify(report), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};
