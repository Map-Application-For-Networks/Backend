const express = require('express');
const { addTag, addTags, showTags, deleteTag } = require('../controllers/applicationAreaTagsController'); // Import the controller
const { authenticate, isAdmin } = require('../middleware/authMiddleware'); // Import the middleware

const router = express.Router();

// tag routes
router.post('/addapplicationareatag', authenticate, isAdmin, addTag);

router.post('/addapplicationareatags', authenticate, isAdmin, addTags);

router.get('/applicationareatags', showTags);

router.delete('/applicationareatags/:id/delete', authenticate, isAdmin, deleteTag);

module.exports = router;