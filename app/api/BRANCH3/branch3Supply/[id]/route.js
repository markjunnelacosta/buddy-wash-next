import { connectToDB } from "@/utils/database";
import Branch3Supply from "@/models/Branch3/Branch3Supply";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const { newSupplyName: supplyName, newProductPrice: productPrice } =
    await request.json();
  await connectToDB();
  await Branch3Supply.findByIdAndUpdate(id, { supplyName, productPrice });
  return NextResponse.json(
    { message: "Supply Details Updated" },
    { status: 200 }
  );
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectToDB();
  const supply = await Branch3Supply.findOne({ _id: id });
  return NextResponse.json({ supply }, { status: 200 });
}
