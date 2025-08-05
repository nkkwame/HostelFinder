const mongoose = require('mongoose');

const universitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    shortName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        uppercase: true
    },
    location: {
        city: {
            type: String,
            required: true
        },
        region: {
            type: String,
            required: true
        },
        coordinates: {
            latitude: Number,
            longitude: Number
        }
    },
    establishedYear: {
        type: Number
    },
    type: {
        type: String,
        enum: ['Public', 'Private', 'Technical'],
        required: true
    },
    website: {
        type: String
    },
    description: {
        type: String
    },
    logo: {
        type: String // URL to logo image
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt field before saving
universitySchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('University', universitySchema);
