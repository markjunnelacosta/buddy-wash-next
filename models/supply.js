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
    required: [true, "Quantity of supply is required"],
  },
});

const Supply = models.Supply || model("Supply", SupplySchema);

export default Supply;
