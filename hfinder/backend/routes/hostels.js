const express = require('express');
const router = express.Router();
const Hostel = require('../models/Hostel');
const sampleHostels = require('../data/sampleData');

// Check if MongoDB is connected
const isDBConnected = () => {
    return require('mongoose').connection.readyState === 1;
};

// Get all hostels with optional filtering
router.get('/', async (req, res) => {
    try {
        // If database is not connected, use sample data
        if (!isDBConnected()) {
            console.log('Database not connected, using sample data');

            const {
                search,
                minPrice,
                maxPrice,
                roomType,
                hasKitchen,
                hasWifi,
                location,
                sortBy = 'name',
                sortOrder = 'asc',
                page = 1,
                limit = 10
            } = req.query;

            let filteredHostels = [...sampleHostels];

            // Apply filters to sample data
            if (search) {
                const searchLower = search.toLowerCase();
                filteredHostels = filteredHostels.filter(hostel =>
                    hostel.name.toLowerCase().includes(searchLower) ||
                    hostel.location.toLowerCase().includes(searchLower) ||
                    hostel.description.toLowerCase().includes(searchLower)
                );
            }

            if (minPrice) {
                filteredHostels = filteredHostels.filter(hostel =>
                    hostel.priceRange.min >= Number(minPrice)
                );
            }

            if (maxPrice) {
                filteredHostels = filteredHostels.filter(hostel =>
                    hostel.priceRange.max <= Number(maxPrice)
                );
            }

            if (roomType) {
                filteredHostels = filteredHostels.filter(hostel =>
                    hostel.roomTypes.some(room => room.type === roomType)
                );
            }

            if (hasKitchen === 'true') {
                filteredHostels = filteredHostels.filter(hostel =>
                    hostel.amenities.hasKitchen === true
                );
            }

            if (hasWifi === 'true') {
                filteredHostels = filteredHostels.filter(hostel =>
                    hostel.amenities.hasWifi === true
                );
            }

            if (location) {
                const locationLower = location.toLowerCase();
                filteredHostels = filteredHostels.filter(hostel =>
                    hostel.location.toLowerCase().includes(locationLower)
                );
            }

            // Sort
            filteredHostels.sort((a, b) => {
                let aVal = a[sortBy];
                let bVal = b[sortBy];

                if (sortBy === 'priceRange.min') {
                    aVal = a.priceRange.min;
                    bVal = b.priceRange.min;
                } else if (sortBy === 'rating.average') {
                    aVal = a.rating.average;
                    bVal = b.rating.average;
                }

                if (sortOrder === 'desc') {
                    return bVal > aVal ? 1 : -1;
                }
                return aVal > bVal ? 1 : -1;
            });

            // Pagination
            const skip = (Number(page) - 1) * Number(limit);
            const paginatedHostels = filteredHostels.slice(skip, skip + Number(limit));
            const total = filteredHostels.length;

            return res.json({
                hostels: paginatedHostels,
                totalPages: Math.ceil(total / Number(limit)),
                currentPage: Number(page),
                total
            });
        }

        // Original database logic
        const {
            search,
            minPrice,
            maxPrice,
            roomType,
            hasKitchen,
            hasWifi,
            location,
            sortBy = 'name',
            sortOrder = 'asc',
            page = 1,
            limit = 10
        } = req.query;

        // Build filter object
        const filter = {};

        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { location: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        if (minPrice || maxPrice) {
            filter['priceRange.min'] = {};
            if (minPrice) filter['priceRange.min'].$gte = Number(minPrice);
            if (maxPrice) filter['priceRange.max'] = { $lte: Number(maxPrice) };
        }

        if (roomType) {
            filter['roomTypes.type'] = roomType;
        }

        if (hasKitchen === 'true') {
            filter['amenities.hasKitchen'] = true;
        }

        if (hasWifi === 'true') {
            filter['amenities.hasWifi'] = true;
        }

        if (location) {
            filter.location = { $regex: location, $options: 'i' };
        }

        // Build sort object
        const sort = {};
        sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

        // Calculate pagination
        const skip = (Number(page) - 1) * Number(limit);

        const hostels = await Hostel.find(filter)
            .sort(sort)
            .skip(skip)
            .limit(Number(limit));

        const total = await Hostel.countDocuments(filter);

        res.json({
            hostels,
            totalPages: Math.ceil(total / Number(limit)),
            currentPage: Number(page),
            total
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching hostels', error: error.message });
    }
});

// Get a single hostel by ID
router.get('/:id', async (req, res) => {
    try {
        const hostel = await Hostel.findById(req.params.id);

        if (!hostel) {
            return res.status(404).json({ message: 'Hostel not found' });
        }

        res.json(hostel);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching hostel', error: error.message });
    }
});

// Create a new hostel (admin only - simplified for now)
router.post('/', async (req, res) => {
    try {
        const hostel = new Hostel(req.body);
        await hostel.save();
        res.status(201).json(hostel);
    } catch (error) {
        res.status(400).json({ message: 'Error creating hostel', error: error.message });
    }
});

// Update a hostel
router.put('/:id', async (req, res) => {
    try {
        const hostel = await Hostel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!hostel) {
            return res.status(404).json({ message: 'Hostel not found' });
        }

        res.json(hostel);
    } catch (error) {
        res.status(400).json({ message: 'Error updating hostel', error: error.message });
    }
});

// Delete a hostel
router.delete('/:id', async (req, res) => {
    try {
        const hostel = await Hostel.findByIdAndDelete(req.params.id);

        if (!hostel) {
            return res.status(404).json({ message: 'Hostel not found' });
        }

        res.json({ message: 'Hostel deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting hostel', error: error.message });
    }
});

// Get featured hostels (verified with high ratings)
router.get('/featured/list', async (req, res) => {
    try {
        // If database is not connected, use sample data
        if (!isDBConnected()) {
            console.log('Database not connected, using sample featured hostels');
            const featuredHostels = sampleHostels
                .filter(hostel => hostel.isFeatured && hostel.rating.average >= 4)
                .sort((a, b) => b.rating.average - a.rating.average)
                .slice(0, 6);

            return res.json(featuredHostels);
        }

        const hostels = await Hostel.find({
            verified: true,
            totalVacancy: { $gt: 0 },
            'rating.average': { $gte: 4 }
        })
            .sort({ 'rating.average': -1 })
            .limit(6);

        res.json(hostels);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching featured hostels', error: error.message });
    }
});

module.exports = router;
