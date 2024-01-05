import { connectToDB } from "@/utils/database";
import Reports from "@/models/reports";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  try {
    await connectToDB();
    const report = await Reports.find({});
    const responseData = { reportData: report };
    return new Response(JSON.stringify(responseData), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to get reports" }), { status: 500 });
  }
  };
  

export const POST = async (req) => {
  const body = await req.json();
  const { customerName, reportDate, totalAmount, paymentMethod, typeOfCustomer, reportBranchId } = body;

  try {
    await connectToDB();
    const newReport = new Reports({
      customerName,
      reportDate,
      totalAmount,
      paymentMethod,
      typeOfCustomer,
      reportBranchId
    });
    console.log(newReport);
    await newReport.save();
    return new Response(JSON.stringify(newReport), { status: 201 });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};