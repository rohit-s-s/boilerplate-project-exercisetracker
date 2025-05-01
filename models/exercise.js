const mongoose = require("mongoose");
const exerciseSchema = new mongoose.Schema({
    username:String,
    description: String,
    date: String,
    duration: Number,
})

module.exports = mongoose.model("Exercise", exerciseSchema)