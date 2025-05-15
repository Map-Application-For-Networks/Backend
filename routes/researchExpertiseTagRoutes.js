const express = require('express');
const { addTag, addTags, showTags, deleteTag } = require('../controllers/researchExpertiseTagsController'); // Import the controller
const { authenticate, isAdmin } = require('../middleware/authMiddleware'); // Import the middleware

const router = express.Router();

// tag routes
router.post('/addresearchexpertisetag', authenticate, isAdmin, addTag);

router.post('/addresearchexpertisetags', authenticate, isAdmin, addTags);

router.get('/researchexpertisetags', showTags);

router.delete('/researchexpertisetags/:id/delete', authenticate, isAdmin, deleteTag);

module.exports = router;
