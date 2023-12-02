import { connectToDB } from "@/utils/database";
import Branch2Order from "@/models/Branch2/Branch2Order";
import { NextResponse } from "next/server";
import Machine from "@/models/machines";
import Dryer from "@/models/dryers";

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
  const orders = await Branch2Order.find().populate("machine");
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

    const machine = await Machine.findOne({ machineNumber: machineNo });
    const dryer = await Dryer.findOne({ dryerNumber: dryerNo });

    if (!machine) {
      return new Response("Machine not found", { status: 404 });
    }
    const newOrder = new Branch2Order({
      date,
      name,
      machine: machine._id,
      machineNo,
      machineAction,
      machineTimer,
      dryer: dryer._id,
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
  await Branch2Order.findByIdAndDelete(id);
  return NextResponse.json(
    { message: "Deleted a customer Record" },
    { status: 201 }
  );
}
export async function PATCH(request) {
  const id = request.nextUrl.searchParams.get("id");
  const body = await request.json();

  try {
    await connectToDB();

    // Update the document with all fields from the request body
    await Branch2Order.findByIdAndUpdate(id, body);

    console.log(id);
    return NextResponse.json(
      { message: "Updated Order Table" },
      { status: 201 }
    );
  } catch (error) {
    return new Response(error, { status: 500 });
  }
}
