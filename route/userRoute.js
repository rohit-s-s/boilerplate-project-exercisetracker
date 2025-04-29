const express = require("express")
const router = express.Router()

const {handleGetAllUsers, handleUserAdd} = require("../controller/user")

router.get("",handleGetAllUsers)
router.post("",handleUserAdd)

module.exports = router