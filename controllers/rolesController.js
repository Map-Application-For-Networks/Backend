const Role = require('../models/role.model');

// Add role controller
const addRole = async (req, res) => {
    try {
        const { roleName } = req.body;

        if (typeof roleName !== 'string' || !roleName.trim()) {
            return res.status(400).json({ message: "Invalid role name. It must be a non-empty string." });
        }

        // Check for existing role with the same name, case-insensitive
        const existingRole = await Role.findOne({ roleName: { $regex: new RegExp('^' + roleName + '$', 'i') } });
        if (existingRole) {
            return res.status(409).json({ message: "A role with this name already exists." });
        }

        // Create the role if it does not exist
        const role = await Role.create({ roleName });
        res.status(201).json(role);
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
