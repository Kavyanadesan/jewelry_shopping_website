import express from "express";
import User from "../models/userModels.js";

const router = express.Router();

// API to create a new user
router.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user
    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// API to check if a user exists by email
router.post("/check", async (req, res) => {
  const { email } = req.body;

  try {
    const userExists = await User.findOne({ email });
    res.status(200).json({ exists: !!userExists });
  } catch (error) {
    console.error("Error checking user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// API for user login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "Invalid email" });
    }

    // Check if the password matches
    if (user.password !== password) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });
    }

    // Login successful
    res.status(200).json({ success: true, message: "Login successful" });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

export default router;
