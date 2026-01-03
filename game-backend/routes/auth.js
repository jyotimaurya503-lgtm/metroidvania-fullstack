import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, email, phone, password } = req.body;

  console.log("📥 Incoming register request");
  console.log("➡️  req.body:", req.body);

  try {
    const existingUser = await User.findOne({ 
      $or: [{ username }, { email }]
    });

    if (existingUser) {
      console.log("⚠️  User already exists");
      return res.status(409).json({ error: "Username or email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      phone,
      password: hashedPassword
      // Do not set score here; let MongoDB default handle it
    });

    await user.save();
    console.log("✅ User saved to DB:", user);

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("❌ Error in signup:", err);
    res.status(500).json({ error: "Signup failed due to server error" });
  }
});



// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ error: "Invalid username" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Invalid password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2h"
    });

    res.json({ message: "Login success", token });
  } catch (err) {
    console.error("❌ Login error:", err.message);
    res.status(500).json({ error: "Login failed" });
  }
});

export default router;
