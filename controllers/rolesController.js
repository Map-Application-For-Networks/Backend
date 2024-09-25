const Role = require('../models/role.model');

// Add role controller
const addRole = async (req, res) => {
    try {
        const { roleName, verified } = req.body;

        // Ensure roleName is a string
        if (typeof roleName !== 'string' || !roleName.trim()) {
            return res.status(400).json({ message: "Invalid role name. It must be a non-empty string." });
        }

        // Create the tag without manual verified field modification
        const role = await Role.create({ roleName });

        res.status(200).json(role);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Show all roles controller
const showRoles = async (req, res) => {
    try {
        // Find all roles from the database
        const roles = await Role.find();

        // Check if there are any roles in the collection
        if (!roles || roles.length === 0) {
            return res.status(404).json({ message: 'No roles found' });
        }

        // Return the roles found
        res.status(200).json(roles);
    } catch (error) {
        // Log and return any server errors
        console.error('Error fetching roles:', error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addRole , showRoles };
