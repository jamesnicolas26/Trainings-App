require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const { authenticate } = require("./middleware/authMiddleware");
const trainingTitleRoute = require("./routes/trainingTitles");
const officeRoutes = require('./routes/officeRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: "http://localhost:3000" })); // Allow requests from the frontend
app.use(express.json());

// Serve the frontend build files
const buildPath = path.join(__dirname, "../pdrrmo-training/build"); // Adjust path to the correct location
app.use(express.static(buildPath));

// Adjust the route paths for backend API routes
app.use("/api/offices", officeRoutes);
app.use("/offices", officeRoutes);
app.use("/", authRoutes); // Handles /login and /register
app.use("/api/users", authenticate, userRoutes); // Protected user-related routes
app.use("/api/training-titles", trainingTitleRoute); // Training titles route

// Middleware for large payloads
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Catch-All for React frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
