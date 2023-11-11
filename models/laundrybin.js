import { Schema, model, models } from "mongoose";

const LaundryBinSchema = new Schema({
    id: {
        type: Schema.Types.ObjectId,
    },
    customerName: {
        type: String,
        required: [true, "Date is required"]
    },
    orderDate: {
        type: Date,
        required: [true, "Date is required"],
        set: (date) => {
            return new Date(date.getFullYear(), date.getMonth(), date.getDate());
        },
    },
    weight: {
        type: String,
        required: [true, "Weight is required"]
    },
    washMode: {
        type: String,
        required: [true, "Wash Mode is required"]
    },
    dryMode: {
        type: String,
        required: [true, "Dry Mode is required"]
    },
    fold: {
        type: String,
    },
    colored: {
        type: String
    },
    detergent: {
        type: String
    },
    fabcon: {
        type: String
    },
    detergentQty: {
        type: Number
    },
    fabconQty: {
        type: Number
    },
    paymentMethod: {
        type: String,
        required: [true, "Payment Method is required"]
    },
    refNum: {
        type: String
    }
});

const LaundryBin = models.LaundryBin || model('LaundryBin', LaundryBinSchema);

export default LaundryBin; 