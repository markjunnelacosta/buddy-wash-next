import { connectToDB } from "@/utils/database";
import Voucher from "@/models/voucher";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDB();
  const vouchers = await Voucher.find();
  return NextResponse.json({ vouchers });
}

export const POST = async (req) => {
  const body = await req.json();
  const { voucherName, percentageOff, minSpend, discountCap, usageQuantity, startTime, endTime, voucherCode } = body;

  try {
    await connectToDB();
    const newVoucher = new Voucher({
      voucherName, 
      percentageOff, 
      minSpend, 
      discountCap, 
      usageQuantity, 
      startTime, 
      endTime, 
      voucherCode
    });
    console.log(newVoucher);
    await newVoucher.save();
    return new Response(JSON.stringify(newVoucher), { status: 201 });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectToDB();
  await Voucher.findByIdAndDelete(id);
  return NextResponse.json(
    { message: "Deleted a Voucher Record" },
    { status: 201 }
  );
}

export async function PATCH(request) {
  const id = request.nextUrl.searchParams.get("id");
//   const body = await request.json();
//   const { availableStock } = body;
  try {
    await connectToDB();
    await Voucher.findByIdAndUpdate(id);
    console.log(id);
    return NextResponse.json(
      { message: "Updated Voucher Record" },
      { status: 201 }
    );
  } catch (error) {
    return new Response(error, { status: 500 });
  }
}

