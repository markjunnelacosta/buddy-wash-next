import { connectToDB } from "@/utils/database";
import Machine from "@/models/machines";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  try {
    await connectToDB();
    const machines = await Machine.find({});
    const responseData = { machineData: machines };
    return new Response(JSON.stringify(responseData), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to get Machines" }), { status: 500 });
  }
};

export const POST = async (req) => {
  const body = await req.json();
  const { machineNumber, action, timer, queue, useCount, status } = body;

  try {
    await connectToDB();
    const newMachine = new Machine({
      machineNumber,
      action,
      timer,
      queue,
      useCount,
      status,
    });
    console.log(newMachine);
    await newMachine.save();
    return new Response(JSON.stringify(newMachine), { status: 201 });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectToDB();
  await Machine.findByIdAndDelete(id);
  return NextResponse.json({ message: "Deleted a machine." }, { status: 201 });
}
