const Marker = require('../models/marker.model');
const { validateMarker } = require('../middleware/validateMarker'); // Import validation middleware

// Add marker controller
const addMarkers = async (req, res) => {
    try {
        // Check if req.body is an array of markers
        const markers = Array.isArray(req.body) ? req.body : [req.body];
        
        // Validate each marker
        const validationErrors = markers.map(validateMarker).filter(error => error);
        if (validationErrors.length > 0) {
            return res.status(400).json({ message: validationErrors });
        }

        // Insert markers into the database
        const createdMarkers = await Marker.insertMany(markers);
        res.status(200).json(createdMarkers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Add marker controller
const addMarker = async (req, res) => {
    try {
        const validationError = validateMarker(req.body);
        if (validationError) {
            return res.status(400).json({ message: validationError });
        }

        const marker = await Marker.create(req.body);
        res.status(200).json(marker);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get all verified markers controller
const getVerifiedMarkers = async (req, res) => {
    try {
        const verifiedMarkers = await Marker.find({ verified: 1 });

        if (verifiedMarkers.length === 0) {
            return res.status(404).json({ message: 'No verified markers found' });
        }

        res.status(200).json(verifiedMarkers);
    } catch (error) {
        console.error('Error fetching verified markers:', error);
        res.status(500).json({ message: error.message });
    }
};


module.exports = { addMarker, addMarkers, getVerifiedMarkers };
