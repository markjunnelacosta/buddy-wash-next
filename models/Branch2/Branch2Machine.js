import { Schema, model, models } from "mongoose";

const MachineSchema = new Schema({
  machineId: {
    type: Schema.Types.ObjectId,
  },
  machineNumber: {
    type: String,
    required: [true, "Machine number is required"],
  },
  action: {
    type: String,
    enum: ["Off", "Running"],
    default: "Off",
  },
  timer: {
    type: String,
    default: "0",
  },
  queue: {
    type: Number,
    default: 0,
  },
  useCount: {
    type: Number,
    required: [true, "Use count is required"],
  },
  status: {
    type: String,
    enum: ["Operational", "Under Maintenance"],
    default: "Operational",
  },
  lastUsed: {
    type: String,
    default: "0",
  },
});

const Branch2Machine =
  models.Branch2Machine || model("Branch2Machine", MachineSchema);

export default Branch2Machine;
