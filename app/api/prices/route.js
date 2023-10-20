import { connectToDB } from "@/utils/database";
import prices from "@/models/prices";
import { NextResponse } from "next/server";

// export const GET = async (req, res) => {
//   try {
//     await connectToDB();
//     const customers = await Customer.find({}).populate("customerName");
//     return new Response(JSON.stringify(customers), { status: 200 });
//   } catch (error) {
//     return new Response("Failed get customer", { status: 500 });
//   }
// };

export async function GET() {
  await connectToDB();
  const prices = await prices.find();
  return NextResponse.json({ prices });
}

export const POST = async (req) => {
  const body = await req.json();
  const { productName, productPrice } = body;

  try {
    await connectToDB();
    const newPrices = new prices({
      productName,
      productPrice,
    });
    console.log(newPrices);
    await newPrices.save();
    return new Response(JSON.stringify(newPrices), { status: 201 });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectToDB();
  await prices.findByIdAndDelete(id);
  return NextResponse.json(
    { message: "Deleted product's price Record" },
    { status: 201 }
  );
}
