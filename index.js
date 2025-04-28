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

// let userData = [];

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
  const user = userData.filter((arr)=>arr._id === _id)
  
  if(user) return res.json({
      _id,
      username:user[0].username,
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

app.get("/api/users/:id/logs", (req, res) => {
  const id = req.params.id;
  const user = userData.filter((arr) => arr.id === id);
  res.json({
    _id: user.id,
    username: user.username,
    count: 1,
    log: [
      {
        description: user.description,
        duration: user.duration,
        date: user.date,
      },
    ],
  });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
