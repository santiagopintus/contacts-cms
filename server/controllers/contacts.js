const sequenceGenerator = require("../routes/sequenceGenerator");
const Contact = require("../models/contact.model");

const getAllContacts = (req, res) => {
  Contact.find({})
    .populate("group")
    .then((contacts) => {
      res.status(200).json(contacts);
    })
    .catch((error) => {
      res.status(500).json({
        title: "An error occurred",
        error: error,
      });
    });
};

/* ADD */
const addContact = (req, res) => {
  const contact = new Contact({
    id: sequenceGenerator.nextId("contacts"),
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    imageUrl: req.body.imageUrl,
    group: req.body.group,
  });

  contact
    .save()
    .then((createdContact) => {
      res.status(201).json({
        contact: "Contact added successfully",
        contact: createdContact,
      });
    })
    .catch((error) => {
      res.status(500).json({
        contact: "An error occurred",
        error: error,
      });
    });
};

/* UPDATE */
const updateContact = (req, res) => {
  Contact.findOne({ id: req.params.id })
    .then((contact) => {
      contact.name = req.body.name;
      contact.email = req.body.email;
      contact.phone = req.body.phone;
      contact.imageUrl = req.body.imageUrl;
      contact.group = req.body.group;

      Contact.updateOne({ id: req.params.id }, contact)
        .then((result) => {
          res.status(204).json({
            contact: "Contact updated successfully",
          });
        })
        .catch((error) => {
          res.status(500).json({
            contact: "An error occurred",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        contact: "Contact not found.",
        error: { contact: "Contact not found" },
      });
    });
};

/* DELETE */
const deleteContact = (req, res) => {
  Contact.findOneAndDelete({ id: req.params.id })
    .then((result) => {
      if (result) {
        res.status(200).json({
          contact: "Contact deleted successfully",
          contact: result,
        });
      } else {
        res.status(404).json({
          contact: "Contact not found",
          error: { contact: "Contact not found" },
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        contact: "An error occurred",
        error: error,
      });
    });
};

module.exports.getAllContacts = getAllContacts;
module.exports.addContact = addContact;
module.exports.updateContact = updateContact;
module.exports.deleteContact = deleteContact;
