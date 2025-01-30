const express = require('express');
const { addTag, addTags, showTags, deleteTag } = require('../controllers/techTagsController'); // Import the controller
const { authenticate, isAdmin } = require('../middleware/authMiddleware'); // Import the middleware

const router = express.Router();

// tag routes
router.post('/addtechtag', authenticate, isAdmin, addTag);

router.post('/addtechtags', authenticate, isAdmin, addTags);

router.delete('/techtags/:id/delete', authenticate, isAdmin, deleteTag);

router.get('/techtags', showTags);

module.exports = router;
