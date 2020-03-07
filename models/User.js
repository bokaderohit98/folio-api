const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("../config/mongoose");

const { Schema } = mongoose;

const userSchema = Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
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
  achivements: [{ type: Schema.Types.ObjectId, ref: "Achivement" }],
  tokens: {
    type: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ]
  }
});

userSchema.pre("save", async function(next) {
  try {
    // Hashing the password
    if (this.isModified("password")) {
      console.log("passwordModified");
      this.password = await bcrypt.hash(this.password, 10);
    }
  } catch (err) {
    next(err);
  }
  next();
});

userSchema.methods.generateAuthToken = async function() {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: 60 * 60 * 2
  });
  this.tokens.push({ token });
  await this.save();
  return token;
};

userSchema.statics.findByCredentials = async function(email, password) {
  const user = await User.findOne({ email });
  if (!user) {
    console.log("email");
    throw new Error({ error: "Email not found" });
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) throw new Error({ error: "Incorrect Password" });

  await user
    .populate("educations")
    .populate("works")
    .populate("achivements");

  return user;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
