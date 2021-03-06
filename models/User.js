const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const randomString = require("randomstring");
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
  otp: {
    value: String,
    valid: Boolean,
    createdAt: Number
  },
  dob: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  social_handles: { type: Array, default: [] },
  educations: [{ type: Schema.Types.ObjectId, ref: "Education" }],
  works: [{ type: Schema.Types.ObjectId, ref: "Work" }],
  achivements: [{ type: Schema.Types.ObjectId, ref: "Achivement" }],
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ],
  verification_url: {
    type: String,
    default: randomString.generate(40)
  },
  verified: {
    type: Boolean,
    default: false
  }
});

userSchema.pre("save", async function(next) {
  try {
    // Hashing the password
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 10);
    }

    // Setting up avatar
    if (this.gender === "male") this.avatar = "avatarMale.png";
    else if (this.gender === "female") this.avatar = "avatarFemale.png";
    else this.avatar = "avatarOther.png";
  } catch (err) {
    next(err);
  }
  next();
});

userSchema.methods.generateAuthToken = async function() {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
  this.tokens.push({ token });
  await this.save();
  return token;
};

userSchema.statics.findByCredentials = async function(email, password) {
  const user = await User.findOne({ email }, "-verification_url -otp");
  if (!user) {
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

userSchema.statics.findByUrl = async function(url) {
  let user = await User.findOne({ verification_url: url });
  if (!user) throw new Error({ error: "Tampered verification url" });

  user.verified = true;
  user.verification_url = "";
  user = await user.save();
  return user;
};

userSchema.statics.findByOTP = async function(email, otp) {
  const user = await User.findOne({ email }, "-verification_url");
  const { value, valid, createdAt } = user.otp;

  if (!user) throw new Error({ error: "Incorrect Email" });
  if (
    value !== otp ||
    !valid ||
    createdAt + 60 * 60 * 1000 < new Date().valueOf()
  )
    throw new Error({ error: "Incorrect OTP" });

  user.otp = {
    value: "",
    valid: false,
    createdAt: 0
  };

  await user
    .populate("educations")
    .populate("works")
    .populate("achivements");

  return user;
};

userSchema.statics.generateOTP = async function(email) {
  const user = await User.findOne({ email });
  if (!user) throw new Error({ error: "Incorrect Email" });

  user.otp = {
    value: randomString.generate({ length: 6, charset: "numeric" }),
    valid: true,
    createdAt: new Date().valueOf()
  };

  await user.save();

  return user.otp.value;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
