const Role = require('../models/role.model');
const OrganismTag = require('../models/organismTag.model')
const DrivenProcessTag = require('../models/drivenProcessTag.model')
const ClassTag = require('../models/classOfExRnaTag.model')
const CarrierTag = require('../models/carrierOfExRnaTag.model')
const ApplicationTag = require('../models/applicationAreaTag.model')
const ResearchExpertiseTag = require('../models/researchExpertiseTag.model')
const TechnicalExpertiseTag = require('../models/techExpertiseTag.model')

const validator = require('validator');
const mongoose = require('mongoose');

const validateMarker = async (data) => {
    const { geocode, organismTags, drivenProcessTags, classTags, carrierTags, applicationAreaTags, researchExpertiseTags, technicalExpertiseTags, phone, email, date, verified, role } = data;

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

    if (!Array.isArray(organismTags) || organismTags.length === 0) {
        return 'Tech Tags list must be a non-empty array.';
    }

    for (const tag of organismTags) {
      if (!mongoose.Types.ObjectId.isValid(tag)) {
          return `Tag id "${tag}" is not a valid ObjectId.`;
      }
      const tagExists = await OrganismTag.findOne({ _id: tag });
      if (!tagExists) {
          return `Tag id "${tag}" does not exist in the database.`;
      }
    }

    if (!Array.isArray(drivenProcessTags) || drivenProcessTags.length === 0) {
        return 'Tech Tags list must be a non-empty array.';
    }

     for (const tag of drivenProcessTags) {
      if (!mongoose.Types.ObjectId.isValid(tag)) {
          return `Tag id "${tag}" is not a valid ObjectId.`;
      }
      const tagExists = await DrivenProcessTag.findOne({ _id: tag });
      if (!tagExists) {
          return `Tag id "${tag}" does not exist in the database.`;
      }
    }

    if (!Array.isArray(classTags) || classTags.length === 0) {
        return 'Tech Tags list must be a non-empty array.';
    }

     for (const tag of classTags) {
      if (!mongoose.Types.ObjectId.isValid(tag)) {
          return `Tag id "${tag}" is not a valid ObjectId.`;
      }
      const tagExists = await ClassTag.findOne({ _id: tag });
      if (!tagExists) {
          return `Tag id "${tag}" does not exist in the database.`;
      }
    }

    if (!Array.isArray(carrierTags) || carrierTags.length === 0) {
        return 'Tech Tags list must be a non-empty array.';
    }

     for (const tag of carrierTags) {
      if (!mongoose.Types.ObjectId.isValid(tag)) {
          return `Tag id "${tag}" is not a valid ObjectId.`;
      }
      const tagExists = await CarrierTag.findOne({ _id: tag });
      if (!tagExists) {
          return `Tag id "${tag}" does not exist in the database.`;
      }
    }

    if (!Array.isArray(applicationAreaTags) || applicationAreaTags.length === 0) {
        return 'Tech Tags list must be a non-empty array.';
    }

     for (const tag of applicationAreaTags) {
      if (!mongoose.Types.ObjectId.isValid(tag)) {
          return `Tag id "${tag}" is not a valid ObjectId.`;
      }
      const tagExists = await ApplicationTag.findOne({ _id: tag });
      if (!tagExists) {
          return `Tag id "${tag}" does not exist in the database.`;
      }
    }

     if (!Array.isArray(researchExpertiseTags) || researchExpertiseTags.length === 0) {
        return 'Tech Tags list must be a non-empty array.';
    }


     for (const tag of researchExpertiseTags) {
      if (!mongoose.Types.ObjectId.isValid(tag)) {
          return `Tag id "${tag}" is not a valid ObjectId.`;
      }
      const tagExists = await ResearchExpertiseTag.findOne({ _id: tag });
      if (!tagExists) {
          return `Tag id "${tag}" does not exist in the database.`;
      }
    }

    if (!Array.isArray(drivenProcessTags) || drivenProcessTags.length === 0) {
        return 'Tech Tags list must be a non-empty array.';
    }

     for (const tag of technicalExpertiseTags) {
      if (!mongoose.Types.ObjectId.isValid(tag)) {
          return `Tag id "${tag}" is not a valid ObjectId.`;
      }
      const tagExists = await TechnicalExpertiseTag.findOne({ _id: tag });
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

