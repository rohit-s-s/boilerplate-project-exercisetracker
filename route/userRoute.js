const express = require("express")
const router = express.Router()

const {handleGetAllUsers, handleUserAdd, handlePostExercises, handleGetLogs, } = require("../controller/user")

router.get("",handleGetAllUsers)
router.post("",handleUserAdd)
router.post("/:_id/exercises", handlePostExercises)
router.get("/:_id/logs", handleGetLogs)

module.exports = router