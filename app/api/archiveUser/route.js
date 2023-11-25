import { connectToDB } from "@/utils/database";
import express from 'express';
import User from "@/models/user";
import archiveUser from "@/models/archiveData/archiveUser";
import { NextResponse } from "next/server";

const router = express.Router();

// Archive user endpoint
router.delete("/api/archiveUser", async (req, res) => {
    const userId = req.query.id;
  
    try {
      // Fetch user data
      const user = await User.findById(userId);
  
      // Create an archived user in the archive collection
      const archivedUser = new archiveUser({
        userName: user.userName,
        phoneNumber: user.phoneNumber,
        userAddress: user.userAddress,
        userRole: user.userRole,
        userId: user.userId,
        password: user.password
      });
  
      // Save the archived user
      await archivedUser.save();
  
      // Remove the user from the main user collection
      await User.findByIdAndDelete(userId);
  
      res.status(204).end(); // Success, no content
    } catch (error) {
      console.error("Error archiving user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  module.exports = router;