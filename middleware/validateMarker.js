const Role = require('../models/role.model'); // Import Role model
const TechTag = require('../models/techTag.model');  // Import Tag model
const ModelTag = require('../models/modelTag.model')
const ExpertiseTag = require('../models/expertiseTag.model')
const validator = require('validator');
const mongoose = require('mongoose');

const validateMarker = async (data) => {
    const { geocode,techTags, modelTags, expertiseAreaTags, phone, email, date, verified, role } = data;

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

    if (!Array.isArray(techTags) || techTags.length === 0) {
        return 'Tech Tags list must be a non-empty array.';
    }

    for (const tag of techTags) {
      if (!mongoose.Types.ObjectId.isValid(tag)) {
          return `Tag id "${tag}" is not a valid ObjectId.`;
      }
      const tagExists = await TechTag.findOne({ _id: tag });
      if (!tagExists) {
          return `Tag id "${tag}" does not exist in the database.`;
      }
    }

    if (!Array.isArray(modelTags) || modelTags.length === 0) {
        return 'Model Tags list must be a non-empty array.';
    }

    for (const tag of modelTags) {
      if (!mongoose.Types.ObjectId.isValid(tag)) {
          return `Tag id "${tag}" is not a valid ObjectId.`;
      }
      const tagExists = await ModelTag.findOne({ _id: tag });
      if (!tagExists) {
          return `Tag id "${tag}" does not exist in the database.`;
      }
    }

    if (!Array.isArray(expertiseAreaTags) || expertiseAreaTags.length === 0) {
        return 'Expertise Area Tags list must be a non-empty array.';
    }

    for (const tag of expertiseAreaTags) {
      if (!mongoose.Types.ObjectId.isValid(tag)) {
          return `Tag id "${tag}" is not a valid ObjectId.`;
      }
      const tagExists = await ExpertiseTag.findOne({ _id: tag });
      if (!tagExists) {
          return `Tag id "${tag}" does not exist in the database.`;
      }
    }

    if (date) {
        return "You cannot manually set the date. It will be set automatically.";
    }

    if (verified) {
        return "You cannot manually set the verification of the marker. It will be set automatically.";
    }
    

    if (!mongoose.Types.ObjectId.isValid(role) ) {
      return `Role id "${role}" is not a valid ObjectId.`;
    }
      const roleExists = await Role.findOne({ _id: role });
      if (!roleExists) {
          return `Role id "${role}" does not exist in the database.`;
      }
    
      // No errors, return null
      return null;
    };

module.exports = { validateMarker };

