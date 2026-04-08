import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import dotenv from 'dotenv';
dotenv.config();

let mongoServer;

const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/nearfix';

        // If the user hasn't set an Atlas URL and local DB fails, we spin up an in-memory DB 
        // to ensure the app continues working flawlessly during development.
        if (uri.includes('localhost') || uri.includes('127.0.0.1')) {
            try {
                // Try connecting to local db first
                await mongoose.connect(uri, { serverSelectionTimeoutMS: 2000 });
                console.log('MongoDB local instance connected.');
            } catch (localErr) {
                console.log('Local MongoDB not running. Starting in-memory fallback database...');
                mongoServer = await MongoMemoryServer.create();
                const memoryUri = mongoServer.getUri();
                await mongoose.connect(memoryUri);
                console.log('MongoDB Memory Server Connected (Temporary Dev DB).');
            }
        } else {
            // Production / Cloud Atlas Cluster
            await mongoose.connect(uri);
            console.log('MongoDB Atlas / Production DB Connected.');
        }

    } catch (err) {
        console.error('CRITICAL: MongoDB connection failed:', err);
        process.exit(1);
    }
};

export default connectDB;
