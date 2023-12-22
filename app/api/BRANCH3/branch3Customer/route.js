import { connectToDB } from "@/utils/database";
import Branch3Customer from "@/models/Branch3/Branch3Customer";
import { NextResponse } from "next/server";
import archiveCustomer from "@/models/archiveData/archiveCustomer"; // pang branch 3 dapat

export async function GET() {
  await connectToDB();
  const customers = await Branch3Customer.find();
  return NextResponse.json({ customers });
}

export const POST = async (req) => {
  const body = await req.json();
  const { customerName, customerNumber } = body;

  try {
    await connectToDB();
    const newCustomer = new Branch3Customer({
      customerName,
      customerNumber,
    });
    console.log(newCustomer);
    await newCustomer.save();
    return new Response(JSON.stringify(newCustomer), { status: 201 });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  try {
    await connectToDB();

    const archivedCustomer = await Branch3Customer.findById(id);

    const newArchivedCustomer = new archiveCustomer({
      customerName: archivedCustomer.customerName,
      customerNumber: archivedCustomer.customerNumber,
      deletedAt: new Date(),
    });

    await newArchivedCustomer.save();

    await Branch3Customer.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "Deleted a Record and added details to archived table" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete and add details to archived table" },
      { status: 500 }
    );
  }
}
