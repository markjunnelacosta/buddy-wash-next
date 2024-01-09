import { Schema, model, models } from "mongoose";

const Branch3DryerRemarksSchema = new Schema({
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

const Branch3DryerRemarks =
  models.Branch3DryerRemarks ||
  model("Branch3DryerRemarks", Branch3DryerRemarksSchema);

export default Branch3DryerRemarks;
