import { Schema, model, models } from "mongoose";

const Branch2DryerRemarksSchema = new Schema({
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

const Branch2DryerRemarks =
  models.Branch2DryerRemarks ||
  model("Branch2DryerRemarks", Branch2DryerRemarksSchema);

export default Branch2DryerRemarks;
