require('dotenv').config(); // For environment variables
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000; // Allow port to be configurable
const MONGO_URI = process.env.MONGO_URI;
const SECRET_KEY = process.env.SECRET_KEY; // Use default for development

// Middleware
app.use(cors({ origin: 'http://localhost:3000' })); // Allow requests from the frontend origin
app.use(express.json());

// MongoDB connection
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err.message));

// User Schema
const userSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Add `required: true` for mandatory fields
    lastname: { type: String, required: true },
    firstname: { type: String, required: true },
    middlename: { type: String, default: "" },
    office: { type: String, default: "" },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  });
  
  

const User = mongoose.model('User', userSchema);

// Routes

// Fetch All Users
// Fetch All Users
app.get('/api/users', async (req, res) => {
    try {
      const users = await User.find({}, {
        title: 1,
        lastname: 1,
        firstname: 1,
        middlename: 1,
        office: 1,
        username: 1,
        email: 1,
        _id: 1,
      }); // Fetch all fields to be displayed
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error.message);
      res.status(500).json({ message: 'Error fetching users' });
    }
  });

  // Fetch Single User by ID
  app.get('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    console.log("Received ID:", id); // Log the ID received from frontend
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error(`Invalid ObjectId: ${id}`);
      return res.status(400).json({ message: 'Invalid user ID.' });
    }
  
    try {
      const user = await User.findById(id);
      if (!user) {
        console.error(`No user found for ID: ${id}`);
        return res.status(404).json({ message: 'User not found.' });
      }
      console.log("User found:", user);
      res.json(user);
    } catch (err) {
      console.error("Error fetching user:", err.message);
      res.status(500).json({ message: 'Error fetching user.' });
    }
  });

// Register Route
app.post('/register', async (req, res) => {
    const {
      title,
      lastname,
      firstname,
      middlename,
      office,
      username,
      email,
      password,
    } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: 'User already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({
        title,
        lastname,
        firstname,
        middlename,
        office,
        username,
        email,
        password: hashedPassword,
      });
  
      await newUser.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error registering user:', error.message);
      res.status(500).json({ message: 'Error registering user' });
    }
  });
  

// Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Error logging in:', error.message);
    res.status(500).json({ message: 'Error logging in' });
  }
});

// Edit User Route
app.put('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const { password, ...updateData } = req.body; // Extract password and other fields

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid user ID.' });
  }

  if (Object.keys(updateData).length === 0 && !password) {
    return res.status(400).json({ message: 'No update fields provided.' });
  }

  try {
    // If password is provided, hash it before updating
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword; // Add hashed password to update fields
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json({ message: 'User updated successfully.', user: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error.message);
    res.status(500).json({ message: 'Error updating user.' });
  }
});



// Delete User Route
app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully.' });
  } catch (error) {
    console.error('Error deleting user:', error.message);
    res.status(500).json({ message: 'Error deleting user.' });
  }
});

// Catch-All for Invalid Routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
