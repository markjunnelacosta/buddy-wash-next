// import { connectToDB } from "@/utils/database";
// import MobileOrder

// export const GET = async (req, res) => {
//     try {
//       await connectToDB();
//       console.log("params", res.params.id);
//       const report = await MobileUsers.findOne({ _id : res.params.id });
//       console.log(report);
//       if (!report) return new Response("Mobile Users Not Found", { status: 404 });
  
//       return new Response(JSON.stringify(report), { status: 200 });
//     } catch (error) {
//       return new Response("Internal Server Error", { status: 500 });
//     }
//   };