const mongoose = require("../config/mongoose");

const { Schema } = mongoose;

const educationSchema = Schema({
  from: {
    type: Number,
    required: true
  },
  to: {
    type: Number,
    required: true
  },
  institute: {
    type: String,
    required: true
  },
  degree: {
    type: String
  },
  specialization: {
    type: String
  }
});

const Education = mongoose.model("Education", educationSchema);

module.exports = Education;
