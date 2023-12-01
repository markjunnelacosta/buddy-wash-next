import { connectToDB } from "@/utils/database";
import Supply from "@/models/supply";
import archiveSupply from "@/models/archiveData/archiveSupply";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDB();
  const supplies = await Supply.find();
  return NextResponse.json({ supplies });
}

export const POST = async (req) => {
  const body = await req.json();
  const { supplyName, availableStock, productPrice } = body;

  try {
    await connectToDB();
    const newSupply = new Supply({
      supplyName,
      availableStock,
      productPrice,
    });
    console.log(newSupply);
    await newSupply.save();
    return new Response(JSON.stringify(newSupply), { status: 201 });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};

export async function PATCH(request) {
  const id = request.nextUrl.searchParams.get("id");
  const body = await request.json();
  const { availableStock } = body;
  try {
    await connectToDB();
    await Supply.findByIdAndUpdate(id, { availableStock });
    console.log(id);
    return NextResponse.json(
      { message: "Updated  Supply Record" },
      { status: 201 }
    );
  } catch (error) {
    return new Response(error, { status: 500 });
  }
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  try {
    await connectToDB();

    const archivedSupply = await Supply.findById(id);

    const newArchivedSupply = new archiveSupply({
      supplyName: archivedSupply.supplyName,
      availableStock: archivedSupply.availableStock,
      productPrice: archivedSupply.productPrice,
      deletedAt: new Date(),
    });

    await newArchivedSupply.save();

    await Supply.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "Deleted a Record and added details to archived table" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete and add details to archived table" },
      { status: 500 }
    );
  }
}