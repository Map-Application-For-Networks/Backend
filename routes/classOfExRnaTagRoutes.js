const express = require('express');
const { addTag, addTags, showTags, deleteTag } = require('../controllers/classOfExRnaTagsController'); // Import the controller
const { authenticate, isAdmin } = require('../middleware/authMiddleware'); // Import the middleware

const router = express.Router();

// tag routes
router.post('/addclassofexrnatag', authenticate, isAdmin, addTag);

router.post('/addclassofexrnatags', authenticate, isAdmin, addTags);

router.get('/classofexrnatags', showTags);

router.delete('/classofexrnatags/:id/delete', authenticate, isAdmin, deleteTag);

module.exports = router;