const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  social: {
    type: Map,
    of: String
  },
  education: [{ type: Schema.Types.ObjectId, ref: "Education" }],
  work: [{ type: Schema.Types.ObjectId, ref: "Work" }],
  achivements: [{ type: Schema.Types.ObjectId, ref: "Achivement" }]
});

const User = mongoose.model("User", userSchema);
module.exports = User;
