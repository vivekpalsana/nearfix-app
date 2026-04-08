import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { check, validationResult } from 'express-validator';
import User from '../models/User.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// @route   POST api/auth/register
// @desc    Register a user
// @access  Public
router.post('/register', [
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
], async (req, res) => {
    // Validate inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, phone, email, password, role, businessName } = req.body;

    if (!phone && !email) {
        return res.status(400).json({ message: 'Please provide either a phone number or an email address.' });
    }

    try {
        // Check if user already exists
        let user;
        if (phone) {
            user = await User.findOne({ phone });
        }
        if (!user && email) {
            user = await User.findOne({ email });
        }

        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        user = new User({
            name,
            phone: phone || undefined,
            email: email || undefined,
            password,
            role,
            businessName
        });

        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        // Return JWT
        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET || 'secret123',
            { expiresIn: '5 days' },
            (err, token) => {
                if (err) throw err;
                res.json({ token, user: { id: user.id, name: user.name, phone: user.phone, email: user.email, role: user.role } });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   POST api/auth/login
// @desc    Authenticate user
// @access  Public
router.post('/login', async (req, res) => {
    const { phone, email, password } = req.body;

    if (!phone && !email) {
        return res.status(400).json({ message: 'Please provide either a phone number or an email address.' });
    }

    try {
        // Check if user exists
        let user;
        if (phone) {
            user = await User.findOne({ phone });
        } else if (email) {
            user = await User.findOne({ email });
        }
        
        if (!user) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        // Compare password if provided, else rely on OTP verification logic from frontend
        if (password) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid Credentials' });
            }
        }

        // Return JWT
        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET || 'secret123',
            { expiresIn: '5 days' },
            (err, token) => {
                if (err) throw err;
                res.json({ token, user: { id: user.id, name: user.name, phone: user.phone, email: user.email, role: user.role } });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});



// @route   GET api/auth/me
// @desc    Get currently logged in user
// @access  Private
router.get('/me', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

export default router;
