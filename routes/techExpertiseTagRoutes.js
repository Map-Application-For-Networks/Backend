const express = require('express');
const { addTag, addTags, showTags, deleteTag } = require('../controllers/techExpertiseTagsController'); // Import the controller
const { authenticate, isAdmin } = require('../middleware/authMiddleware'); // Import the middleware

const router = express.Router();

// tag routes
router.post('/addtechexpertisetag', authenticate, isAdmin, addTag);

router.post('/addtechexpertisetags', authenticate, isAdmin, addTags);

router.delete('/techexpertisetags/:id/delete', authenticate, isAdmin, deleteTag);

router.get('/techexpertisetags', showTags);

module.exports = router;

    