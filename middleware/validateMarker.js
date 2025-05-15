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

const validateTagArray = async (tags, model, label) => {
  if (!Array.isArray(tags) || tags.length === 0) {
    return `${label} list must be a non-empty array.`;
  }

  for (const tag of tags) {
    if (!mongoose.Types.ObjectId.isValid(tag)) {
      return `Tag ID "${tag}" in ${label} is not a valid ObjectId.`;
    }

    const tagDoc = await model.findById(tag);
    if (!tagDoc) {
      return `Tag ID "${tag}" does not exist in ${label}.`;
    }

    if (tagDoc.tagName.trim().toUpperCase() === 'NULL') {
      return `You cannot use the placeholder tag 'NULL' in ${label}.`;
    }
  }

  return null;
};


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

      let error;

  error = await validateTagArray(organismTags, OrganismTag, 'Organism Tags');
  if (error) return error;

  error = await validateTagArray(drivenProcessTags, DrivenProcessTag, 'Driven Process Tags');
  if (error) return error;

  error = await validateTagArray(classTags, ClassTag, 'Class of exRNA Tags');
  if (error) return error;

  error = await validateTagArray(carrierTags, CarrierTag, 'Carrier of exRNA Tags');
  if (error) return error;

  error = await validateTagArray(applicationAreaTags, ApplicationTag, 'Application Area Tags');
  if (error) return error;

  error = await validateTagArray(researchExpertiseTags, ResearchExpertiseTag, 'Research Expertise Tags');
  if (error) return error;

  error = await validateTagArray(technicalExpertiseTags, TechnicalExpertiseTag, 'Technical Expertise Tags');
  if (error) return error;

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

