const router = require("express").Router();

/* GET home page. */
router.get("/", require("../controllers/messages"));

module.exports = router;
