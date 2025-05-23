const express = require("express");
const { promoteUser, getAllUsers } = require("../controllers/superAdminController");
const { authenticate, authorizeRoles } = require("../middleware/authMiddleware");

const router = express.Router();

// Get all users (superadmin only)
router.get("/users", authenticate, authorizeRoles("superadmin"), getAllUsers);

// Promote a user to admin or superadmin (superadmin only)
router.put("/promote/:userId", authenticate, authorizeRoles("superadmin"), promoteUser);

module.exports = router;
