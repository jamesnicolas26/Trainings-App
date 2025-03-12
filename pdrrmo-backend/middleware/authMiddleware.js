const jwt = require("jsonwebtoken");

// Middleware to authenticate and verify token
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded; // Attach the decoded token payload (e.g., role) to the request object
    next();
  } catch (error) {
    console.error("Authentication error:", error.message); // Log error for debugging
    res.status(403).json({ message: "Invalid or expired token." });
  }
};

// Middleware to authorize admin access
const authorizeAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "Admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};

module.exports = { authenticate, authorizeAdmin };
