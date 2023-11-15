import { Schema, model, models } from "mongoose";

const ReportSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
  },

  customerName: {
    type: String,
    required: [true, "Name is required"],
  },

  reportDate: {
    type: Date,
    required: [true, "Date is required"],
    set: function (date) {
      if (typeof date === "string") {
          return new Date(date); // Parse the string as a Date
      } else if (date instanceof Date) {
          return new Date(date.getFullYear(), date.getMonth(), date.getDate());
      }
      return date;
  },
  },

  totalAmount: {
    type: Number,
    required: [true, "Phone Number is required"],
  }

});

const Reports = models.Reports || model('Reports', ReportSchema);

export default Reports; 