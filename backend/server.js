const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');

// Import routes
const hostelRoutes = require('./routes/hostels');
const authRoutes = require('./routes/auth');
const universityRoutes = require('./routes/universities');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(compression());
app.use(morgan('combined'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/hostels', hostelRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/universities', universityRoutes);

// Basic route
app.get('/', (req, res) => {
    res.json({ message: 'UCC Hostel Finder API' });
});

// MongoDB connection
const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/hostel_finder';
        await mongoose.connect(mongoURI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        console.log('Server will continue without database connection');
        console.log('Please provide a valid MONGODB_URI environment variable');
    }
};

// Connect to database
connectDB();

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
