import { Schema, model, models } from "mongoose";

const MachineReportSchema = new Schema({
  type: {
    type: String,
    required: [true, "Date is required"],
  },
  date: {
    type: String,
    required: [true, "Date is required"],
  },
  machineNumber: {
    type: Number,
    required: [true, "Machine Number is required"],
  },
  useCount: {
    type: Number,
    required: [true, "Use Count is required"],
  },
});

const MachineReport =
  models.MachineReport || model("MachineReport", MachineReportSchema);

export default MachineReport;
