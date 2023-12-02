import { connectToDB } from "@/utils/database";
import Voucher from "@/models/voucher";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    const { id } = params;
    const { newVoucherName: voucherName, newPercentageOff: percentageOff, newMinSpend: minSpend, newDiscountCap: discountCap, newUsageQuantity: usageQuantity, newStartTime: startTime, newEndTime: endTime, newVoucherCode: voucherCode } =
        await request.json();
    await connectToDB();
    await Voucher.findByIdAndUpdate(id, { voucherName, percentageOff, minSpend, discountCap, usageQuantity, startTime, endTime, voucherCode });
    return NextResponse.json(
        { message: "Voucher Details Updated" },
        { status: 200 }
    );
}

export async function GET(request, { params }) {
    const { id } = params;
    await connectToDB();
    const voucher = await Voucher.findOne({ _id: id });
    return NextResponse.json({ voucher }, { status: 200 });
}
 