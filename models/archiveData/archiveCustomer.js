import { Schema, model, models } from "mongoose";

const archiveCustomerSchema = new Schema({
  customerId: {
    type: Schema.Types.ObjectId,
  },
  customerName: {
    type: String,
  },
  customerNumber: {
    type: String,
  },
  deletedAt: {
    type: Date,
  },
});

const archiveCustomer = models.archiveCustomer || model("archiveCustomer", archiveCustomerSchema);

export default archiveCustomer;