const mongoose = require("mongoose");

const schema = mongoose.Schema(
    {
        name:{
            type:String,
            required: [true, "Contact name is required"],
        },
        email:{
            type:String,
            trim: true,
            lowercase: true,
        },
        address:String,
        phone:String,
        favorite:Boolean,
    },
    {timestamps:true}
);

module.exports = mongoose.model("contact", schema);