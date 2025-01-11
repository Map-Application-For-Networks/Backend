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

    phone: {
      type: String,
      
    },

    date: {
        type: Date,  
        default: Date.now  
    },


    techTags: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tag',
      required: [true, "At least one tech tag is required."]
    }],
    modelTags: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tag',
      required: [true, "At least one model tag is required."]
    }],
    expertiseAreaTags: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tag',
      required: [true, "At least one expertise area tag is required."]
    }],

    visitStatus: {
      type: String,
      required: [true, "Please specify the visit status!"],
      enum: ["Open", "Closed"]
    },

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

