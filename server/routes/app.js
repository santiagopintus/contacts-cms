const router = require("express").Router();
const path = require("path");

/* GET home page. */
router.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../dist/cms/index.html"));
});
router.use("/documents", require("./documents"));
router.use("/messages", require("./messages"));
router.use("/contacts", require("./contacts"));

module.exports = router;
