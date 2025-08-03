// Sample data for development when MongoDB is not available
const sampleHostels = [
    {
        _id: '1',
        name: 'University Gardens Hostel',
        description: 'Modern hostel with excellent facilities just 5 minutes from UCC campus. Perfect for students seeking comfort and convenience.',
        location: 'Cape Coast Central',
        distanceFromCampus: 0.5,
        priceRange: {
            min: 800,
            max: 1500
        },
        roomTypes: [
            {
                type: '1 room 1 meter',
                price: 800,
                description: 'Private room with personal space'
            },
            {
                type: 'shared',
                price: 600,
                description: 'Shared room with 2 students'
            }
        ],
        amenities: {
            hasKitchen: true,
            hasWifi: true,
            hasSecurity: true,
            hasParking: true,
            hasLaundry: true,
            hasStudyArea: true
        },
        contact: {
            phone: '+233 24 123 4567',
            email: 'info@universitygardenshostel.com',
            whatsapp: '+233 24 123 4567'
        },
        images: [
            'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400',
            'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400'
        ],
        rating: {
            average: 4.5,
            count: 127
        },
        availability: {
            hasVacancy: true,
            lastUpdated: new Date().toISOString()
        },
        isFeatured: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        _id: '2',
        name: 'Golden Palm Residence',
        description: 'Affordable and comfortable accommodation with modern amenities for UCC students.',
        location: 'Adisadel',
        distanceFromCampus: 1.2,
        priceRange: {
            min: 600,
            max: 1200
        },
        roomTypes: [
            {
                type: 'shared',
                price: 600,
                description: 'Shared room with 3 students'
            },
            {
                type: 'double',
                price: 1000,
                description: 'Double occupancy room'
            }
        ],
        amenities: {
            hasKitchen: true,
            hasWifi: true,
            hasSecurity: true,
            hasParking: false,
            hasLaundry: true,
            hasStudyArea: false
        },
        contact: {
            phone: '+233 20 987 6543',
            email: 'contact@goldenpalmresidence.com',
            whatsapp: '+233 20 987 6543'
        },
        images: [
            'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400',
            'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400'
        ],
        rating: {
            average: 4.2,
            count: 89
        },
        availability: {
            hasVacancy: true,
            lastUpdated: new Date().toISOString()
        },
        isFeatured: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        _id: '3',
        name: 'Coastal View Hostel',
        description: 'Premium hostel with ocean views and top-notch facilities for discerning students.',
        location: 'Cape Coast Central',
        distanceFromCampus: 0.8,
        priceRange: {
            min: 1000,
            max: 2000
        },
        roomTypes: [
            {
                type: 'single',
                price: 1500,
                description: 'Single occupancy with en-suite'
            },
            {
                type: '1 room 1 meter',
                price: 1000,
                description: 'Private room with study area'
            }
        ],
        amenities: {
            hasKitchen: true,
            hasWifi: true,
            hasSecurity: true,
            hasParking: true,
            hasLaundry: true,
            hasStudyArea: true
        },
        contact: {
            phone: '+233 24 555 7890',
            email: 'reservations@coastalviewhostel.com',
            whatsapp: '+233 24 555 7890'
        },
        images: [
            'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400',
            'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400'
        ],
        rating: {
            average: 4.8,
            count: 156
        },
        availability: {
            hasVacancy: false,
            lastUpdated: new Date().toISOString()
        },
        isFeatured: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        _id: '4',
        name: 'Student Haven Lodge',
        description: 'Budget-friendly accommodation with essential amenities for students.',
        location: 'Elmina',
        distanceFromCampus: 2.5,
        priceRange: {
            min: 400,
            max: 800
        },
        roomTypes: [
            {
                type: 'shared',
                price: 400,
                description: 'Shared room with 4 students'
            },
            {
                type: 'double',
                price: 650,
                description: 'Double occupancy'
            }
        ],
        amenities: {
            hasKitchen: true,
            hasWifi: false,
            hasSecurity: true,
            hasParking: false,
            hasLaundry: false,
            hasStudyArea: false
        },
        contact: {
            phone: '+233 20 111 2233',
            email: 'info@studenthavenlodge.com',
            whatsapp: '+233 20 111 2233'
        },
        images: [
            'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400'
        ],
        rating: {
            average: 3.8,
            count: 45
        },
        availability: {
            hasVacancy: true,
            lastUpdated: new Date().toISOString()
        },
        isFeatured: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
];

module.exports = sampleHostels;
