import { connectToDB } from "@/utils/database";
import BranchesStaff from "@/models/branch-staff";

export const GET = async (req, res) => {
    try {
      await connectToDB();
      console.log("params", res.params.id);
      const staff = await BranchesStaff.findOne({ _id : res.params.id });
      console.log(staff);
      if (!report) return new Response("Branch staff Not Found", { status: 404 });
  
      return new Response(JSON.stringify(report), { status: 200 });
    } catch (error) {
      return new Response("Internal Server Error", { status: 500 });
    }
  };