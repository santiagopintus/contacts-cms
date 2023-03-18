const router = require("express").Router();
const {
  getAllDocuments,
  addDocument,
  updateDocument,
  deleteDocument,
} = require("../controllers/documents");

// GET all documents
router.get("/", getAllDocuments);

// POST new document
router.post("/", addDocument);

// PUT update document
router.put("/:id", updateDocument);

// DELETE document
router.delete("/:id", deleteDocument);

module.exports = router;
