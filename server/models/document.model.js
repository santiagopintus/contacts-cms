const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const documentSchema = new Schema({
  id: String,
  name: String,
  url: String,
  description: String,
  children: [this],
});

const Document = mongoose.model("Document", documentSchema);

module.exports = Document;
