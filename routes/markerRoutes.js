const express = require('express');
const { addMarker, addMarkers, getVerifiedMarkers } = require('../controllers/markersController'); // Import the controller

const router = express.Router();

// Marker routes
router.post('/addmarker', addMarker);

router.post('/addmarkers', addMarkers);

router.get('/verified-markers', getVerifiedMarkers);

module.exports = router;
