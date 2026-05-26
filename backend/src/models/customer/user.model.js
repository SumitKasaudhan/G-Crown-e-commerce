import mongoose, { Schema } from "mongoose";

const auth_Schema = new Schema({
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    profileImage:{
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    contact: {
        type: Number,
        unique: true
    },
    gender: {
        type: String
    }
},
    { timestamps: true }
);

const authModel = mongoose.model("customer", auth_Schema);

export default authModel;