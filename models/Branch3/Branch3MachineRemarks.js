import { Schema, model, models } from "mongoose";

const Branch3MachineRemarksSchema = new Schema({
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

const Branch3MachineRemarks =
  models.Branch3MachineRemarks ||
  model("Branch3MachineRemarks", Branch3MachineRemarksSchema);

export default Branch3MachineRemarks;
