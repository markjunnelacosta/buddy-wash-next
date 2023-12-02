import { connectToDB } from "@/utils/database";
import Customer from "@/models/Branch2/Branch2Customer";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const { newCustomerName: customerName, newCustomerNumber: customerNumber } =
    await request.json();
  await connectToDB();
  await Customer.findByIdAndUpdate(id, { customerName, customerNumber });
  return NextResponse.json(
    { message: "Customer Details Updated" },
    { status: 200 }
  );
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectToDB();
  const customer = await Customer.findOne({ _id: id });
  return NextResponse.json({ customer }, { status: 200 });
}
