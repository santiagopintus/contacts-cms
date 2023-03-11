const router = require("express").Router();

/* GET home page. */
router.get("/", require("../controllers/contacts"));

module.exports = router;
