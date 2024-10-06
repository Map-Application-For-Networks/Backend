const express = require('express');
const { addMarker, addMarkers, getVerifiedMarkers, getRefutedMarkers,  getAllMarkers, deleteMarker, updateMarkerVerification} = require('../controllers/markersController'); // Import the controller

const router = express.Router();

// Marker routes
router.post('/addmarker', addMarker);

router.post('/addmarkers', addMarkers);

router.get('/verified-markers', getVerifiedMarkers);

router.get('/all-markers', getAllMarkers);

router.get('/refuted-markers', getRefutedMarkers)

router.delete('/marker/:id/delete', deleteMarker);

router.patch('/marker/:id/verify', updateMarkerVerification);

module.exports = router;
