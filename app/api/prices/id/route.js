import { connectToDB } from "@/utils/database";
import prices from "@/models/prices";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    const { id } = params;
    const { newProductName: productName, newProductPrice: productPrice } = await request.json();
    await connectToDB();
    await prices.findByIdAndUpdate(id, { productName, productPrice });
    return NextResponse.json({ message: "Product Price Updated" }, { status: 200 });
}

export async function GET(request, { params }) {
    const { id } = params;
    await connectToDB();
    const prices = await prices.findOne({ _id: id });
    return NextResponse.json({ prices }, { status: 200 });
}