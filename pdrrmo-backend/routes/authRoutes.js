const express = require("express");
const { loginUser, registerUser } = require("../controllers/authController");

const router = express.Router();

// Simplified routes for compatibility with frontend
router.post("/login", loginUser);
router.post("/register", registerUser);

module.exports = router;
