const express = require("express");
const { loginUser, registerUser, refreshToken } = require("../controllers/authController");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);

router.post("/refresh-token", (req, res) => {
  const oldToken = req.headers.authorization?.split(" ")[1];

  if (!oldToken) {
    return res.status(401).json({ message: "No token provided." });
  }

  try {
    const decoded = jwt.verify(oldToken, "your-secret-key");

    const newToken = jwt.sign(
      { id: decoded.id, role: decoded.role },
      "your-secret-key",
      { expiresIn: "1h" }
    );

    res.json({ token: newToken });
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token." });
  }
});

module.exports = router;