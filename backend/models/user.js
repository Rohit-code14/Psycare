const mongoose = require("mongoose")
const validator = require("validator")

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,"Please Provide Name"],
        maxlength:[40, "Name can only contain maximum of 40 characters"]
    },
    email:{
        type: String,
        required: [true, "Please Provide an email ID"],
        unique:true,
        validate: validator.isEmail
    },
    password: {
        type: String,
        required: [true, "Please enter password"],
    },
    contact: {
        type: Number,
    },
    health: {
        score:{
            type:Number
        },
        description:{
            type: String,
            maxlength: 250
        }
    },
    dob: {
        type: Date
    }
})

module.exports = mongoose.model("User", userSchema);