const validator = require('validator');

const validateMarker = (data) => {
    const { geocode, researchFieldTopic, phone, email, date, verified } = data;

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
        return  "You cannot manually set the verification of the marker. It will be set automatically."
    }

    return null;
};

module.exports = { validateMarker };
