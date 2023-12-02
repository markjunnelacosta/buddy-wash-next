import { Schema, model, models } from "mongoose";

const InventorySchema = new Schema({
  supplyInOutId: {
    type: Schema.Types.ObjectId,
  },
  date: {
    type: String,
    required: [true, "Date is required"],
  },
  supplyName: {
    type: String,
    required: [true, "Name is  required"],
  },
  supplyId: {
    type: String,
    required: [true, "Supply Id is required"],
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
  },
  type: {
    type: String,
    required: [true, "Type is required"],
  },
});

const Branch2Inventory =
  models.Branch2Inventory || model("Branch2Inventory", InventorySchema);

export default Branch2Inventory;
