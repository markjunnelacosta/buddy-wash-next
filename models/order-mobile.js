import { Schema, model, models } from "mongoose";

const OrderMobileSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
  },
  date: {
    type: String,
    required: [true, "Date is required"],
  },
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  machineNo: {
    type: Number,
    required: [true, "Machine Number is required"],
  },
  machineAction: {
    type: String,
    required: [false, "Action is not required"],
  },
  machineTimer: {
    type: String,
    required: [false, "Timer is not required"],
  },
  machine: {
    type: Schema.Types.ObjectId,
    ref: "Machine",
  },
  dryerNo: {
    type: Number,
    required: [true, "Dryer Number is required"],
  },
  dryerAction: {
    type: String,
    required: [false, "Action is not required"],
  },
  dryerTimer: {
    type: String,
    required: [false, "Timer is not required"],
  },
  dryer: {
    type: Schema.Types.ObjectId,
    ref: "Dryer",
  },
  status: {
    type: String,
    required: [false, "status is not required"],
  },
});

const OrderMobile = models.OrderMobile || model("Order", OrderMobileSchema);

export default OrderMobile;
