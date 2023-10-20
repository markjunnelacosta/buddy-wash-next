import { Schema, model, models } from "mongoose";

const BranchSchema = new Schema({
    branchId: {
        type: Number,
        unique: true
    },

    branchAddress: {
        type: String,
        required: [true, "Branch Location is required"]
    }
})

// Initialize the auto-increment plugin
AutoIncrement.initialize(mongoose.connection);

// Plug in the auto-increment plugin to your schema
BranchSchema.plugin(AutoIncrement.plugin, {
    model: 'Branch',   // The name of the model
    field: 'branchId', // The field that will be auto-incremented
    startAt: 1,       // The initial value for auto-increment
    incrementBy: 1    // The increment value
});





const Branch = model('Branch', BranchSchema);

export default Branch;