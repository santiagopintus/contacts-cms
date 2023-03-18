const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sequenceSchema = new Schema({
  maxDocumentId: { type: Number, default: 0 },
  maxMessageId: { type: Number, default: 0 },
  maxContactId: { type: Number, default: 0 },
});

const Sequence = mongoose.model("Sequence", sequenceSchema);

module.exports = Sequence;
