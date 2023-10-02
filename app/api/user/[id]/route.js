import { connectToDB } from "@/utils/database";
import User from "@/models/user";

export const GET = async (req, res) => {
  try {
    await connectToDB();
    console.log("params", res.params.id);
    const user = await User.findOne({ userName: res.params.id });
    console.log(user);
    if (!user) return new Response("User Not Found", { status: 404 });

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};