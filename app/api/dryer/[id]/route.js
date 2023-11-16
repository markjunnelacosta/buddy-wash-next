import { connectToDB } from "@/utils/database";
import Dryer from "@/models/dryers";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const {
    newDryerNumber: dryerNumber,
    newAction: action,
    newTimer: timer,
    newQueue: queue,
    newUseCount: useCount,
    newStatus: status,
  } = await request.json();

  await connectToDB();

  await Dryer.findByIdAndUpdate(id, {
    dryerNumber,
    action,
    timer,
    queue,
    useCount,
    status,
  }, { new: true });

  return NextResponse.json({ message: "Dryer Details Updated" }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectToDB();
  const dryer = await Dryer.findOne({ _id: id }).lean();
  return NextResponse.json({ dryer }, { status: 200 });
}
