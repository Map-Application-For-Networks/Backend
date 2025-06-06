const mongoose = require("mongoose");

const TechnologyTagSchema = mongoose.Schema(
  {
    tagName: {
      type: String,
      required: [true, "Please enter technical expertise tag name!"],
    },

    verified: {
      type: Number,
      default: 1,  // Default to 0 (unverified)
      enum: [0, 1],  // Only allow 0 or 1 as valid values
      set: function(value) {
        return value === 0 ? 0 : 1;  // Ensure only 0 or 1 is used
      }
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Technical Expertise Tag', TechnologyTagSchema);

