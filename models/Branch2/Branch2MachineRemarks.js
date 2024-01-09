import { Schema, model, models } from "mongoose";

const Branch2MachineRemarksSchema = new Schema({
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

const Branch2MachineRemarks =
  models.Branch2MachineRemarks ||
  model("Branch2MachineRemarks", Branch2MachineRemarksSchema);

export default Branch2MachineRemarks;
