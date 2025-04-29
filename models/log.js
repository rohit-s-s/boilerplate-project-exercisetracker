const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
    username:String,
    count:Number,
    log:[
        {
            description:String,
            duration:Number,
            date:Date
        }
    ]
});

module.exports = mongoose.model("Log", logSchema)