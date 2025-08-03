const mongoose = require('mongoose');
const Hostel = require('./models/Hostel');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hostel_finder');

const sampleHostels = [
    {
        name: "UCC Executive Lodge",
        description: "Modern hostel with excellent facilities for UCC students. Clean, safe, and affordable accommodation.",
        location: "Cape Coast Central",
        distanceFromCampus: 2.5,
        priceRange: { min: 1200, max: 2500 },
        roomTypes: [
            { type: "1 room 1 meter", price: 1200, available: 5 },
            { type: "shared", price: 800, available: 8 },
            { type: "single", price: 2500, available: 2 }
        ],
        amenities: {
            hasKitchen: true,
            hasWifi: true,
            hasParking: true,
            hasLaundry: true,
            hasStudyRoom: true,
            hasSecurity: true
        },
        contact: {
            phone: "0244123456",
            email: "info@uccexecutive.com",
            whatsapp: "0244123456"
        },
        rules: {
            noSmoking: true,
            noPets: true,
            quietHours: "10:00 PM - 6:00 AM",
            guestPolicy: "Guests allowed with prior notice"
        },
        verified: true,
        rating: { average: 4.5, count: 25 }
    },
    {
        name: "Student Paradise Hostel",
        description: "Budget-friendly accommodation with basic amenities. Perfect for students looking for affordable housing.",
        location: "Pedu",
        distanceFromCampus: 1.8,
        priceRange: { min: 600, max: 1500 },
        roomTypes: [
            { type: "shared", price: 600, available: 12 },
            { type: "1 room 1 meter", price: 1000, available: 6 },
            { type: "double", price: 1500, available: 3 }
        ],
        amenities: {
            hasKitchen: true,
            hasWifi: false,
            hasParking: false,
            hasLaundry: false,
            hasStudyRoom: false,
            hasSecurity: true
        },
        contact: {
            phone: "0201987654",
            whatsapp: "0201987654"
        },
        rules: {
            noSmoking: false,
            noPets: true,
            quietHours: "11:00 PM - 5:00 AM",
            guestPolicy: "No overnight guests"
        },
        verified: true,
        rating: { average: 3.8, count: 18 }
    },
    {
        name: "Royal Student Suites",
        description: "Premium hostel with modern facilities including air conditioning and 24/7 security.",
        location: "Adisadel",
        distanceFromCampus: 3.2,
        priceRange: { min: 1800, max: 3500 },
        roomTypes: [
            { type: "single", price: 3500, available: 4 },
            { type: "1 room 1 meter", price: 1800, available: 7 },
            { type: "double", price: 2800, available: 2 }
        ],
        amenities: {
            hasKitchen: true,
            hasWifi: true,
            hasParking: true,
            hasLaundry: true,
            hasStudyRoom: true,
            hasSecurity: true
        },
        contact: {
            phone: "0208765432",
            email: "bookings@royalsuites.gh",
            whatsapp: "0208765432"
        },
        rules: {
            noSmoking: true,
            noPets: false,
            quietHours: "10:30 PM - 6:00 AM",
            guestPolicy: "Guests allowed with registration"
        },
        verified: true,
        rating: { average: 4.7, count: 32 }
    },
    {
        name: "Green Valley Hostel",
        description: "Eco-friendly hostel with natural surroundings. Quiet environment perfect for studying.",
        location: "Kwaprow",
        distanceFromCampus: 4.1,
        priceRange: { min: 900, max: 2000 },
        roomTypes: [
            { type: "shared", price: 900, available: 10 },
            { type: "1 room 1 meter", price: 1400, available: 8 },
            { type: "single", price: 2000, available: 3 }
        ],
        amenities: {
            hasKitchen: true,
            hasWifi: true,
            hasParking: true,
            hasLaundry: false,
            hasStudyRoom: true,
            hasSecurity: true
        },
        contact: {
            phone: "0245678901",
            whatsapp: "0245678901"
        },
        rules: {
            noSmoking: true,
            noPets: true,
            quietHours: "9:00 PM - 7:00 AM",
            guestPolicy: "Day visitors only"
        },
        verified: false,
        rating: { average: 4.2, count: 15 }
    },
    {
        name: "Campus View Lodge",
        description: "Strategic location with partial campus view. Modern amenities and student-friendly environment.",
        location: "Cape Coast Central",
        distanceFromCampus: 1.5,
        priceRange: { min: 1100, max: 2200 },
        roomTypes: [
            { type: "1 room 1 meter", price: 1100, available: 9 },
            { type: "shared", price: 750, available: 15 },
            { type: "double", price: 2200, available: 4 }
        ],
        amenities: {
            hasKitchen: true,
            hasWifi: true,
            hasParking: false,
            hasLaundry: true,
            hasStudyRoom: false,
            hasSecurity: true
        },
        contact: {
            phone: "0203456789",
            email: "info@campusview.com",
            whatsapp: "0203456789"
        },
        rules: {
            noSmoking: true,
            noPets: true,
            quietHours: "10:00 PM - 6:00 AM",
            guestPolicy: "Guests allowed until 9 PM"
        },
        verified: true,
        rating: { average: 4.1, count: 28 }
    }
];

const seedDatabase = async () => {
    try {
        // Clear existing data
        await Hostel.deleteMany({});
        console.log('Cleared existing hostels');

        // Insert sample data
        await Hostel.insertMany(sampleHostels);
        console.log('Sample hostels added successfully');

        console.log('Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
