import { connectToDB } from "@/utils/database";
import User from "@/models/user";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  try {
    await connectToDB();
    console.log("params", res.params.id);
    const user = await User.findOne({ userId: res.params.id });
    console.log(user);
    if (!user) return new Response("User Not Found", { status: 404 });

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};

// export const PUT = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updatedUserData = req.body;
//     await connectToDB();
//     const updatedUser = await User.findByIdAndUpdate(id, updatedUserData);
//     return new Response(JSON.stringify(updatedUser), { status: 200 });
//   } catch (error) {
//     return new Response("Internal Server Error", { status: 500 });
//   }
// };

export async function PUT(request, { params }) {
  const { id } = params;
  const { newUserName: userName, newPhoneNumber: phoneNumber, newUserAddress: userAddress, newUserRole: userRole, newUserId: userId, newPassword: password } =
    await request.json();
  await connectToDB();
  await User.findByIdAndUpdate(id, { userName, phoneNumber, userAddress, userRole, userId, password });
  return NextResponse.json(
    { message: "User Details is Updated" },
    { status: 200 }
  );
}
