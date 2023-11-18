import { Schema, model, models } from "mongoose";
import mongoose from "mongoose";
 
const UserSchema = new Schema({
    firstName: {
    type: String,
    required: true
    },
    lastName: {
    type: String,
    required: true
    },
    email: {
    type: String,
    required: true,
    unique: true
    },
    password: {
    type: String,
    required: true 
    }
});

module.exports = mongoose.model('mobile-users', UserSchema);