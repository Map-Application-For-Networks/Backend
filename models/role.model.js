const mongoose = require("mongoose");

const RoleSchema = mongoose.Schema(
  {
    roleName: {
      type: String,
      required: [true, "Please enter role name!"],
      unique: true,  // This will ensure uniqueness but it is case-sensitive
    },
    verified: {
      type: Number,
      default: 0,  // Default to 0 (unverified)
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

module.exports = mongoose.model('Role', RoleSchema);
