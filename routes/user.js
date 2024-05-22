const express = require('express');
const User = require('../models/user');
const session = require('express-session');
const router = express.Router();
require('dotenv').config();

// Use sessions to keep users logged in
router.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}));

// Registration route
router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email, password });
        await user.save();
        res.redirect('/login');
    } catch (err) {
        res.status(400).send('Error registering user');
    }
});

// Login route
router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).send('Invalid email or password');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(400).send('Invalid email or password');
    }

    req.session.user = user;
    res.redirect('/gallery');
});

// Logout route
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Error logging out');
        }
        res.redirect('/login');
    });
});

module.exports = router;
