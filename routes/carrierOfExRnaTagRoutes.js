const express = require('express');
const { addTag, addTags, showTags, deleteTag } = require('../controllers/carrierOfExRnaTagsController'); // Import the controller
const { authenticate, isAdmin } = require('../middleware/authMiddleware'); // Import the middleware

const router = express.Router();

// tag routes
router.post('/addcarrierofexrnatag', authenticate, isAdmin, addTag);

router.post('/addcarrierofexrnatags', authenticate, isAdmin, addTags);

router.get('/carrierofexrnatags', showTags);

router.delete('/carrierofexrnatags/:id/delete', authenticate, isAdmin, deleteTag);

module.exports = router;