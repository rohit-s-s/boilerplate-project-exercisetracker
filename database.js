const mongoose = require("mongoose");

const ConnectDB = async (MONGO_URI) => {
  return mongoose
    .connect(MONGO_URI)
    .then(() => console.log("Database connetced"))
    .catch((err) => console.error("Database connection failed", err));
};

module.exports = ConnectDB;
