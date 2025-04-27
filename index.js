const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

let userData = [];

app.post("/api/users", (req, res) => {
  const username = req.body.username;
  const _id = Math.round(Math.random()*1000,0).toString()
  userData.push({username,_id})
  res.json({username,_id})
});



app.post("/api/users/:_id/exercises", (req, res) => {
  const [_id, description, duration, date] = [
    req.params._id,
    req.body.description,
    req.body.duration,
    new Date(req.body.date).toDateString(),
  ];
  userData.forEach((arr,i)=>{
    var username = arr.username
    if(arr._id === _id) {return res.json({
      _id,
      username,
      date,
      duration,
      description,
    })};
    res.json({"error":"invalid input"})
  })
 
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
