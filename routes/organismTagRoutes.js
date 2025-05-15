const express = require('express');
const { addTag, addTags, showTags, deleteTag } = require('../controllers/organismTagsController'); // Import the controller
const { authenticate, isAdmin } = require('../middleware/authMiddleware'); // Import the middleware

const router = express.Router();

// tag routes
router.post('/addorganismtag', authenticate, isAdmin, addTag);

router.post('/addorganismtags', authenticate, isAdmin, addTags);

router.get('/organismtags', showTags);

router.delete('/organismtags/:id/delete', authenticate, isAdmin, deleteTag);

module.exports = router;
