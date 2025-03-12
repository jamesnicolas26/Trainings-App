const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to authenticate and verify token
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log("Decoded Token:", decoded); // Debugging purposes
    req.user = decoded; // Attach decoded token (e.g., user ID) to the request
    next();
  } catch (error) {
    console.error("Authentication error:", error.message);
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired. Please log in again." });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(403).json({ message: "Invalid token. Access denied." });
    }
    res.status(403).json({ message: "Authentication failed." });
  }
};

// Middleware to authorize admin access based on role from database
const authorizeAdmin = async (req, res, next) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized access. User not authenticated." });
    }

    const user = await User.findById(req.user.id);
    console.log("User from DB:", user); // Debugging purposes

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (user.role.toLowerCase() !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    next(); // User is authorized, proceed to the next middleware
  } catch (error) {
    console.error("Authorization error:", error.message);
    res.status(500).json({ message: "Error verifying user role." });
  }
};

module.exports = { authenticate, authorizeAdmin };
