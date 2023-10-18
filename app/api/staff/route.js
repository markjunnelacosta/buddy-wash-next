import { connectToDB } from "@/utils/database";
import staff from "@/models/staff";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDB();
  const staff = await staff.find();
  return NextResponse.json({ staff });
}

export const POST = async (req) => {
  const body = await req.json();
  const { staffName, staffNumber } = body;

  try {
    await connectToDB();
    const newStaff = new staff({
      staffName,
      staffNumber,
    });
    console.log(newStaff);
    await newStaff.save();
    return new Response(JSON.stringify(newStaff), { status: 201 });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};