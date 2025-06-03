const express = require('express')
const router = express.Router()
const authenticate = require("../middlewares/authMiddleware");
const {     
    getAllUser,
    getUserById,
    registrationUser,
    loginUser,
    updateUser,
    deleteUser, } = require("../controllers/userCtlr")

router.get("/", authenticate, getAllUser)
router.get("/:id", authenticate, getUserById)
router.post("/registration", registrationUser)
router.post("/login", loginUser)
router.put("/:id", authenticate, updateUser)
router.delete("/", authenticate, deleteUser)


module.exports = router