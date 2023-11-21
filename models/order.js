import { Schema, model, models } from "mongoose";

const OrderSchema = new Schema({
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
  status: {
    type: String,
    required: [false, "status is not required"],
  },
});

const Order = models.Order || model("Order", OrderSchema);

export default Order;
