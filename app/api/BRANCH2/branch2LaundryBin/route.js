import { connectToDB } from "@/utils/database";
import Branch2LaundryBin from "@/models/Branch2/Branch2Laundrybin";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  try {
    await connectToDB();
    const order = await Branch2LaundryBin.find({});
    const responseData = { laundryData: order };
    return new Response(JSON.stringify(responseData), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to get laundry order" }),
      { status: 500 }
    );
  }
};

export const POST = async (req) => {
  const body = await req.json();
  const {
    customerName,
    orderDate,
    weight,
    washMode,
    dryMode,
    fold,
    colored,
    detergent,
    fabcon,
    detergentQty,
    fabconQty,
    paymentMethod,
    total,
  } = body;
  try {
    await connectToDB();
    const newOrder = new Branch2LaundryBin({
      customerName,
      orderDate,
      weight,
      washMode,
      dryMode,
      fold,
      colored,
      detergent,
      fabcon,
      detergentQty,
      fabconQty,
      paymentMethod,
      total,
    });
    console.log(newOrder);
    await newOrder.save();
    return new Response(JSON.stringify(newOrder), { status: 201 });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};
