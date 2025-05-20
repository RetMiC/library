const express = require('express')
const router = express.Router()
const {     
    getAllPublisher,
    addNewPublisher,
    getPublisherById,
    updatePublisher,
    deletePublisher } = require("../controllers/publisherCtlr")

router.get("/", getAllPublisher)
router.get("/:id", getPublisherById)
router.post("/", addNewPublisher)
router.put("/:id", updatePublisher)
router.delete("/", deletePublisher)


module.exports = router