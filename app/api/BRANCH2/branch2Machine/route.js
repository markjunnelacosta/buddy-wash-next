import { connectToDB } from "@/utils/database";
import Branch2Machine from "@/models/Branch2/Branch2Machine";
import { NextResponse } from "next/server";
import Machines from "@/app/role/staff/machine/page";

export const GET = async (req, res) => {
  try {
    await connectToDB();
    const machines = await Branch2Machine.find({});
    // const machines = await Machine.find({ branchNumber });
    const responseData = { machineData: machines };
    return new Response(JSON.stringify(responseData), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to get Machines" }), {
      status: 500,
    });
  }
};

export const POST = async (req) => {
  const body = await req.json();
  const { machineNumber, action, timer, queue, useCount, status } = body;

  try {
    await connectToDB();
    const newMachine = new Branch2Machine({
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
  await Branch2Machine.findByIdAndDelete(id);
  return NextResponse.json({ message: "Deleted a machine." }, { status: 201 });
}

export async function PATCH(request) {
  const id = request.nextUrl.searchParams.get("id");
  const body = await request.json();
  try {
    await connectToDB();

    // Update the document with all fields from the request body
    await Branch2Machine.findByIdAndUpdate(id, body);

    console.log(id);
    return NextResponse.json(
      { message: "Updated Machine Table" },
      { status: 201 }
    );
  } catch (error) {
    return new Response(error, { status: 500 });
  }
}
