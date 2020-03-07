const mongoose = require("mongoose");

const { Schema } = mongoose;

const achivementSchema = Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  description: {
    type: String
  }
});

const Achivement = mongoose.model("Achivement", achivementSchema);

module.exports = Achivement;
