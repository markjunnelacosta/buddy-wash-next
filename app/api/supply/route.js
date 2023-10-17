import { connectToDB } from "@/utils/database";
import Supply from "@/models/supply";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDB();
  const supplies = await Supply.find();
  return NextResponse.json({ supplies });
}

export const POST = async (req) => {
  const body = await req.json();
  const { supplyName, availableStock } = body;

  try {
    await connectToDB();
    const newSupply = new Supply({
      supplyName,
      availableStock,
    });
    console.log(newSupply);
    await newSupply.save();
    return new Response(JSON.stringify(newSupply), { status: 201 });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectToDB();
  await Supply.findByIdAndDelete(id);
  return NextResponse.json(
    { message: "Deleted a Supply Record" },
    { status: 201 }
  );
}
