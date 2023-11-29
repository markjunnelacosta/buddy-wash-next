import { connectToDB } from "@/utils/database";
import User from "@/models/user";
import { NextResponse } from "next/server";
import archiveUser from "@/models/archiveData/archiveUser";

export const GET = async (req, res) => {
  try {
    await connectToDB();
    const users = await User.find({});
    const responseData = { userData: users };
    return new Response(JSON.stringify(responseData), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to get users" }), { status: 500 });
  }
};


export const POST = async (req) => {
  const body = await req.json();
  const { userName, phoneNumber, userAddress, userRole, userId, password, selectedBranch } = body;
  try {
    await connectToDB();
    const newUser = new User({
      userName,
      phoneNumber,
      userAddress,
      userRole,
      userId,
      password,
      selectedBranch
    });
    console.log(newUser);
    await newUser.save();
    return new Response(JSON.stringify(newUser), { status: 201 });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};

// export async function DELETE(request) {
//   const id = request.nextUrl.searchParams.get("id");
//   await connectToDB();
//   await User.findByIdAndDelete(id);
//   return NextResponse.json(
//     { message: "Deleted a user Record" },
//     { status: 201 }
//   );
// }

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  try {
    await connectToDB();

    // Find the user to be deleted
    const archivedUser = await User.findById(id);

    // Create a new DeletedUser object with the details of the deleted user
    const newArchivedUser = new archiveUser({
      userName: archivedUser.userName,
      phoneNumber: archivedUser.phoneNumber,
      userAddress: archivedUser.userAddress,
      userRole: archivedUser.userRole,
      userId: archivedUser.userId,
      password: archivedUser.password,
      selectedBranch: archivedUser.selectedBranch,
      deletedAt: new Date(), // You can add a timestamp to track when the user was deleted
    });

    // Save the newDeletedUser to the DeletedUsers table
    await newArchivedUser.save();

    // Delete the user from the User table
    await User.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "Deleted a user Record and added details to DeletedUsers table" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete user and add details to DeletedUsers table" },
      { status: 500 }
    );
  }
}