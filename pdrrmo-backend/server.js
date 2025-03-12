require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const { authenticate } = require("./middleware/authMiddleware");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: "http://localhost:3000" })); // Allow requests from the frontend
app.use(express.json());

// Adjust the route paths for frontend compatibility
app.use("/", authRoutes); // Handles /login and /register
app.use("/api/users", authenticate, userRoutes); // Protected user-related routes

// Catch-All for Invalid Routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
