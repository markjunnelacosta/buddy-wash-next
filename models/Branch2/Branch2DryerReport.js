import { Schema, model, models } from "mongoose";

const DryerReportSchema = new Schema({
  date: {
    type: String,
    required: [true, "Date is required"],
  },
  dryerNumber: {
    type: Number,
    required: [true, "Dryer Number is required"],
  },
  useCount: {
    type: Number,
    required: [true, "Use Count is required"],
  },
});

const Branch2DryerReport =
  models.Branch2DryerReport || model("Branch2DryerReport", DryerReportSchema);

export default Branch2DryerReport;
