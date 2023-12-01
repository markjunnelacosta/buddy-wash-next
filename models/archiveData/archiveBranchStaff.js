import { Schema, model, models } from "mongoose";

const archiveBranchStaffSchema = new Schema({

  id: {
    type: Schema.Types.ObjectId,
  },
  staffName: {
    type: String,
  },
  staffAddress: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  staffPosition: {
    type: String,
  },
  selectedBranch: {
    type: String,
  },
  staffBranchId: {
    type: String
  },
  deletedAt: {
    type: Date,
  },
})

const archiveBranchStaff = models.archiveBranchStaff || model('archiveBranchStaff', archiveBranchStaffSchema);

export default archiveBranchStaff;
