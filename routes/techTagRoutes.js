const express = require('express');
const { addTag, addTags, showTags } = require('../controllers/techTagsController'); // Import the controller
const { authenticate, isAdmin } = require('../middleware/authMiddleware'); // Import the middleware

const router = express.Router();

// tag routes
router.post('/addtechtag', authenticate, isAdmin, addTag);

router.post('/addtechtags', authenticate, isAdmin, addTags);

router.get('/techtags', showTags);

module.exports = router;
