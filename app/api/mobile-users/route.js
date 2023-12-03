import { connectToDB } from "@/utils/database";

const MobileUsers = require("@/models/mobile-users");
export const GET = async (req, res) => {
  try {
    await connectToDB();
    const mobile = await MobileUsers.find({});
    const responseData = { mobileUserData: mobile };
    return new Response(JSON.stringify(responseData), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to get mobile users" }), { status: 500 });
  }
};
