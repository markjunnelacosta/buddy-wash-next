import { Schema, model, models } from "mongoose";

const DryerSchema = new Schema({
  dryerId: {
    type: Schema.Types.ObjectId,
  },
  dryerNumber: {
    type: String,
    required: [true, "Dryer number is required"],
  },
  action: {
    type: String,
    enum: ["Running", "Off"],
    default: "Off",
  },
  timer: {
    type: String,
    default: "00:00",
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

const Dryer = models.Dryer || model("Dryer", DryerSchema);

export default Dryer;
