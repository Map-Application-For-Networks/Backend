const express = require('express');
const { addMarker, addMarkers, getVerifiedMarkers, getRefutedMarkers,  getAllMarkers, deleteMarker, updateMarkerVerification} = require('../controllers/markersController'); // Import the controller
const { authenticate, isAdmin } = require('../middleware/authMiddleware'); // Import the middleware

const router = express.Router();

// Marker routes
router.post('/addmarker', addMarker);

router.post('/addmarkers', authenticate, isAdmin, addMarkers);

router.get('/verified-markers', getVerifiedMarkers);

router.get('/all-markers', authenticate, isAdmin, getAllMarkers);

router.get('/refuted-markers', authenticate, isAdmin ,getRefutedMarkers)

router.delete('/marker/:id/delete', authenticate, isAdmin ,deleteMarker);

router.patch('/marker/:id/verify', authenticate, isAdmin ,updateMarkerVerification);

module.exports = router;
