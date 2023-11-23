import { Schema, model, models } from "mongoose";

const PriceSchema = new Schema({
    id: {
        type: Schema.Types.ObjectId,
    },
    modeName: {
        type: String,
        required: [true, "Mode Name is required"],
    },
    category: {
        type: String,
        required: [true, "Category is required"],
    },
    price: {
        type: Number,
        required: [true, "Machine Number is required"],
    },
});

const Price = models.Price || model("Price", PriceSchema);

export default Price;