const express = require("express");
const { getAllUsers } = require("../controllers/userController");
const { authenticate, authorizeAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// Apply both middlewares: authenticate first, then authorize admin
router.get("/", authenticate, authorizeAdmin, getAllUsers);

module.exports = router;
