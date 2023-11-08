import { connectToDB } from "@/utils/database";
import Dryer from "@/models/dryers";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    const { id } = params;
    const { newDryerNumber: dryerNumber, newUseCount: useCount } = await request.json();
    await connectToDB();
    await Dryer.findByIdAndUpdate(id, { dryerNumber, useCount });
    return NextResponse.json({ message: "Dryer Details Updated" }, { status: 200 });
}

export async function GET(request, { params }) {
    const { id } = params;
    await connectToDB();
    const dryer = await Dryer.findOne({ _id: id });
    return NextResponse.json({ dryer }, { status: 200 });
}
