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

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectToDB();
  await Supply.findByIdAndDelete(id);
  return NextResponse.json(
    { message: "Deleted a Supply Record" },
    { status: 201 }
  );
}

// export async function PATCH(request) {
//   const id = request.nextUrl.searchParams.get("id");
//   await connectToDB();
//   await Supply.findByIdAndUpdate(id, { availableStocks: quantity });
//   console.log(id);
//   return NextResponse.json(
//     { message: "Updated  Supply Record" },
//     { status: 201 }
//   );
// }

export async function PATCH(request) {
  const id = request.nextUrl.searchParams.get("id");
  const body = await request.json();
  const { availableStocks } = body; // Assuming availableStocks is the field you want to update

  try {
    await connectToDB();
    await Supply.findByIdAndUpdate(id, { availableStocks }); // Use the correct field name
    console.log(id);
    return NextResponse.json(
      { message: "Updated Supply Record" },
      { status: 201 }
    );
  } catch (error) {
    return new Response(error, { status: 500 });
  }
}
