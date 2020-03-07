const mongoose = require("mongoose");

const { Schema } = mongoose;

const workSchema = Schema({
  from: {
    type: Date,
    required: true
  },
  to: {
    type: Date,
    required: true
  },
  organization: {
    type: String,
    required: true
  },
  positon: {
    type: String,
    required: true
  }
});

const Work = mongoose.model("Work", workSchema);

module.exports = Work;
