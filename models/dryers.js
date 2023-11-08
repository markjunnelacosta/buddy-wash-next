import { Schema, model, models } from "mongoose";

const DryerSchema = new Schema({
  dryerId: {
    type: Schema.Types.ObjectId,
  },
  dryerNumber: {
    type: String,
    required: [true, "Dryer number is required"],
  },
  useCount: {
    type: Number,
    required: [true, "Use count is required"],
  },
});

const Dryer = models.Dryer || model("Dryer", DryerSchema);

export default Dryer;
