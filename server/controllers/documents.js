const sequenceGenerator = require("../routes/sequenceGenerator");
const Document = require("../models/document.model");

/* GET ALL */
const getAllDocuments = (req, res) => {
  Document.find({})
    .then((documents) => {
      res.status(200).json(documents);
    })
    .catch((err) => {
      res.status(500).json({
        title: "An error occurred",
        error: err,
      });
    });
};

/* ADD */
const addDocument = (req, res) => {
  const maxDocumentId = sequenceGenerator.nextId("documents");

  const document = new Document({
    id: maxDocumentId,
    name: req.body.name,
    description: req.body.description,
    url: req.body.url,
  });

  document
    .save()
    .then((createdDocument) => {
      res.status(201).json({
        message: "Document added successfully",
        document: createdDocument,
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
const updateDocument = (req, res) => {
  Document.findOne({ id: req.params.id })
    .then((document) => {
      document.name = req.body.name;
      document.description = req.body.description;
      document.url = req.body.url;
      Document.updateOne({ id: req.params.id }, document)
        .then((result) => {
          res.status(204).json({
            message: "Document updated successfully",
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
        message: "Document not found.",
        error: { document: "Document not found" },
      });
    });
};

/* DELETE */
const deleteDocument = (req, res) => {
  Document.findOneAndDelete({ id: req.params.id })
    .then((result) => {
      if (result) {
        res.status(200).json({
          message: "Document deleted successfully",
          document: result,
        });
      } else {
        res.status(404).json({
          message: "Document not found",
          error: { document: "Document not found" },
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

module.exports.getAllDocuments = getAllDocuments;
module.exports.addDocument = addDocument;
module.exports.updateDocument = updateDocument;
module.exports.deleteDocument = deleteDocument;
