const router = require("express").Router();
const {
  getAllMessages,
  addMessage,
  updateMessage,
  deleteMessage,
} = require("../controllers/messages");

/* GET all messages */
router.get("/", getAllMessages);

/* POST a new message */
router.post("/", addMessage);

/* PUT update a message */
router.put("/:id", updateMessage);

/* DELETE a message */
router.delete("/:id", deleteMessage);

module.exports = router;
