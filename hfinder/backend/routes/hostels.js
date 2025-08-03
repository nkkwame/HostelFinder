const express = require('express');
const router = express.Router();
const Hostel = require('../models/Hostel');

// Get all hostels with optional filtering
router.get('/', async (req, res) => {
    try {
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

        // Only show hostels with vacancy
        filter.totalVacancy = { $gt: 0 };

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
