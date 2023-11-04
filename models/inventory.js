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
    required: [false, "Name is not required"],
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

const Inventory = models.Inventory || model("Inventory", InventorySchema);

export default Inventory;
