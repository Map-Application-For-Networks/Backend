const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Admin Login
const adminLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = generateToken(user._id);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Optional: Create Admin User (run once)
const createAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.create({ username, password, isAdmin: true });
    res.status(201).json({ message: "Admin created", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Validate Token
const validateToken = (req, res) => {
  const token = req.headers.authorization?.split(" ")[1] || req.query.token;

  if (!token) {
    return res.status(401).json({ message: "Token is required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ message: "Token is valid", decoded });
  } catch (error) {
    res.status(401).json({ message: "Invalid token", error: error.message });
  }
};

module.exports = { adminLogin, createAdmin, validateToken };
