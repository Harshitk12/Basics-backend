const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const authenticateToken = require("../middleware/auth");
const JWT_SECRET ="mysecretkey123";

// Signup
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) return res.status(400).json({ message: "All fields are required" });

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(409).json({ message: "User already exists" });

    const newUser = new User({ username, password });
    await newUser.save();

    res.status(201).json({ message: "Signup successful" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

// Signin (return JWT)
router.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, username }, JWT_SECRET, { expiresIn: "2h" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // Set to true in production with HTTPS
      sameSite: "lax",
      maxAge: 2 * 60 * 60 * 1000 // 2 hours
    });

    res.status(200).json({ message: "Signin successful", token });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

router.get('/check',authenticateToken, (req,res)=>{
  res.json({ isAuthenticated: true });
})

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
});

module.exports = router;
