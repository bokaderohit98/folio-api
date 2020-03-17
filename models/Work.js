const mongoose = require("../config/mongoose");

const { Schema } = mongoose;

const workSchema = Schema({
  from: {
    type: Number,
    required: true
  },
  to: {
    type: Number,
    required: true
  },
  organization: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  }
});

const Work = mongoose.model("Work", workSchema);

module.exports = Work;
