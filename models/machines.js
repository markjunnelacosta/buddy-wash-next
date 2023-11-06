import { Schema, model, models } from "mongoose";

const MachineSchema = new Schema({
  machineId: {
    type: Schema.Types.ObjectId,
  },
  machineNumber: {
    type: String,
    required: [true, "Machine number is required"],
  },
  useCount: {
    type: Number,
    required: [true, "Use count is required"],
  },
});

const Machine = models.Machine || model("Machine", MachineSchema);

export default Machine;
