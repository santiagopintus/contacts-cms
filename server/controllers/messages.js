const sequenceGenerator = require("../routes/sequenceGenerator");
const Message = require("../models/message.model");

const getAllMessages = (req, res) => {
  Message.find({})
    .then((messages) => {
      res.status(200).json(messages);
    })
    .catch((error) => {
      res.status(500).json({
        title: "An error occurred",
        error: error,
      });
    });
};

/* ADD */
const addMessage = (req, res) => {
  const maxMessageId = sequenceGenerator.nextId("messages");

  const message = new Message({
    id: maxMessageId,
    subject: req.body.subject,
    msgText: req.body.msgText,
    sender: req.body.sender,
  });

  message
    .save()
    .then((createdMessage) => {
      res.status(201).json({
        message: "Message added successfully",
        message: createdMessage,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "An error occurred",
        error: error,
      });
    });
};

/* UPDATE */
const updateMessage = (req, res) => {
  Message.findOne({ id: req.params.id })
    .populate("sender")
    .then((message) => {
      message.subject = req.body.subject;
      message.msgText = req.body.msgText;
      message.sender = req.body.sender;

      Message.updateOne({ id: req.params.id }, message)
        .then((result) => {
          res.status(204).json({
            message: "Message updated successfully",
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "An error occurred",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Message not found.",
        error: { message: "Message not found" },
      });
    });
};

/* DELETE */
const deleteMessage = (req, res) => {
  Message.findOneAndDelete({ id: req.params.id })
    .then((result) => {
      if (result) {
        res.status(200).json({
          message: "Message deleted successfully",
          message: result,
        });
      } else {
        res.status(404).json({
          message: "Message not found",
          error: { message: "Message not found" },
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "An error occurred",
        error: error,
      });
    });
};

module.exports.getAllMessages = getAllMessages;
module.exports.addMessage = addMessage;
module.exports.updateMessage = updateMessage;
module.exports.deleteMessage = deleteMessage;
