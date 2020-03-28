const fs = require("fs");
const path = require("path");
const util = require("util");
const { User } = require("../models");
const validations = require("../helpers/validations");
const emailService = require("../helpers/emailService");

/**
 * Controller to get basic details of user
 */
exports.getBasicDetails = (req, res) => {
  const { id } = req.params;

  User.findById(id)
    .select("-password -tokens -verification_url -otp")
    .then(user => {
      if (user.name === "CastError" || !user.verified) throw new Error();
      res.send(user);
    })
    .catch(err => {
      console.log(err);
      res.status(400).send({ error: "User not found" });
    });
};

/**
 * Controller to get all details of user
 */
exports.getAllDetails = (req, res) => {
  const { id } = req.params;

  User.findById(id)
    .select("-password -tokens -verification_url -otp")
    .populate("educations")
    .populate("works")
    .populate("achivements")
    .exec()
    .then(user => {
      if (user.name === "CastError" || !user.verified) throw new Error();
      res.send(user);
    })
    .catch(err => {
      console.log(err);
      res.status(400).send({ error: "User not found" });
    });
};

/**
 * Controlled to get all details of current user
 */
exports.getMe = (req, res) => {
  const userId = req.user._id;

  User.findById(userId)
    .select("-password -tokens -verification_url -otp")
    .populate("educations")
    .populate("works")
    .populate("achivements")
    .exec()
    .then(user => {
      if (user.name === "CastError") throw new Error();
      res.send(user);
    })
    .catch(err => {
      console.log(err);
      res.status(400).send({ error: "User not found" });
    });
};

/**
 * Create new user
 */
exports.createNewUser = async (req, res) => {
  const { body, error } = validations.validateBasicDetails(req.body);
  let newUser = null;

  if (!body) res.status(400).send(error);
  else
    new User(body)
      .save()
      .then(user => {
        newUser = user;
        emailService.sendVerificationEmail(user.email, user.verification_url);
      })
      .then(() => res.send({ success: "Verification email sent" }))
      .catch(async err => {
        console.log(err);
        if (err.code === 11000)
          res.status(400).send({
            email: {
              status: true,
              message: "Email already exist"
            }
          });
        else {
          await User.findByIdAndRemove(newUser._id);
          res
            .status(500)
            .send({ error: "Something went wrong. Try again Later!" });
        }
      });
};

/**
 * Login
 */
exports.loginUser = async (req, res) => {
  const { body, error } = validations.validateLoginDetails(
    req.body,
    "password"
  );

  if (!body) res.status(400).send(error);

  try {
    const user = await User.findByCredentials(body.email, body.password);
    const token = await user.generateAuthToken();
    user.tokens = undefined;
    user.password = undefined;
    res.send({ user, token });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      email: { status: true, message: "Invalid Credentials" },
      password: { status: true, message: "Invalid Credentials" }
    });
  }
};

/**
 * Login using OTP
 */
exports.loginViaOTP = async (req, res) => {
  const { body, error } = validations.validateLoginDetails(req.body, "otp");

  if (!body) res.status(400).send(error);

  try {
    const user = await User.findByOTP(body.email, body.otp);
    const token = await user.generateAuthToken();
    user.tokens = undefined;
    user.password = undefined;
    res.send({ user, token });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      email: { status: true, message: "Invalid Credentials" },
      otp: { status: true, message: "Invalid Credentials" }
    });
  }
};

/**
 * Verify Email
 */
exports.verifyEmail = async (req, res) => {
  const { url } = req.params;
  User.findByUrl(url)
    .then(user => user.generateAuthToken())
    .then(token => {
      res.redirect(`/?token=${token}`);
    })
    .catch(err => {
      console.log(err);
      res.status(400).send({ error: "Tampered verification url" });
    });
};

/**
 * Resend verification email
 */
exports.resendVerificationEmail = (req, res) => {
  const { email, verification_url: url } = req.user;
  if (!url) res.status(400).send({ error: "Email already verified" });
  emailService
    .sendVerificationEmail(email, url)
    .then(() => res.send({ success: "Verification email sent" }))
    .catch(err => {
      console.log(err);
      res.status(500).send({ error: "Something went wrong. Try again later!" });
    });
};

/**
 * Get OTP
 */
exports.getOTP = (req, res) => {
  const { email } = req.body;
  if (!validations.validateEmail(email))
    res.status(400).send({ error: "Invalid email" });

  User.generateOTP(email)
    .then(otp => emailService.sendOTP(email, otp))
    .then(() => res.send({ success: "OTP sent to registered Email" }))
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .send({ email: { status: true, message: "Email not registered" } });
    });
};

/**
 * Updating Basic Details
 */
exports.updateBasicDetails = async (req, res) => {
  const { body, error } = await validations.validateUpdatedDetails(req.body);
  const userId = req.user._id;
  const { avatar } = req.user;

  if (!body) res.status(400).send(error);
  else {
    if (req.file) {
      body.avatar = req.file.filename;
      if (
        avatar !== "avatarMale.png" &&
        avatar !== "avatarFemale.png" &&
        avatar !== "avatarOther.png"
      )
        fs.unlink(`public/images/${avatar}`, err => err && console.log(err));
    }
    User.findByIdAndUpdate(userId, body, { useFindAndModify: false, new: true })
      .then(user => {
        return User.findById(user._id)
          .select(
            "-password -tokens -verification_url -otp -educations -works -achivements"
          )
          .exec();
      })
      .then(user => res.send(user))
      .catch(err => {
        console.log(err);
        res
          .status(500)
          .send({ error: "Something went wrong. Try again Later!" });
      });
  }
};

/**
 * Logout from device
 */
exports.logoutUser = (req, res) => {
  req.user.tokens = req.user.tokens.filter(item => item.token !== req.token);
  req.user
    .save()
    .then(() => {
      res.send("Logged out successfully");
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({ error: "Something went wrong. Try again Later!" });
    });
};

/**
 * Logout from all device
 */
exports.logoutFromAllDevices = (req, res) => {
  req.user.tokens = [];
  req.user
    .save()
    .then(() => {
      res.send("Logged out of all devices");
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({ error: "Something went wrong. Try again Later!" });
    });
};
