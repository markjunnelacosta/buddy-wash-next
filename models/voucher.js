import { Decimal128 } from "mongodb";
import { Schema, model, models } from "mongoose";

const VoucherSchema = new Schema({
  voucherId: {
    type: Schema.Types.ObjectId,
  },
  voucherName: {
    type: String,
    required: [true, "Voucher name is required"],
  },
  percentageOff: {
    type: Number,
    required: [true, "Percentage of voucher is required"],
  },
  minSpend: {
    type: Decimal128,
    required: [true, "Minimum spend is required"],
  },
  discountCap: {
    type: Decimal128,
    required: [true, "Discount cap is required"],
  },
  usageQuantity: {
    type: Number,
    required: [true, "Usage quantity is required"],
  },
  startTime: {
    type: Date,
    required: [true, "Start time is required"],
  },
  endTime: {
    type: Date,
    required: [true, "End time is required"],
  },
  voucherCode: {
    type: String,
    required: [true, "Voucher code is required"],
  },
});

const Voucher = models.Voucher || model("Voucher", VoucherSchema);

export default Voucher;