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

// export async function GET(request, { params }) {
//   const { id } = params;
//   await connectToDB();
//   const user = await User.findOne({ _id: id });
//   return NextResponse.json({ user}, { status: 200 });
// }

export async function PUT(request, { params }) {
  const { id } = params;
  const {
    newUserName: userName,
    newPhoneNumber: phoneNumber,
    newUserAddress: userAddress,
    newUserRole: userRole,
    newUserId: userId,
    newPassword: password,
    newSelectedBranch: selectedBranch,
    id: _id,
  } = await request.json();
  console.log({
    _id,
    userName,
    phoneNumber,
    userAddress,
    userRole,
    userId,
    selectedBranch,
    password,
  });
  await connectToDB();
  await User.findByIdAndUpdate(_id, {
    userName: userName,
    phoneNumber: phoneNumber,
    userAddress: userAddress,
    userRole: userRole,
    userId: userId,
    password: password,
    selectedBranch: selectedBranch,
  });
  return NextResponse.json(
    { message: "User Details is Updated" },
    { status: 200 }
  );
}
