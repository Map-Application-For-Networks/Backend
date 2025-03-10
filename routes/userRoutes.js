const express = require("express");
const { adminLogin, createAdmin, validateToken } = require("../controllers/userController");

const router = express.Router();

// Admin login
router.post("/login", adminLogin);

// Create admin user (remove after creating the admin)
//router.post("/create-admin", createAdmin);

router.get("/validate-token", validateToken);

module.exports = router;
