const express = require('express');
const { addTag, addTags, showTags } = require('../controllers/tagsController'); // Import the controller

const router = express.Router();

// tag routes
router.post('/addtag', addTag);

router.post('/addtags', addTags);

router.get('/tags', showTags);

module.exports = router;
