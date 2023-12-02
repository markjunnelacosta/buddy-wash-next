import { Schema, model, models } from "mongoose";

const SupplySchema = new Schema({
  supplyId: {
    type: Schema.Types.ObjectId,
  },
  supplyName: {
    type: String,
    required: [true, "Supply name is required"],
  },
  availableStock: {
    type: Number,
    required: [false, "Quantity of supply is not required"],
  },
  productPrice: {
    type: Number,
    required: [true, "Price is required"],
  },
});

const Supply = models.Supply || model("Supply", SupplySchema);

export default Supply;
