import { Schema, model, models } from "mongoose";

const archiveUserSchema = new Schema({

  userName: String,
  phoneNumber: String,
  userAddress: String,
  userRole: String,
  userId: String,
  password: String,
  
});

const archiveUser = models.archiveUser || model("archiveUser", archiveUserSchema);

export default archiveUser;