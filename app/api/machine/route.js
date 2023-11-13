import { connectToDB } from "@/utils/database";
import Machine from "@/models/machines";
import { NextResponse } from "next/server";

// export async function GET() {
//   await connectToDB();
//   const machines = await Machine.find();
//   return NextResponse.json({ machines });
// }

//
export async function GET() {
  await connectToDB();
  const machines = await Machine.find();
  return NextResponse.json({ machines });
}

export const POST = async (req) => {
  const body = await req.json();
  const { machineNumber, useCount } = body;

  try {
    await connectToDB();
    const newMachine = new Machine({
      machineNumber,
      useCount,
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
