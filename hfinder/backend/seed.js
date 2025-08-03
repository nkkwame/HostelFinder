const mongoose = require('mongoose');
const Hostel = require('./models/Hostel');
require('dotenv').config();

// Enhanced UCC area hostels data
const uccHostels = [
    {
        name: "University Gardens Hostel",
        description: "Premier accommodation facility located in the heart of Cape Coast, just 10 minutes walk from UCC main campus. Features modern amenities, 24/7 security, and a conducive environment for academic excellence.",
        location: "Cape Coast Central",
        distanceFromCampus: 0.8,
        priceRange: { min: 800, max: 1800 },
        roomTypes: [
            { type: "1 room 1 meter", price: 1200, available: 8, description: "Private room with study desk and wardrobe" },
            { type: "shared", price: 800, available: 15, description: "Shared room with 2 students, spacious and comfortable" },
            { type: "single", price: 1800, available: 3, description: "Single occupancy with en-suite bathroom" }
        ],
        amenities: {
            hasKitchen: true,
            hasWifi: true,
            hasParking: true,
            hasLaundry: true,
            hasStudyRoom: true,
            hasSecurity: true,
            hasGenerator: true,
            hasWaterSupply: true
        },
        contact: {
            phone: "+233 24 123 4567",
            email: "info@universitygardenshostel.com",
            whatsapp: "+233 24 123 4567",
            address: "Liberation Road, Cape Coast Central"
        },
        images: [
            "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800",
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800"
        ],
        rules: {
            noSmoking: true,
            noPets: true,
            quietHours: "10:00 PM - 6:00 AM",
            guestPolicy: "Guests allowed with prior notice to management"
        },
        verified: true,
        isFeatured: true,
        totalVacancy: 26,
        rating: { average: 4.7, count: 89 },
        facilities: ["CCTV Surveillance", "Backup Generator", "Borehole Water", "Study Areas", "Common Room"]
    },
    {
        name: "Golden Palm Residence",
        description: "Affordable student accommodation in Adisadel area with excellent transport links to UCC. Known for its friendly community atmosphere and reliable basic amenities.",
        location: "Adisadel",
        distanceFromCampus: 2.2,
        priceRange: { min: 600, max: 1400 },
        roomTypes: [
            { type: "shared", price: 600, available: 20, description: "Shared room with 3 students" },
            { type: "1 room 1 meter", price: 1000, available: 12, description: "Private room with shared bathroom" },
            { type: "double", price: 1400, available: 5, description: "Double occupancy with private bathroom" }
        ],
        amenities: {
            hasKitchen: true,
            hasWifi: true,
            hasParking: false,
            hasLaundry: true,
            hasStudyRoom: false,
            hasSecurity: true,
            hasGenerator: false,
            hasWaterSupply: true
        },
        contact: {
            phone: "+233 20 987 6543",
            email: "contact@goldenpalmresidence.com",
            whatsapp: "+233 20 987 6543",
            address: "Adisadel Junction, Cape Coast"
        },
        images: [
            "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
            "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800"
        ],
        rules: {
            noSmoking: true,
            noPets: false,
            quietHours: "11:00 PM - 5:00 AM",
            guestPolicy: "Day visitors allowed, overnight guests require approval"
        },
        verified: true,
        isFeatured: true,
        totalVacancy: 37,
        rating: { average: 4.2, count: 156 },
        facilities: ["24/7 Security", "Water Storage", "Kitchen Facilities", "Laundry Area"]
    },
    {
        name: "Coastal View Hostel",
        description: "Premium hostel offering spectacular views of the Atlantic Ocean. Located in prime Cape Coast area with easy access to both UCC campus and the historic Cape Coast Castle.",
        location: "Cape Coast Central",
        distanceFromCampus: 1.5,
        priceRange: { min: 1000, max: 2500 },
        roomTypes: [
            { type: "single", price: 2500, available: 4, description: "Single room with ocean view and en-suite" },
            { type: "1 room 1 meter", price: 1500, available: 8, description: "Private room with partial ocean view" },
            { type: "double", price: 2000, available: 6, description: "Double occupancy with balcony access" }
        ],
        amenities: {
            hasKitchen: true,
            hasWifi: true,
            hasParking: true,
            hasLaundry: true,
            hasStudyRoom: true,
            hasSecurity: true,
            hasGenerator: true,
            hasWaterSupply: true
        },
        contact: {
            phone: "+233 24 555 7890",
            email: "reservations@coastalviewhostel.com",
            whatsapp: "+233 24 555 7890",
            address: "Residential Area, Cape Coast"
        },
        images: [
            "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
            "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800",
            "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800"
        ],
        rules: {
            noSmoking: true,
            noPets: true,
            quietHours: "9:00 PM - 7:00 AM",
            guestPolicy: "Registered guests only, maximum 2 per room"
        },
        verified: true,
        isFeatured: true,
        totalVacancy: 18,
        rating: { average: 4.8, count: 234 },
        facilities: ["Ocean View", "AC Rooms Available", "Restaurant", "Conference Room", "Gym Access"]
    },
    {
        name: "Student Haven Lodge",
        description: "Budget-friendly accommodation in Elmina area, perfect for students seeking affordable housing. Regular tro-tro service to UCC campus with easy transportation links.",
        location: "Elmina",
        distanceFromCampus: 4.5,
        priceRange: { min: 400, max: 900 },
        roomTypes: [
            { type: "shared", price: 400, available: 25, description: "Shared room with 4 students" },
            { type: "shared", price: 600, available: 15, description: "Shared room with 2 students" },
            { type: "1 room 1 meter", price: 900, available: 8, description: "Private room, shared facilities" }
        ],
        amenities: {
            hasKitchen: true,
            hasWifi: false,
            hasParking: false,
            hasLaundry: false,
            hasStudyRoom: false,
            hasSecurity: true,
            hasGenerator: false,
            hasWaterSupply: true
        },
        contact: {
            phone: "+233 20 111 2233",
            email: "info@studenthavenlodge.com",
            whatsapp: "+233 20 111 2233",
            address: "Elmina Junction, Central Region"
        },
        images: [
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800"
        ],
        rules: {
            noSmoking: false,
            noPets: false,
            quietHours: "10:00 PM - 6:00 AM",
            guestPolicy: "Visitors welcome during day hours"
        },
        verified: true,
        isFeatured: false,
        totalVacancy: 48,
        rating: { average: 3.8, count: 67 },
        facilities: ["Basic Security", "Kitchen Access", "Study Areas"]
    },
    {
        name: "Campus View Lodge",
        description: "Conveniently located hostel with direct view of UCC campus. Popular among final year students and postgraduate researchers for its proximity and quiet environment.",
        location: "UCC Campus Area",
        distanceFromCampus: 0.3,
        priceRange: { min: 1000, max: 2200 },
        roomTypes: [
            { type: "1 room 1 meter", price: 1400, available: 10, description: "Private room overlooking campus" },
            { type: "single", price: 2200, available: 4, description: "Executive single room with AC" },
            { type: "shared", price: 1000, available: 12, description: "Shared room with campus view" }
        ],
        amenities: {
            hasKitchen: true,
            hasWifi: true,
            hasParking: true,
            hasLaundry: true,
            hasStudyRoom: true,
            hasSecurity: true,
            hasGenerator: true,
            hasWaterSupply: true
        },
        contact: {
            phone: "+233 24 789 0123",
            email: "campusview@email.com",
            whatsapp: "+233 24 789 0123",
            address: "Near UCC Main Gate, Cape Coast"
        },
        images: [
            "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800",
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"
        ],
        rules: {
            noSmoking: true,
            noPets: true,
            quietHours: "9:00 PM - 6:00 AM",
            guestPolicy: "No overnight guests without prior approval"
        },
        verified: true,
        isFeatured: false,
        totalVacancy: 26,
        rating: { average: 4.4, count: 123 },
        facilities: ["Campus Proximity", "Study Rooms", "24/7 Security", "High-Speed Internet"]
    },
    {
        name: "Metro Hostel Complex",
        description: "Large hostel complex in Cape Coast metropolis offering various room options. Well-connected to commercial areas and UCC campus with reliable public transport.",
        location: "Cape Coast Metro",
        distanceFromCampus: 3.0,
        priceRange: { min: 700, max: 1600 },
        roomTypes: [
            { type: "shared", price: 700, available: 30, description: "Standard shared accommodation" },
            { type: "1 room 1 meter", price: 1200, available: 18, description: "Private room in complex" },
            { type: "double", price: 1600, available: 8, description: "Double room with private facilities" }
        ],
        amenities: {
            hasKitchen: true,
            hasWifi: true,
            hasParking: true,
            hasLaundry: true,
            hasStudyRoom: true,
            hasSecurity: true,
            hasGenerator: false,
            hasWaterSupply: true
        },
        contact: {
            phone: "+233 20 456 7890",
            email: "info@metrohostel.com",
            whatsapp: "+233 20 456 7890",
            address: "Metro Area, Cape Coast"
        },
        images: [
            "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800"
        ],
        rules: {
            noSmoking: true,
            noPets: false,
            quietHours: "10:00 PM - 6:00 AM",
            guestPolicy: "Guests allowed with registration"
        },
        verified: true,
        isFeatured: false,
        totalVacancy: 56,
        rating: { average: 4.0, count: 198 },
        facilities: ["Large Complex", "Multiple Kitchens", "Recreation Area", "Parking Space"]
    },
    {
        name: "Royal Student Suites",
        description: "Premium hostel with modern facilities including air conditioning and 24/7 security.",
        location: "Adisadel",
        distanceFromCampus: 3.2,
        priceRange: { min: 1800, max: 3500 },
        roomTypes: [
            { type: "single", price: 3500, available: 4, description: "Luxury single room with AC" },
            { type: "1 room 1 meter", price: 1800, available: 7, description: "Standard private room" },
            { type: "double", price: 2800, available: 2, description: "Premium double room" }
        ],
        amenities: {
            hasKitchen: true,
            hasWifi: true,
            hasParking: true,
            hasLaundry: true,
            hasStudyRoom: true,
            hasSecurity: true,
            hasGenerator: true,
            hasWaterSupply: true
        },
        contact: {
            phone: "+233 20 876 5432",
            email: "bookings@royalsuites.gh",
            whatsapp: "+233 20 876 5432",
            address: "Adisadel Estate, Cape Coast"
        },
        images: [
            "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800"
        ],
        rules: {
            noSmoking: true,
            noPets: false,
            quietHours: "10:30 PM - 6:00 AM",
            guestPolicy: "Guests allowed with registration"
        },
        verified: true,
        isFeatured: true,
        totalVacancy: 13,
        rating: { average: 4.7, count: 32 },
        facilities: ["Premium Rooms", "Air Conditioning", "High-End Facilities", "24/7 Security"]
    },
    {
        name: "Green Valley Hostel",
        description: "Eco-friendly hostel with natural surroundings. Quiet environment perfect for studying.",
        location: "Kwaprow",
        distanceFromCampus: 4.1,
        priceRange: { min: 900, max: 2000 },
        roomTypes: [
            { type: "shared", price: 900, available: 10, description: "Eco-friendly shared rooms" },
            { type: "1 room 1 meter", price: 1400, available: 8, description: "Private room in green setting" },
            { type: "single", price: 2000, available: 3, description: "Single room with garden view" }
        ],
        amenities: {
            hasKitchen: true,
            hasWifi: true,
            hasParking: true,
            hasLaundry: false,
            hasStudyRoom: true,
            hasSecurity: true,
            hasGenerator: false,
            hasWaterSupply: true
        },
        contact: {
            phone: "+233 24 567 8901",
            email: "info@greenvalley.com",
            whatsapp: "+233 24 567 8901",
            address: "Kwaprow, Cape Coast"
        },
        images: [
            "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800"
        ],
        rules: {
            noSmoking: true,
            noPets: true,
            quietHours: "9:00 PM - 7:00 AM",
            guestPolicy: "Day visitors only"
        },
        verified: false,
        isFeatured: false,
        totalVacancy: 21,
        rating: { average: 4.2, count: 15 },
        facilities: ["Eco-Friendly", "Natural Environment", "Study Areas", "Peaceful Location"]
    },
    {
        name: "Campus View Lodge",
        description: "Strategic location with partial campus view. Modern amenities and student-friendly environment.",
        location: "Cape Coast Central",
        distanceFromCampus: 1.5,
        priceRange: { min: 750, max: 2200 },
        roomTypes: [
            { type: "1 room 1 meter", price: 1100, available: 9, description: "Private room with campus view" },
            { type: "shared", price: 750, available: 15, description: "Shared accommodation in central location" },
            { type: "double", price: 2200, available: 4, description: "Double room with modern facilities" }
        ],
        amenities: {
            hasKitchen: true,
            hasWifi: true,
            hasParking: false,
            hasLaundry: true,
            hasStudyRoom: false,
            hasSecurity: true,
            hasGenerator: true,
            hasWaterSupply: true
        },
        contact: {
            phone: "+233 20 345 6789",
            email: "info@campusview.com",
            whatsapp: "+233 20 345 6789",
            address: "Cape Coast Central"
        },
        images: [
            "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800"
        ],
        rules: {
            noSmoking: true,
            noPets: true,
            quietHours: "10:00 PM - 6:00 AM",
            guestPolicy: "Guests allowed until 9 PM"
        },
        verified: true,
        isFeatured: false,
        totalVacancy: 28,
        rating: { average: 4.1, count: 28 },
        facilities: ["Campus Proximity", "Central Location", "Modern Amenities", "Student-Friendly"]
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
