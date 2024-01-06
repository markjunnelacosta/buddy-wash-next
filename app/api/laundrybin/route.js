import { connectToDB } from "@/utils/database";
import LaundryBin from "@/models/laundrybin";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
    try {
        await connectToDB();
        const order = await LaundryBin.find({});
        const responseData = { laundryData: order };
        return new Response(JSON.stringify(responseData), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to get laundry order" }), { status: 500 });
    }
};

export const POST = async (req) => {
    const body = await req.json();
    const {
        type,
        customerName,
        orderDate,
        weight,
        washMode,
        dryMode,
        fold,
        colored,
        detergent,
        fabCon,
        detergentQty,
        fabConQty,
        paymentMethod,
        totalAmount
    } = body;
    try {
        await connectToDB();
        const newOrder = new LaundryBin({
            type,
            customerName,
            orderDate,
            weight,
            washMode,
            dryMode,
            fold,
            colored,
            detergent,
            fabCon,
            detergentQty,
            fabConQty,
            paymentMethod,
            totalAmount
        });
        console.log(newOrder);
        await newOrder.save();
        return new Response(JSON.stringify(newOrder), { status: 201 });
    } catch (error) {
        return new Response(error, { status: 500 });
    }
};