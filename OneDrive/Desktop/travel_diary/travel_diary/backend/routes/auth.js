const express = require('express');
const router = express.Router();
const User = require('../models/User');

// route for registering
router.post('/register', async (req, res) => {
  const { email, username, password } = req.body;

  try {
    // check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // create a new user
    const newUser = new User({
      email,
      username,
      password,
    });

    await newUser.save();

    res.status(201).json({
      msg: 'User created successfully',
      user: {
        id: newUser._id,
        email: newUser.email,
        username: newUser.username,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// route for login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    if (user.password !== password) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    res.status(200).json({
      msg: 'Login successful',
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

router.post('/logout', (req, res) => {
  try {
    req.session = null;
    res.status(200).json({ msg: 'Logout successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
