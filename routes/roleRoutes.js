const express = require('express');
const { addRole, showRoles } = require('../controllers/rolesController'); // Import the controller

const router = express.Router();

// tag routes
router.post('/addrole', addRole);

router.get('/roles', showRoles);

module.exports = router;