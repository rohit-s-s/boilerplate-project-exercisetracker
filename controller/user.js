const User = require("../models/user");
const Exercise = require("../models/exercise");
const Log = require("../models/log")

exports.handleGetAllUsers = async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
};

exports.handleUserAdd = async (req, res) => {
  const { username } = req.body;
  let user = await User.findOne({ username });
  if (!user) {
    user = await User.create({ username });
  }
  return res.status(200).json(user);
};

exports.handleAddExercises = async (req, res) => {
  const { _id } = req.params;
  const user = await User.findOne({ _id });
  if (!user) return res.status(400).json("No User found");
  const username = user.username;
  let { description, duration, date } = req.body;
  let exercise = await Exercise.findOne({ _id });
  if (!exercise) {
    exercise = await Exercise.create({
      _id,
      username,
      duration,
      description,
      date,
    });
  }
  return res.status(200).json(exercise);
};
