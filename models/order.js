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
    required: [true, "Action is required"],
  },
  machineTimer: {
    type: String,
    required: [true, "Timer is required"],
  },
  dryerNo: {
    type: Number,
    required: [true, "Dryer Number is required"],
  },
  dryerAction: {
    type: String,
    required: [true, "Action is required"],
  },
  dryerTimer: {
    type: String,
    required: [true, "Timer is required"],
  },
  status: {
    type: String,
    required: [false, "status is not required"],
  },
});

const Order = models.Order || model("Order", OrderSchema);

export default Order;
