import { Schema, model, models } from "mongoose";
import mongoose from "mongoose";
 
const OrderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  deliveryAddress: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  weight: {
    type: String,
    required: true,
  },
  washMode: {
    type: String,
    required: true,
  },
  dryMode: {
    type: String,
    required: true,
  },
  fold: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  detergentType: {
    type: String,
    required: false,
  },
  detergentQty: {
    type: Number,
    required: false,
  },
  fabricType: {
    type: String,
    required: false,
  },
  fabricQty: {
    type: Number,
    required: false,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  paymentMode: {
    type: String,
    required: true,
  }
});
 
module.exports = mongoose.models['mobile-orders'] || mongoose.model('mobile-orders', OrderSchema);