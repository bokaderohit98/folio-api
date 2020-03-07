const { User } = require("../models");
const validations = require("../helpers/validations");

/**
 * Controller to get basic details of user
 */
exports.getBasicDetails = (req, res) => {
  const { id } = req.params;

  User.findById(id)
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
 * Updating Basic Details
 */
exports.updateBasicDetails = (req, res) => {
  const { body, error } = validations.validateUpdatedDetails(req.body);
  // TODO: replace with actual id
  const id = "5e638b86b70f8e0660cbf59e";
  console.log(body);

  if (!body) res.status(400).send(error);
  else
    User.findByIdAndUpdate(id, body, { useFindAndModify: false, new: true })
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
