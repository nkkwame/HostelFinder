const express = require('express');
const router = express.Router();
const University = require('../models/University');
const auth = require('../middleware/auth');

// GET /api/universities - Get all universities
router.get('/', async (req, res) => {
    try {
        const { active, region, type, search } = req.query;
        
        // Build filter object
        const filter = {};
        
        if (active !== undefined) {
            filter.isActive = active === 'true';
        }
        
        if (region) {
            filter['location.region'] = new RegExp(region, 'i');
        }
        
        if (type) {
            filter.type = type;
        }
        
        if (search) {
            filter.$or = [
                { name: new RegExp(search, 'i') },
                { shortName: new RegExp(search, 'i') },
                { 'location.city': new RegExp(search, 'i') }
            ];
        }
        
        const universities = await University.find(filter)
            .sort({ name: 1 })
            .select('-__v');
            
        res.json(universities);
    } catch (error) {
        console.error('Error fetching universities:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// GET /api/universities/:id - Get single university
router.get('/:id', async (req, res) => {
    try {
        const university = await University.findById(req.params.id).select('-__v');
        
        if (!university) {
            return res.status(404).json({ message: 'University not found' });
        }
        
        res.json(university);
    } catch (error) {
        console.error('Error fetching university:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// POST /api/universities - Create new university (Admin only)
router.post('/', auth, async (req, res) => {
    try {
        // Check if user is admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admin role required.' });
        }
        
        const {
            name,
            shortName,
            location,
            establishedYear,
            type,
            website,
            description,
            logo
        } = req.body;
        
        // Check if university already exists
        const existingUniversity = await University.findOne({
            $or: [
                { name: name },
                { shortName: shortName }
            ]
        });
        
        if (existingUniversity) {
            return res.status(400).json({ 
                message: 'University with this name or short name already exists' 
            });
        }
        
        const university = new University({
            name,
            shortName,
            location,
            establishedYear,
            type,
            website,
            description,
            logo
        });
        
        await university.save();
        res.status(201).json(university);
    } catch (error) {
        console.error('Error creating university:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// PUT /api/universities/:id - Update university (Admin only)
router.put('/:id', auth, async (req, res) => {
    try {
        // Check if user is admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admin role required.' });
        }
        
        const university = await University.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).select('-__v');
        
        if (!university) {
            return res.status(404).json({ message: 'University not found' });
        }
        
        res.json(university);
    } catch (error) {
        console.error('Error updating university:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// DELETE /api/universities/:id - Delete university (Admin only)
router.delete('/:id', auth, async (req, res) => {
    try {
        // Check if user is admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admin role required.' });
        }
        
        const university = await University.findByIdAndDelete(req.params.id);
        
        if (!university) {
            return res.status(404).json({ message: 'University not found' });
        }
        
        res.json({ message: 'University deleted successfully' });
    } catch (error) {
        console.error('Error deleting university:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// GET /api/universities/regions/list - Get unique regions
router.get('/regions/list', async (req, res) => {
    try {
        const regions = await University.distinct('location.region', { isActive: true });
        res.json(regions.filter(region => region)); // Filter out null/undefined values
    } catch (error) {
        console.error('Error fetching regions:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
