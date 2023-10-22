// import { Schema, model, models } from "mongoose";


// const BranchSchema = new Schema({
//     branchId: {
//         type: String,
//         required: true
//     },

//     sequece_value: {
//         type: Number,
//         default: 1
//     },

//     branchAddress: {
//         type: String,
//         required: [true, "Branch Location is required"]
//     },

//     numberOfStaff: {
//         type: Number
//     }
// })

// // Plug in the auto-increment plugin to your schema
// BranchSchema.plugin(AutoIncrement.plugin, {
//     model: 'Branch',   // The name of the model
//     field: 'branchId', // The field that will be auto-incremented
//     startAt: 1,       // The initial value for auto-increment
//     incrementBy: 1    // The increment value
// });

// const Branch = model.Branch || model("Branch", BranchSchema)

// export default Branch;

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const BranchSchema = new Schema({
  branchId: {
    type: String,
    required: true,
  },
  branchAddress: {
    type: String,
    required: [true, "Branch Location is required"],
  },
  numberOfStaff: {
    type: Number,
  },
});

// Define a function to generate the next branch ID
const generateNextBranchId = async () => {
  const lastBranch = await Branch.findOne({}, {}, { sort: { branchId: -1 } });
  if (lastBranch) {
    const lastId = parseInt(lastBranch.branchId.split(' ')[1]);
    return `branch ${lastId + 1}`;
  } else {
    // If no branches exist, start with 1
    return 'branch 1';
  }
};

// Pre-save hook to generate the branch ID before saving
BranchSchema.pre('save', async function (next) {
  if (!this.branchId) {
    this.branchId = await generateNextBranchId();
  }
  next();
});

const Branch = mongoose.models.Branch || mongoose.model('Branch', BranchSchema);

export default Branch;
