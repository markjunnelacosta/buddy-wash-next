import { connectToDB } from "@/utils/database";
import User from "@/models/user";

export const GET = async (req, res) => {
  try {
    await connectToDB();
    const users = await User.find({}).populate("userName");
    const responseData = { userData: users }; 
    return new Response(JSON.stringify(responseData), { status: 200 });
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

// export default async function handler(req, res) {
//   if (req.method === 'PUT') {
//     const userId = req.query.id; // Access the user ID from the query parameters

//     try {
//       await connectToDB();
//       const updatedUserData = req.body; // Updated user data from the frontend
//       const user = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });

//       if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//       }

//       return res.status(200).json(user);
//     } catch (error) {
//       return res.status(500).json({ message: 'Internal server error', error: error.message });
//     }
//   } else {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }
// }

export const PUT = async (req, res) => {
    const userId = req.query.id; // Access the user ID from the query parameters

    try {
      await connectToDB();
      const updatedUserData = req.body; // Updated user data from the frontend
      const user = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json(user);
    } 
    
    catch (error) {
      return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}