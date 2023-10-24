import { Schema, model, models } from "mongoose";

const pricesSchema = new Schema({
  pricesId: {
    type: Schema.Types.ObjectId,
  },
  productName: {
    type: String,
    required: [true, "Product name is required"],
  },
  productPrice: {
    type: String,
    required: [true, "Price is required"],
  }
  
});

const prices = models.staff || model("Prices", pricesSchema);

export default prices;