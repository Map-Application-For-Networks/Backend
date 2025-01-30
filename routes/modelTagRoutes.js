const express = require('express');
const { addTag, addTags, showTags, deleteTag } = require('../controllers/modelTagsController'); // Import the controller
const { authenticate, isAdmin } = require('../middleware/authMiddleware'); // Import the middleware

const router = express.Router();

// tag routes
router.post('/addmodeltag', authenticate, isAdmin, addTag);

router.post('/addmodeltags', authenticate, isAdmin, addTags);

router.get('/modeltags', showTags);

router.delete('/modeltags/:id/delete', authenticate, isAdmin, deleteTag);

module.exports = router;
