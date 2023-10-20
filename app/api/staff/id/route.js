import { connectToDB } from "@/utils/database";
import staff from "@/models/staff";
import {NextResponse} from "next/server";

export async function PUT(request, {params}) {
    const {id} = params;
    const {newStaffName: staffName, newStaffNumber: staffNumber}= await request.json();
    await connectToDB();
    await staff.findByIdAndUpdate(id, {staffName, staffNumber});
    return NextResponse.json({message: "Staff Details Updated"}, {status:200});
}

export async function GET(request, { params }) {
    const { id } = params;
    await connectToDB();
    const staff = await staff.findOne({ _id: id });
    return NextResponse.json({ staff }, { status: 200 });
  }