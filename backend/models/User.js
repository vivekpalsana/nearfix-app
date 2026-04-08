import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        trim: true,
        // Uniqueness removed to allow multiple accounts without phone numbers (Email-first approach)
    },
    email: {
        type: String,
        sparse: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['customer', 'provider', 'admin'],
        default: 'customer'
    },
    businessName: {
        type: String,
        trim: true,
        // Only relevant if role is provider
    },
    avatar: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('User', UserSchema);
