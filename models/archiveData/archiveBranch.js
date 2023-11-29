import { Schema, model, models } from "mongoose";

const archiveBranchSchema = new Schema({
  branchId: {
    type: Schema.Types.ObjectId,
  },
  branchNumber: {
    type: Number,
  },
  branchAddress: {
    type: String,
  },
  deletedAt: {
    type: Date,
  },
});

const archiveBranch = models.archiveBranch || model('archiveBranch', archiveBranchSchema);

export default archiveBranch;
