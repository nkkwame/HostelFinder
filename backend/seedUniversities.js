const mongoose = require('mongoose');
const dotenv = require('dotenv');
const University = require('./models/University');
const universitiesData = require('./data/universities');

dotenv.config();

const seedUniversities = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hostel_finder');
        console.log('Connected to MongoDB');

        // Clear existing universities
        await University.deleteMany({});
        console.log('Cleared existing universities');

        // Insert new universities
        const universities = await University.insertMany(universitiesData);
        console.log(`Successfully seeded ${universities.length} universities`);

        // Log the universities
        universities.forEach(uni => {
            console.log(`- ${uni.name} (${uni.shortName}) - ${uni.location.city}, ${uni.location.region}`);
        });

        process.exit(0);
    } catch (error) {
        console.error('Error seeding universities:', error);
        process.exit(1);
    }
};

// Run the seed function
seedUniversities();
