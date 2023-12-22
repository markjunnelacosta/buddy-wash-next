import { connectToDB } from "@/utils/database";
import Branch3Supply from "@/models/Branch3/Branch3Supply";
import archiveSupply from "@/models/archiveData/archiveSupply";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDB();
  const supplies = await Branch3Supply.find();
  return NextResponse.json({ supplies });
}

export const POST = async (req) => {
  const body = await req.json();
  const { supplyName, availableStock, productPrice } = body;

  try {
    await connectToDB();
    const newSupply = new Branch3Supply({
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
    await Branch3Supply.findByIdAndUpdate(id, { availableStock });
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

    const archivedSupply = await Branch3Supply.findById(id);

    const newArchivedSupply = new archiveSupply({
      supplyName: archivedSupply.supplyName,
      availableStock: archivedSupply.availableStock,
      productPrice: archivedSupply.productPrice,
      deletedAt: new Date(),
    });

    await newArchivedSupply.save();

    await Branch3Supply.findByIdAndDelete(id);

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
