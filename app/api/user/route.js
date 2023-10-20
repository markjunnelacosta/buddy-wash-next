import { connectToDB } from "@/utils/database";
import User from "@/models/user";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  try {
    await connectToDB();
    const users = await User.find({}).populate("userName");
    const responseData = { userData: users }; 
    return new Response(JSON.stringify(responseData), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to get users" }), { status: 500 });
  }
};

export const POST = async (req) => {
  const body = await req.json();
  const { userName, phoneNumber, userAddress, userRole, userId, password } = body;
  console.log("eto baban", body);
  try {
    await connectToDB();
    const newUser = new User({
      userName,
      phoneNumber,
      userAddress,
      userRole,
      userId,
      password,
      
      
    });
    console.log(newUser);
    await newUser.save();
    return new Response(JSON.stringify(newUser), { status: 201 });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectToDB();
  await User.findByIdAndDelete(id);
  return NextResponse.json(
    { message: "Deleted a customer Record" },
    { status: 201 }
  );
}

export async function handler(req, res) {
  if (req.method === 'PUT') {
    const { id } = req.query; // Extract user ID from the URL
    const updatedUserData = req.body;

    try {
      await connectToDB();
      // Find the user by ID and update their details
      const updatedUser = await User.findByIdAndUpdate(id, updatedUserData, { new: true });

      if (updatedUser) {
        return res.status(200).json(updatedUser);
      } else {
        return res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Error updating user details' });
    }
  } else {
    return res.status(405).end(); // Method Not Allowed
  }
}