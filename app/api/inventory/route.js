import { connectToDB } from "@/utils/database";
import Inventory from "@/models/inventory";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDB();
  const inventory = await Inventory.find();
  return NextResponse.json({ inventory });
}

export const POST = async (req) => {
  const body = await req.json();
  const { date, supplyName, supplyId, quantity, type } = body;

  try {
    await connectToDB();
    const newInventory = new Inventory({
      date,
      supplyName,
      supplyId,
      quantity,
      type,
    });
    console.log(newInventory);
    await newInventory.save();
    return new Response(JSON.stringify(newInventory), { status: 201 });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectToDB();
  await Inventory.findByIdAndDelete(id);
  return NextResponse.json({ message: "Deleted a Record" }, { status: 201 });
}
