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
      required: [true, "Please provide the phone number!"]
    },

    date: {
        type: Date,  
        default: Date.now  
    },

    researchFieldTopic: {
      type: [String],
      required: [true, "Please provide the research topics!"]
    },

    visitStatus: {
      type: String,
      required: [true, "Please specify the visit status!"],
      enum: ["Open", "Closed"]
    },

    role: {
      type: String,
      required: [true, "Please specify the role!"],
      enum: ["Sponsor Company", "Research Facility", "Laboratory"]
    },

    verified: {
      type: Boolean,
      default: false,  // Always default to false
      set: function(value) {
        return false;   // Prevent users from setting this to true
      }
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Marker', MarkerSchema);

