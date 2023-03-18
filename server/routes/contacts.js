const router = require("express").Router();
const contactsController = require("../controllers/contacts");

/* GET */
router.get("/", contactsController.getAllContacts);

/* POST */
router.post("/", contactsController.addContact);

/* PUT */
router.put("/:id", contactsController.updateContact);

/* DELETE */
router.delete("/:id", contactsController.deleteContact);

module.exports = router;
