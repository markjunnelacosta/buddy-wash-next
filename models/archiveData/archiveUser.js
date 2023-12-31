import { Schema, model, models } from "mongoose";

const archiveUserSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
  },
  userName: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  userAddress: {
    type: String,
  },
  userRole: {
    type: String,
  },
  userId: {
    type: String,
  },
  password: {
    type: String,
  },
  selectedBranch: {
    type: String,
  },
  deletedAt: {
    type: Date,
  },
});

const archiveUser = models.archiveUser || model("archiveUser", archiveUserSchema);

export default archiveUser;