const Marker = require('../models/marker.model');
const { validateMarker } = require('../middleware/validateMarker'); // Import validation middleware

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

module.exports = { addMarker };
