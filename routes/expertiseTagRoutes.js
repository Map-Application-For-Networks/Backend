const express = require('express');
const { addTag, addTags, showTags, deleteTag } = require('../controllers/expertiseTagsController'); // Import the controller
const { authenticate, isAdmin } = require('../middleware/authMiddleware'); // Import the middleware

const router = express.Router();

// tag routes
router.post('/addexpertisetag', authenticate, isAdmin, addTag);

router.post('/addexpertisetags', authenticate, isAdmin, addTags);

router.get('/expertisetags', showTags);

router.delete('/expertisetags/:id/delete', authenticate, isAdmin, deleteTag);

module.exports = router;
