import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
  },
  username: {
    type: String,
    unique: [true, "Username already exists!"],
    required: [true, "Username is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  userAddress: {
    type: String,
    required: [true, "Address is required"],
  },
  userRole: {
    type: String,
    required: [true, "Role is required"],
  },
});

const User = models.User || model("User", UserSchema);

export default User;
