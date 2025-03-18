const express = require("express");
const {
  getAllUsers,
  approveUser,
  deleteUser,
  getUserById,
  updateUserById, // Controller for editing a user
} = require("../controllers/userController");
const { authenticate, authorizeAdmin, protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Get all users (admin only)
router.get("/", authenticate, getAllUsers);

// Approve a user by ID
router.put("/approve/:id", protect, approveUser);

// Edit a user by ID
router.put("/:id", authenticate, updateUserById);

// Get a single user by ID (for editing purposes)
router.get("/:id", protect, getUserById);

// Delete a user by ID
router.delete("/:id", protect, deleteUser);

module.exports = router;
