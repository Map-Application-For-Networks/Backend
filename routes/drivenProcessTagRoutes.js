const express = require('express');
const { addTag, addTags, showTags, deleteTag } = require('../controllers/drivenProcessTagsController'); // Import the controller
const { authenticate, isAdmin } = require('../middleware/authMiddleware'); // Import the middleware

const router = express.Router();

// tag routes
router.post('/adddrivenprocesstag', authenticate, isAdmin, addTag);

router.post('/adddrivenprocesstags', authenticate, isAdmin, addTags);

router.get('/drivenprocesstags', showTags);

router.delete('/drivenprocesstags/:id/delete', authenticate, isAdmin, deleteTag);

module.exports = router;