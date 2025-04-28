const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
let userData = require("./api");

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

let userLog = [];

app.post("/api/users", (req, res) => {
  const { username } = req.body;
  const _id = Date.now().toString();
  if (!username) return res.status(400).json({ error: "Username required" });
  const newUser = {username,_id}
  userData.push(newUser);
  res.json(newUser);
});

app.post("/api/users/:_id/exercises", (req, res) => {
  const {description, duration, date} = req.body;
  const {_id} = req.params;

  const user = userData.find((u) => u._id === _id);
  if(!user) return res.status(400).json({error:"User not found"})

  const exerciseDate = date ? new Date(date) : new Date();
  if(isNaN(exerciseDate.getDate())) return res.status(400).json({error:"Invalid date"})

  const exercise = {
    _id, username: user.username,
    description, duration:parseInt(duration),date:exerciseDate.toDateString()
  }

  userLog.push(exercise);
  res.json({
      _id: user._id,
      username: user.username,
      date: exercise.date,
      duration: exercise.duration,
      description: exercise.description,
    });
});

//get request to all user data

app.get("/api/users", (req, res) => {
  res.json(userData);
});

//get request to get log of userdata

app.get("/api/users/:_id/logs", (req, res) => {
  const {_id} = req.params;
  const logs = userLog.filter((log) => log._id === _id);
  if (!logs.length) return res.status(400).json({error:"No exercises found for user"})
  res.json({
      _id,
      username:logs[0].username,
      count: logs.length,
      log: logs.map(({description,duration,date})=>({description,duration,date}))
    });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
