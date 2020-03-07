const { User, Achivement } = require("../models");
const validations = require("../helpers/validations");

/**
 * Add new achivement field
 */
exports.addAchivement = (req, res) => {
  const { body, error } = validations.validateAchivement(req.body);
  const userId = req.user._id;

  if (!body) res.status(400).send(error);

  new Achivement(body)
    .save()
    .then(achivement => {
      return User.findByIdAndUpdate(
        userId,
        {
          $push: { achivements: achivement._id }
        },
        { new: true, useFindAndModify: false }
      );
    })
    .then(user => {
      res.send(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({ error: "Something went wrong. Try again Later!" });
    });
};

/**
 * Edit existing achivement field
 */
exports.editAchivement = (req, res) => {
  const { id } = req.params;

  const { body, error } = validations.validateUpdatedAchivement(req.body);

  console.log(body, error);

  if (!body) res.status(400).send(error);

  Achivement.findByIdAndUpdate(id, body, { new: true, useFindAndModify: false })
    .then(achivement => {
      res.send(achivement);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({ error: "Something went wrong. Try again Later!" });
    });
};

/**
 * Delete existing achivement field
 */
exports.deleteAchivement = (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  Achivement.findByIdAndDelete(id)
    .then(() => {
      return User.findByIdAndUpdate(
        userId,
        { $pull: { achivements: id } },
        { new: true, useFindAndModify: false }
      );
    })
    .then(user => {
      res.send(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({ error: "Something went wrong. Try again Later!" });
    });
};
