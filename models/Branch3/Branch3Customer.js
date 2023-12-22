import { Schema, model, models } from "mongoose";

const CustomerSchema = new Schema({
  customerId: {
    type: Schema.Types.ObjectId,
  },
  customerName: {
    type: String,
    required: [true, "Name is required"],
  },
  customerNumber: {
    type: String,
    required: [true, "Phone Number is required"],
  },
});

const Branch3Customer =
  models.Branch3Customer || model("Branch3Customer", CustomerSchema);

export default Branch3Customer;
