import mongoose from 'mongoose';

const SubServiceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    estimatedDuration: {
        type: String,
        required: true // e.g., "1 hour", "30 mins"
    },
    category: {
        type: String,
        required: true // e.g., "plumbing", "cleaning", "electrical"
    },
    providerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true // Reference to the user who provides this service
    },
    imageUrl: {
        type: String,
        default: ''
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('SubService', SubServiceSchema);
