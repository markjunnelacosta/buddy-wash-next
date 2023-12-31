import { Schema, model, models } from "mongoose";

const MachineRemarksSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
  },
  date: {
    type: String,
    required: [true, "Date is required"],
  },
  number: {
    type: String,
    required: [true, "Type is required"],
  },
  remarks: {
    type: String,
    required: [true, "Type is required"],
  },
});

const MachineRemarks =
  models.MachineRemarks || model("MachineRemarks", MachineRemarksSchema);

export default MachineRemarks;
