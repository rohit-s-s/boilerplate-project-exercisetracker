const mongoose = require("mongoose")

let userSchema = new mongoose.Schema({
    username: {
        type:String,
        isrequired:true
    }
})


module.exports = mongoose.model("UserData", userSchema)