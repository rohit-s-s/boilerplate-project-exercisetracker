const express = require("express")
const router = express.Router()

const {handleGetAllUsers, handleUserAdd, handleAddExercises, } = require("../controller/user")

router.get("",handleGetAllUsers)
router.post("",handleUserAdd)
router.post("/:_id/exercises", handleAddExercises)

module.exports = router