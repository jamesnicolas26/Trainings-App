const User = require("../models/User"); // Ensure "User" matches the filename exactly

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users." });
  }
};

// Other CRUD methods like updateUser, deleteUser, etc., can go here

module.exports = { getAllUsers };
