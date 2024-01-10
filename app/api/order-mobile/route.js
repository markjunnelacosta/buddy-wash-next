import { connectToDB } from "@/utils/database";
import OrderMobile from "@/models/order-mobile";
import { NextResponse } from "next/server";
import Machine from "@/models/machines";
import Dryer from "@/models/dryers";

export async function GET() {
  await connectToDB();
  const orders = await OrderMobile.find().populate("machine");
  return NextResponse.json({ mobileOrders: orders });
}

export const POST = async (req) => {
  const body = await req.json();
  const {
    laundryBinId,
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
    const newOrder = new OrderMobile({
      laundryBinId,
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
  await OrderMobile.findByIdAndDelete(id);
  return NextResponse.json(
    { message: "Deleted a mobile order." },
    { status: 201 }
  );
}
export async function PATCH(request) {
  const id = request.nextUrl.searchParams.get("id");
  const body = await request.json();

  try {
    await connectToDB();

    // Update the document with all fields from the request body
    await OrderMobile.findByIdAndUpdate(id, body);

    console.log(id);
    return NextResponse.json(
      { message: "Updated Order Table" },
      { status: 201 }
    );
  } catch (error) {
    return new Response(error, { status: 500 });
  }
}
