const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
let userData = require("./api")

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

let userLog = []

app.post("/api/users", (req, res) => {
  const username = req.body.username;
  const _id = Math.round(Math.random() * 1000, 0).toString();
  userData.push({ username, _id });
  res.json({ username, _id });
});

app.post("/api/users/:_id/exercises", (req, res) => {
  const [_id, description, duration, date] = [
    req.params._id,
    req.body.description,
    parseInt(req.body.duration),
    new Date(req.body.date).toDateString(),
  ];
  const user = userLog.filter((arr)=>arr._id === _id)
  userLog.push({_id, description,duration,date})

  if(user) return res.json({
      _id,
      // username: username[0].username,
      date,
      duration,
      description,
    })
  res.json({ error: "invalid input" });
});

//get request to all user data

app.get("/api/users", (req, res) => {
  res.json(userData);
});

//get request to get log of userdata

app.get("/api/users/:_id/logs", (req, res) => {
  const _id = req.params._id;
  const user = userLog.filter((arr) => arr._id === _id);
  if(user) return res.json({
    _id: user[0]._id,
    // username: user.username,
    count: 1,
    // username:user[0].username,
    log: [
      {
        description: user[0].description,
        duration: user[0].duration,
        date: user[0].date,
      },
    ],
  })
  res.json("No data-found")
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
