import { connectToDB } from "@/utils/database";
import Branch3Machine from "@/models/Branch3/Branch3Machine";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const {
    newMachineNumber: machineNumber,
    newAction: action,
    newTimer: timer,
    newQueue: queue,
    newUseCount: useCount,
    newStatus: status,
  } = await request.json();

  await connectToDB();

  await Branch3Machine.findByIdAndUpdate(
    id,
    {
      machineNumber,
      action,
      timer,
      queue,
      useCount,
      status,
    },
    { new: true }
  );

  return NextResponse.json(
    { message: "Machine Details Updated" },
    { status: 200 }
  );
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectToDB();
  const machine = await Branch3Machine.findOne({ _id: id }.lean);
  return NextResponse.json({ machine }, { status: 200 });
}
