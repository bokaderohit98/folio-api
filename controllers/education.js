const { User, Education } = require("../models");
const validations = require("../helpers/validations");

/**
 * Add new education field
 */
exports.addEducation = (req, res) => {
  const { body, error } = validations.validateEducation(req.body);
  const userId = req.user._id;

  if (!body) res.status(400).send(error);

  new Education(body)
    .save()
    .then(edu => {
      return User.findByIdAndUpdate(
        userId,
        {
          $push: { educations: edu._id }
        },
        { new: true, useFindAndModify: false }
      );
    })
    .then(user => Education.find({ _id: { $in: user.educations } }))
    .then(educations => res.send(educations))
    .catch(err => {
      console.log(err);
      res.status(500).send({ error: "Something went wrong. Try again Later!" });
    });
};

/**
 * Edit existing education field
 */
exports.editEducation = (req, res) => {
  const { id } = req.params;

  const { body, error } = validations.validateUpdatedEducation(req.body);
  const { user } = req;

  if (!body) res.status(400).send(error);

  Education.findByIdAndUpdate(id, body, { new: true, useFindAndModify: false })
    .then(() => Education.find({ _id: { $in: user.educations } }))
    .then(educations => res.send(educations))
    .catch(err => {
      console.log(err);
      res.status(500).send({ error: "Something went wrong. Try again Later!" });
    });
};

/**
 * Delete existing education field
 */
exports.deleteEducation = (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  Education.findByIdAndDelete(id)
    .then(() => {
      return User.findByIdAndUpdate(
        userId,
        { $pull: { educations: id } },
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
