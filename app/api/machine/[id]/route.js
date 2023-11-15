import { connectToDB } from "@/utils/database";
import Machine from "@/models/machines";
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

  await Machine.findByIdAndUpdate(id, {
    machineNumber,
    action,
    timer,
    queue,
    useCount,
    status,
  });

  return NextResponse.json({ message: "Machine Details Updated" }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectToDB();
  const machine = await Machine.findOne({ _id: id });
  return NextResponse.json({ machine }, { status: 200 });
}
