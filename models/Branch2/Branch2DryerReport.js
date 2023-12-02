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

const DryerReport =
  models.DryerReport || model("DryerReport", DryerReportSchema);

export default DryerReport;
