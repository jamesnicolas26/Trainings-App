const User = require("../models/User"); // Ensure the correct model is imported

const getAllUsers = async (req, res) => {
  try {
    // Fetch all users except passwords
    const users = await User.find({}, "-password");
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ message: "Error fetching users." });
  }
};

module.exports = { getAllUsers };
