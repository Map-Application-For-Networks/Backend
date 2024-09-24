const express = require('express');
const { addMarker } = require('../controllers/markerController'); // Import the controller

const router = express.Router();

// Marker routes
router.post('/addmarker', addMarker);

module.exports = router;
