const express = require('express')
const router = express.Router()
const {     
    getAllBooks,
    getBookById,
    addNewBook,
    updateBook,
    deleteBook, } = require("../controllers/bookCtlr")

router.get("/", getAllBooks)
router.get("/:id", getBookById)
router.post("/", addNewBook)
router.put("/:id", updateBook)
router.delete("/", deleteBook)


module.exports = router