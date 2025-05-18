const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "yourSecretKey";
const auth = require("../middleware/auth");

router.post("/signup", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "Email already in use." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User created successfully." });
  } catch (err) {
    res.status(500).json({ error: "Server error." });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "All fields are required." });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ error: "Invalid email or password." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ error: "Invalid email or password." });

    const token = jwt.sign(
      { userId: user._id, username: user.username, email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ message: "Login successful", token, userId: user._id, username: user.username });
  } catch (err) {
    res.status(500).json({ error: "Server error." });
  }
});

router.post("/logout", (req, res) => {
  req.session?.destroy(() => {
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out" });
  });
  localStorage.removeItem("token");
  window.location.href = "/login";
});

router.put("/limit", auth, async (req, res) => {
  try {
    const { limit } = req.body;
    if (typeof limit !== "number" || limit < 0) {
      return res.status(400).json({ error: "Limit must be a non-negative number." });
    }
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { limit },
      { new: true }
    );
    if (!user) return res.status(404).json({ error: "User not found." });
    res.json({ message: "Limit updated successfully.", limit: user.limit });
  } catch (err) {
    res.status(500).json({ error: "Server error." });
  }
});

router.put("/password", auth, async (req, res) => {
  try {
    const { password } = req.body;
    if (!password || password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { password: hashedPassword },
      { new: true }
    );
    if (!user) return res.status(404).json({ error: "User not found." });
    res.json({ message: "Password updated successfully." });
  } catch (err) {
    res.status(500).json({ error: "Server error." });
  }
});

router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({
      username: user.username,
      email: user.email,
      limit: user.limit,
      backgroundColor: user.backgroundColor,
      componentColor: user.componentColor,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.put("/theme", auth, async (req, res) => {
  try {
    const { backgroundColor, componentColor } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { backgroundColor, componentColor },
      { new: true }
    );
    if (!user) return res.status(404).json({ error: "User not found." });
    res.json({
      message: "Theme updated successfully.",
      backgroundColor: user.backgroundColor,
      componentColor: user.componentColor,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error." });
  }
});

const handleColorSelect = async (color) => {
  setSelectedColor(color);
  setMessage(`Background set to ${color.name}`);

  try {
    const token = localStorage.getItem("token");
    await fetch("http://localhost:5000/api/users/theme", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        backgroundColor: color.backgroundColor,
        componentColor: color.componentColor,
      }),
    });
    console.log("Theme updated successfully.");
    window.location.reload();
  } catch (err) {
    setMessage("Failed to update background color.");
  }
};

module.exports = router;