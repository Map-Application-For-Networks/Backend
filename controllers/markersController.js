const Marker = require('../models/marker.model');
const { validateMarker } = require('../middleware/validateMarker'); // Import validation middleware

// Add marker controller
const addMarkers = async (req, res) => {
    try {
        const markers = Array.isArray(req.body) ? req.body : [req.body];
        const validationResults = await Promise.all(markers.map(validateMarker));
        const validationErrors = validationResults.filter(result => result !== null);

        if (validationErrors.length > 0) {
            return res.status(400).json({ message: "Validation errors", errors: validationErrors });
        }

        const createdMarkers = await Marker.insertMany(markers);
        return res.status(201).json(createdMarkers);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// Add marker controller
const addMarker = async (req, res) => {
    try {
        const validationError = await validateMarker(req.body);
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

// Get all verified markers controller
const getRefutedMarkers = async (req, res) => {
    try {
        const verifiedMarkers = await Marker.find({ verified: 0 });

        if (verifiedMarkers.length === 0) {
            return res.status(404).json({ message: 'No refuted markers found' });
        }

        res.status(200).json(verifiedMarkers);
    } catch (error) {
        console.error('Error fetching refuted markers:', error);
        res.status(500).json({ message: error.message });
    }
};

// Get all markers controller
const getAllMarkers = async (req, res) => {
    try {
        const markers = await Marker.find({});

        if (markers.length === 0) {
            return res.status(404).json({ message: 'No markers found' });
        }

        res.status(200).json(markers);
    } catch (error) {
        console.error('Error fetching markers:', error);
        res.status(500).json({ message: error.message });
    }
};



module.exports = { addMarker, addMarkers, getVerifiedMarkers, getRefutedMarkers,  getAllMarkers};
