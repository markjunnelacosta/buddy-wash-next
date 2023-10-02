import { connectToDB } from "@/utils/database";
import User from "@/models/user";

export const GET = async (req, res) => {
  try {
    await connectToDB();
    const users = await User.find({}).populate("userName");
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new Response("Failed get users", { status: 500 });
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
