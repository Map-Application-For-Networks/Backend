const Role = require('../models/role.model');
const Marker = require('../models/marker.model')
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
  const { title, geocode, organismTags, drivenProcessTags, classTags, carrierTags, applicationAreaTags, researchExpertiseTags, technicalExpertiseTags, name_and_surname, email, date, verified, role } = data;

  if (!title || typeof title !== 'string' || title.trim() === '') {
    return 'Title is required and must be a non-empty string.';
  }

  if (title.length > 150) {
    return 'Title must be less than 150 characters.';
  }

  const existing = await Marker.findOne({ title: title.trim() });
  if (existing) {
    return 'Title must be unique. This title already exists.';
  }

  if (!Array.isArray(geocode) || geocode.length !== 2 || !geocode.every(coord => typeof coord === 'number')) {
    return 'Geocode must be an array of two numbers [latitude, longitude].';
  }

  if (email && !validator.isEmail(email)) {
    return 'Invalid email format.';
  }

  if (!name_and_surname || typeof name_and_surname !== 'string' || name_and_surname.trim() === '') {
    return 'Name and surname must be a non-empty string.';
  }

  if (name_and_surname.length > 100) {
    return 'Name and surname must be less than 100 characters.';
  }
  /*
  const nameSurnameRegex = /^[a-zA-ZğüşöçıİĞÜŞÖÇ\s\-']+$/;
  if (!nameSurnameRegex.test(name_and_surname)) {
      return 'Name and surname contains invalid characters.';
  }*/


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


  if (!mongoose.Types.ObjectId.isValid(role)) {
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

