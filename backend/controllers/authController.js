const User = require('../models/User');

// @desc    Register a new student
// @route   POST /api/auth/register
// @access  Public
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, regNumber } = req.body;

        if (!name || !email || !password || !regNumber) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        // Check if user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create user
        const user = await User.create({
            name,
            email,
            password,
            role: 'student',
            regNumber
        });

        if (user) {
            // Set session
            req.session.user = {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            };

            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                regNumber: user.regNumber
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Login user (Student or Admin)
// @route   POST /api/auth/login
// @access  Public
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }

        // Check for user email
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
             // Set session
             req.session.user = {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            };

            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                regNumber: user.regNumber
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Public
exports.logoutUser = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Could not log out' });
        }
        res.clearCookie('connect.sid');
        res.json({ message: 'Logout successful' });
    });
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
    if (req.session.user) {
        res.json(req.session.user);
    } else {
        res.status(401).json({ message: 'Not authorized' });
    }
};
