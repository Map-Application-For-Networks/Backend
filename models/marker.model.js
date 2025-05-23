const mongoose = require("mongoose");

const MarkerSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter title for your facility!"],
    },

    details: {
      type: String,
      required: [true, "Please enter details for your facility!"]
    },

    geocode: {
      type: [Number],
      required: [true, "Please provide the geolocation coordinates!"]
    },

    email: {
      type: String,
      required: [true, "Please provide the email address!"]
    },

    name_and_surname: {
      type: String,
      required: [true, "Please provide the name and surname!"]
    },

    date: {
        type: Date,  
        default: Date.now  
    },

    organismTags: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tag',
      required: [true, "At least one organism tag is required."]
    }],

    drivenProcessTags: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tag',
      required: [true, "At least one exRNA-driven process tag is required."]
    }],

    classTags: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tag',
      required: [true, "At least one class of exRNA tag is required."]
    }],
    carrierTags: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tag',
      required: [true, "At least one carrier of exRNA area tag is required."]
    }],

    applicationAreaTags: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tag',
      required: [true, "At least one application ares tag is required."]
    }],
    researchExpertiseTags: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tag',
      required: [true, "At least one research expertise tag is required."]
    }],
    technicalExpertiseTags: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tag',
      required: [true, "At least one expertise area tag is required."]
    }],


    role: {
      type: mongoose.Schema.Types.ObjectId, // Reference to Role model
      ref: 'Role',
      required: [true, "Please specify the role!"]
      
    },

    verified: {
      type: Number,
      default: 0,  // Default to 0 (unverified)
      enum: [0, 1],  // Only allow 0 or 1 as valid values
      set: function(value) {
        return value === 1 ? 1 : 0;  // Ensure only 0 or 1 is used
      }
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Marker', MarkerSchema);

