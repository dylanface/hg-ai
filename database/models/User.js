import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    googleId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    transactionIds: {
        type: Array,
        required: true,
        default: []
    },
    saveIds: {
        type: Array,
        required: true,
        default: []
    },
    trust: {
        type: Object,
        required: true,
        default: {
            trust: 0,
            trustHistory: []
        }
    }
});

export default mongoose.Model('User', UserSchema, 'users');