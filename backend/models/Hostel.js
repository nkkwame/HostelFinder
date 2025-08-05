const mongoose = require('mongoose');

const hostelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    distanceFromCampus: {
        type: Number, // in kilometers
        required: true
    },
    priceRange: {
        min: {
            type: Number,
            required: true
        },
        max: {
            type: Number,
            required: true
        }
    },
    roomTypes: [{
        type: {
            type: String,
            enum: ['1 room 1 meter', 'shared', 'single', 'double'],
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        available: {
            type: Number,
            default: 0
        }
    }],
    amenities: {
        hasKitchen: {
            type: Boolean,
            default: false
        },
        hasWifi: {
            type: Boolean,
            default: false
        },
        hasParking: {
            type: Boolean,
            default: false
        },
        hasLaundry: {
            type: Boolean,
            default: false
        },
        hasStudyRoom: {
            type: Boolean,
            default: false
        },
        hasSecurity: {
            type: Boolean,
            default: false
        }
    },
    contact: {
        phone: {
            type: String,
            required: true
        },
        email: {
            type: String
        },
        whatsapp: {
            type: String
        }
    },
    images: [{
        url: String,
        caption: String
    }],
    rules: {
        noSmoking: Boolean,
        noPets: Boolean,
        quietHours: String,
        guestPolicy: String
    },
    totalVacancy: {
        type: Number,
        default: 0
    },
    rating: {
        average: {
            type: Number,
            default: 0,
            min: 0,
            max: 5
        },
        count: {
            type: Number,
            default: 0
        }
    },
    verified: {
        type: Boolean,
        default: false
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
hostelSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

// Calculate total vacancy from room types
hostelSchema.pre('save', function (next) {
    this.totalVacancy = this.roomTypes.reduce((total, room) => total + room.available, 0);
    next();
});

module.exports = mongoose.model('Hostel', hostelSchema);
