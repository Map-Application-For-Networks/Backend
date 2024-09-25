const Role = require('../models/role.model'); // Import Role model
const Tag = require('../models/tag.model');  // Import Tag model
const validator = require('validator');

const validateMarker = async (data) => {
    const { geocode, researchFieldTopic, phone, email, date, verified, role } = data;

    if (!Array.isArray(geocode) || geocode.length !== 2 || !geocode.every(coord => typeof coord === 'number')) {
        return 'Geocode must be an array of two numbers [latitude, longitude].';
    }

    if (email && !validator.isEmail(email)) {
        return 'Invalid email format.';
    }

    const phoneRegex = /^\+[\d-]+$/;
    if (phone && !phoneRegex.test(phone)) {
        return 'Phone number must start with + and only contain numbers and - sign.';
    }

    if (!Array.isArray(researchFieldTopic) || researchFieldTopic.length === 0) {
        return 'ResearchFieldTopic must be a non-empty array.';
    }

    if (date) {
        return "You cannot manually set the date. It will be set automatically.";
    }

    if (verified) {
        return "You cannot manually set the verification of the marker. It will be set automatically.";
    }

    // Check if the role exists in the Role collection
    if (researchFieldTopic && Array.isArray(researchFieldTopic)) {
        // Check for duplicate tags
        const uniqueTags = new Set(researchFieldTopic);
        if (uniqueTags.size !== researchFieldTopic.length) {
            return 'Duplicate tags are not allowed.';
        }

        for (const tag of researchFieldTopic) {
            const tagExists = await Tag.findOne({ tagName: tag });
            if (!tagExists) {
                return `Tag "${tag}" does not exist in the database.`;
            }
        }
    } else {
        return 'Tags must be an array.';
    }

    return null;
};

module.exports = { validateMarker };

