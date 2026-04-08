import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db.js';
import authRoutes from './routes/auth.js';
import subServiceRoutes from './routes/subService.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to Dynamic Database
connectDB().then(async () => {
    // Index cleanup (Self-healing for E11000 duplicate key error)
    // Runs once on startup to ensure no legacy unique indices crash the app
    try {
        const User = (await import('./models/User.js')).default;
        await User.collection.dropIndex('phone_1');
        console.log('Database Health Check: problematic phone index cleared.');
    } catch (e) {
        // Index didn't exist, which is good
    }
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/subservices', subServiceRoutes);

// Basic Route for testing
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the NearFix API' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
