const express = require('express')
const router = express.Router()
const { getAllauthors, addNewAuthors, getAuthorById, updateAuthor, deleteAuthor } = require("../controllers/authorCtlr")

router.get("/", getAllauthors)
router.get("/:id", getAuthorById)
router.post("/", addNewAuthors)
router.put("/:id", updateAuthor)
router.delete("/", deleteAuthor)


module.exports = router