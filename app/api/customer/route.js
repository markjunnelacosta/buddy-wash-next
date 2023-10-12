import { connectToDB } from "@/utils/database";
import Customer from "@/models/customer";
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
  const customers = await Customer.find();
  return NextResponse.json({ customers });
}

export const POST = async (req) => {
  const body = await req.json();
  const { customerName, customerNumber } = body;

  try {
    await connectToDB();
    const newCustomer = new Customer({
      customerName,
      customerNumber,
    });
    console.log(newCustomer);
    await newCustomer.save();
    return new Response(JSON.stringify(newCustomer), { status: 201 });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectToDB();
  await Customer.findByIdAndDelete(id);
  return NextResponse.json(
    { message: "Deleted a customer Record" },
    { status: 201 }
  );
}
