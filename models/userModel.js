const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    age: {
      type: Number,
      required: true,
    },

    school: {
      type: String,
      required: true,
    },

    grade: {
      type: String,
      required: true,
    },

    parentName: {
      type: String,
      required: true,
    },

    contactNumber: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    source: {
      type: String,
      required: true,
    },

    additionalComments: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
