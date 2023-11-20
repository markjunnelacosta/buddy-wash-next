import { connectToDB } from "@/utils/database";
import Order from "@/models/order";
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
  const orders = await Order.find();
  return NextResponse.json({ orders });
}

export const POST = async (req) => {
  const body = await req.json();
  const {
    date,
    name,
    machineNo,
    machineAction,
    machineTimer,
    dryerNo,
    dryerAction,
    dryerTimer,
    status,
  } = body;

  try {
    await connectToDB();
    const newOrder = new Order({
      date,
      name,
      machineNo,
      machineAction,
      machineTimer,
      dryerNo,
      dryerAction,
      dryerTimer,
      status,
    });
    console.log(newOrder);
    await newOrder.save();
    return new Response(JSON.stringify(newOrder), { status: 201 });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectToDB();
  await Order.findByIdAndDelete(id);
  return NextResponse.json(
    { message: "Deleted an order Record" },
    { status: 201 }
  );
}
