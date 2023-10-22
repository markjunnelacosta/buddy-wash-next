import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
  },
  userName: {
    type: String,
    required: [true, "Username is required"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone Number is required"],
  },
  userAddress: {
    type: String,
    required: [true, "Address is required"],
  },
  userRole: {
    type: String,
    required: [true, "Role is required"],
  },
  userId: {
    type: String,
    unique: [true, "User ID already exists!"],
    required: [true, "User ID is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  }
  
});

const User = models.User || model("User", UserSchema);

export default User;