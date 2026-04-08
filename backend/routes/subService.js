import express from 'express';
import { check, validationResult } from 'express-validator';
import SubService from '../models/SubService.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// @route   POST api/subservices
// @desc    Create a new sub service
// @access  Private (Provider only)
router.post('/', [auth, [
    check('title', 'Title is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('price', 'Price is required').isNumeric(),
    check('estimatedDuration', 'Estimated duration is required').not().isEmpty(),
    check('category', 'Category is required').not().isEmpty()
]], async (req, res) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Option: Verify if user is a provider
        // if(req.user.role !== 'provider') return res.status(403).json({ message: 'Unauthorized' });

        const { title, description, price, estimatedDuration, category, imageUrl } = req.body;

        const newSubService = new SubService({
            title,
            description,
            price,
            estimatedDuration,
            category,
            imageUrl,
            providerId: req.user.id
        });

        const subService = await newSubService.save();
        res.json(subService);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/subservices
// @desc    Get all active sub services
// @access  Public
router.get('/', async (req, res) => {
    try {
        const subServices = await SubService.find({ isActive: true }).sort({ createdAt: -1 });
        res.json(subServices);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/subservices/category/:category
// @desc    Get sub services by category
// @access  Public
router.get('/category/:category', async (req, res) => {
    try {
        const subServices = await SubService.find({ category: req.params.category, isActive: true });
        res.json(subServices);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


export default router;
