const mongoose = require("../config/mongoose");

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
  educations: [{ type: Schema.Types.ObjectId, ref: "Education" }],
  works: [{ type: Schema.Types.ObjectId, ref: "Work" }],
  achivements: [{ type: Schema.Types.ObjectId, ref: "Achivement" }]
});

userSchema.pre("save", async function(next) {
  const promises = [];
  this.works.forEach(item => promises.push(item.save()));
  this.educations.forEach(item => promises.push(item.save()));
  this.achivements.forEach(item => promises.push(item.save()));
  try {
    await Promise.all(promises);
  } catch (err) {
    next(err);
  }
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
