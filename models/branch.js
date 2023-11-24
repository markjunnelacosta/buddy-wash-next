import { Schema, model, models } from "mongoose";

const BranchSchema = new Schema({
  branchId: {
    type: Schema.Types.ObjectId,
  },
  branchNumber: {
    type: Number,
    required: [true, "Branch Number is required"],
  },
  branchAddress: {
    type: String,
    required: [true, "Branch Location is required"],
  }
});

const Branch = models.Branch || model('Branch', BranchSchema);

export default Branch;
