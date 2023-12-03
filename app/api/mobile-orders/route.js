import { connectToDB } from "@/utils/database";

const MobileOrders = require("@/models/mobile-orders");
export const GET = async (req, res) => {
  try {
    await connectToDB();
    const orders = await MobileOrders.find({});
    const responseData = { mobileOrders: orders };
    return new Response(JSON.stringify(responseData), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to get mobile orders" }), { status: 500 });
  }
};
