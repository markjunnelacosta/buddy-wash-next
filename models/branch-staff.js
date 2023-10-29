import { Schema, model, models } from "mongoose";

const BranchStaffSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
  },
  staffName: {
    type: String,
    required: [true, "Staff Name is required"],
  },
  staffAddress: {
    type: String,
    required: [true, "Staff Address is required"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Staff Phone Number is required"],
  },
  staffPosition: {
    type: String,
    required: [true, "Staff Position Number is required"],
  },
});

const BranchesStaff = models.BranchesStaff || model('BranchesStaff', BranchStaffSchema);

export default BranchesStaff;