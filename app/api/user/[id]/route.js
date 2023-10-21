import { connectToDB } from "@/utils/database";
import User from "@/models/user";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  try {
    await connectToDB();
    console.log("params", res.params.id);
    const user = await User.findOne({ userId: res.params.id });
    console.log(user);
    if (!user) return new Response("User Not Found", { status: 404 });

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};

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