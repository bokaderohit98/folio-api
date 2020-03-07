const { User } = require("../models");
const validations = require("../helpers/validations");

/**
 * Controller to get basic details of user
 */
exports.getBasicDetails = (req, res) => {
  const { id } = req.params;

  User.findById(id)
    .select("-password -tokens")
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
 * Controller to get all details of user
 */
exports.getAllDetails = (req, res) => {
  const { id } = req.params;

  User.findById(id)
    .select("-password -tokens")
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
 * TODO: AUTHENTICATION STUFF
 */
exports.createNewUser = (req, res) => {
  const { body, error } = validations.validateBasicDetails(req.body);

  if (!body) res.status(400).send(error);
  else
    new User(body)
      .save()
      .then(user => res.send(user._id))
      .catch(err => {
        console.log(err);
        res
          .status(500)
          .send({ error: "Something went wrong. Try again Later!" });
      });
};

/**
 * Login
 */
exports.loginUser = async (req, res) => {
  const { body, error } = validations.validateLoginDetails(req.body);

  if (!body) res.status(400).send(error);

  try {
    const user = await User.findByCredentials(body.email, body.password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: "Invalid Credentials" });
  }
};

/**
 * Updating Basic Details
 */
exports.updateBasicDetails = async (req, res) => {
  const { body, error } = await validations.validateUpdatedDetails(req.body);
  const userId = req.user._id;

  if (!body) res.status(400).send(error);
  else
    User.findByIdAndUpdate(userId, body, { useFindAndModify: false, new: true })
      .then(user => {
        res.send(user);
      })
      .catch(err => {
        console.log(err);
        res
          .status(500)
          .send({ error: "Something went wrong. Try again Later!" });
      });
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
