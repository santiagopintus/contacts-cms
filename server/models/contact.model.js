const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  group: [{ type: mongoose.Schema.Types.ObjectId, ref: "Contact" }],
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
