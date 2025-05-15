const express = require('express')
const router = express.Router()
const {     
    getAllGenre,
    addNewGenre,
    getGenreById,
    updateGenre,
    deleteGenre } = require("../controllers/genreCtlr")

router.get("/", getAllGenre)
router.get("/:id", getGenreById)
router.post("/", addNewGenre)
router.put("/:id", updateGenre)
// router.delete("/", deleteGenre)


module.exports = router