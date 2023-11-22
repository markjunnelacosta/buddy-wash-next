import { connectToDB } from "@/utils/database";
import Supply from "@/models/supply";
import { NextResponse } from "next/server";

export async function PATCH(request) {
    const { id } = request.params;
    const body = await request.json();
    const { quantity } = body; // Assuming the quantity is passed in the request body
    try {
      await connectToDB();
  
      // Update availableStock by subtracting the quantity
      await Supply.findByIdAndUpdate(id, {
        $inc: { availableStock: -quantity },
      });
  
      return new Response(
        JSON.stringify({ message: "Updated Supply Record" }),
        { status: 201, headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }