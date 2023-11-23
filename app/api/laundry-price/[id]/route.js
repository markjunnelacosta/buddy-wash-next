import { connectToDB } from "@/utils/database";
import Price from "@/models/prices";
import {NextResponse} from "next/server";

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

  export async function PUT(request, {params}) {
    const {id} = params;
    const {newModeName: modeName, newPrice: price}= await request.json();
    await connectToDB();
    await Price.findByIdAndUpdate(id, {modeName, price});
    return NextResponse.json({message: "Laundry Mode is Updated"}, {status:200});
}