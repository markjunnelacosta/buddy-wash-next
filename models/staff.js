import { Schema, model, models } from "mongoose";

const staffSchema = new Schema({
  staffId: {
    type: Schema.Types.ObjectId,
  },
  staffName: {
    type: String,
    required: [true, "Name is required"],
  },
  staffNumber: {
    type: String,
    required: [true, "Phone Number is required"],
  }
  
});

const staff = models.staff || model("Staff", staffSchema);

export default staff;