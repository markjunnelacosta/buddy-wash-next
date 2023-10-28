import { connectToDB } from "@/utils/database";
import Supply from "@/models/supply";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const { newSupplyName: supplyName, newProductPrice: productPrice } =
    await request.json();
  await connectToDB();
  await Supply.findByIdAndUpdate(id, { supplyName, productPrice });
  return NextResponse.json(
    { message: "Supply Details Updated" },
    { status: 200 }
  );
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectToDB();
  const supply = await Supply.findOne({ _id: id });
  return NextResponse.json({ supply }, { status: 200 });
}
