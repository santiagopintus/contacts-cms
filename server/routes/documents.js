const router = require("express").Router();

/* GET home page. */
router.get("/", require("../controllers/documents"));

module.exports = router;
