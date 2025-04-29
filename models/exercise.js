const mongoose = require("mongoose");
const exerciseSchema = new mongoose.Schema({
    username:{
        type:String,
        isrequired:true
    },
    description: String,
    date: Date,
    duration: Number,
})

module.exports = mongoose.model("Exercise", exerciseSchema)