const User = require("../models/user");
const Exercise = require("../models/exercise");
const Log = require("../models/log");

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

exports.handlePostExercises = async (req, res) => {
  const { _id } = req.params;
  const user = await User.findOne({ _id });
  if (!user) return res.status(400).json("No User found");
  const username = user.username;
  let { description, duration, date } = req.body;

  let parseDate = new Date(date);
  date = isNaN(parseDate.getTime())
    ? new Date().toDateString()
    : parseDate.toDateString();

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
  //Updates the count values by one while a new exercise data is being added
  const logs = await Log.findOneAndUpdate(
    { _id },
    //Update the count values by one
    { $inc: { count: 1 },
    username : username,
    //Add the new exercise data into the log
      $push : {log:{description:description,duration:duration,date:date}}},
    { new: true, upsert: true }
  ); // ensure updated doc is returned or created
  logs ? console.log(logs) : console.error("Log update failed");
  
  return res.status(200).json(exercise);
};



//Display id, username, count and log in json 
exports.handleGetLogs = async (req, res) => {
  const { _id } = req.params;
  const logData = await Log.findOne({_id})
  return res.status(200).json(logData)
};
