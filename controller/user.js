const User = require("../models/user")


exports.handleGetAllUsers = async(req,res)=>{
    const users = await User.find({})
    res.status(200).json({users})
}

exports.handleUserAdd = async(req,res)=>{
    const {username} = req.body;
    await User.create(
        {
            username
        }
    )
    const newUser = await User.findOne({username})
    if(!newUser) return res.status(400).json("Username is required")
    return res.status(200).json(newUser)
}

