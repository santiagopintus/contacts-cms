const mongoose = require("mongoose");
const Contact = require("./contact.model");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  id: String,
  subject: String,
  msgText: String,
  sender: String,
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
