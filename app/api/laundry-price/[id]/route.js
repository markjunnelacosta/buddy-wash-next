import { connectToDB } from "@/utils/database";
import Price from "@/models/prices";

export const GET = async (req, res) => {
    try {
      await connectToDB();
      console.log("params", res.params.id);
      const laundryMode = await Price.findOne({ _id : res.params.id });
      console.log(report);
      if (!laundryMode) return new Response("Laundry Mode Not Found", { status: 404 });
  
      return new Response(JSON.stringify(laundryMode), { status: 200 });
    } catch (error) {
      return new Response("Internal Server Error", { status: 500 });
    }
  };