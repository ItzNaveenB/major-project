const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    if (user) {
      res.send(user);
    } else {
      return res.status(400).json({ error: "Invalid username or password" });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.post("/register", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.send("User registered successfully");
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

module.exports = router;
