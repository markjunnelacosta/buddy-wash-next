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
});

const Machine = models.Machine || model("Machine", MachineSchema);

export default Machine;
