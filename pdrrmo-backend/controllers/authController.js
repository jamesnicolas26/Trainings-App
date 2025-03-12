const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Login Logic
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found." });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: "Invalid credentials." });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.SECRET_KEY, { expiresIn: "1h" });

    // Return the token, approval status, and role for client use
    res.json({ token, isApproved: user.isApproved, role: user.role });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Error logging in." });
  }
};

// Register Logic
const registerUser = async (req, res) => {
  const { title, lastname, firstname, middlename, office, username, role, password } = req.body;

  if (!title || !lastname || !firstname || !username || !role || !password) {
    return res.status(400).json({ message: "All required fields must be filled." });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(409).json({ message: "Username already exists." });

    const hashedPassword = await bcrypt.hash(password, 10);

    // Automatically approve admin users
    const isApproved = role === "Admin";

    const newUser = new User({
      title,
      lastname,
      firstname,
      middlename,
      office,
      username,
      role,
      password: hashedPassword,
      isApproved,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Error registering user." });
  }
};

module.exports = { loginUser, registerUser };
