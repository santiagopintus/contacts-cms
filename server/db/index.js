require("dotenv").config();
const mongoose = require("mongoose");

/* Defining the connection */
const uri = process.env.MONGODB_URI;
/* Check if the URI exists before trying to connect */
if (!uri) {
  throw new Error("MONGODB_URI environment variable not set");
}

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to Database");
});
/* Exporting the connection */
module.exports = db;
