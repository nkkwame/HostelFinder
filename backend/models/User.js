const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: 2,
        maxlength: 50
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 6
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true
    },
    role: {
        type: String,
        enum: ['user', 'hostel_owner', 'admin'],
        default: 'user'
    },
    profilePicture: {
        type: String,
        default: ''
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    hostelsOwned: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hostel'
    }],
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hostel'
    }],
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    verificationToken: String,
    verificationTokenExpire: Date
}, {
    timestamps: true
});

// Encrypt password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Generate verification token
userSchema.methods.generateVerificationToken = function () {
    const crypto = require('crypto');
    const token = crypto.randomBytes(20).toString('hex');

    this.verificationToken = crypto.createHash('sha256').update(token).digest('hex');
    this.verificationTokenExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

    return token;
};

module.exports = mongoose.model('User', userSchema);
