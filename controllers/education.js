const { User, Education } = require("../models");
const validations = require("../helpers/validations");

/**
 * Add new education field
 */
exports.addEducation = (req, res) => {
  const { body, error } = validations.validateEducation(req.body);
  // TODO: replace with actual user id
  const user_id = "5e638b86b70f8e0660cbf59e";

  if (!body) res.status(400).send(error);

  new Education(body)
    .save()
    .then(edu => {
      return User.findByIdAndUpdate(
        user_id,
        {
          $push: { educations: edu._id }
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
 * Edit existing education field
 */
exports.editEducation = (req, res) => {
  const { id } = req.params;
  const user_id = "5e638b86b70f8e0660cbf59e";

  const { body, error } = validations.validateUpdatedEducation(req.body);

  console.log(body, error);

  if (!body) res.status(400).send(error);

  Education.findByIdAndUpdate(id, body, { new: true, useFindAndModify: false })
    .then(edu => {
      res.send(edu);
    })
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
  const user_id = "5e638b86b70f8e0660cbf59e";

  Education.findByIdAndDelete(id)
    .then(() => {
      return User.findByIdAndUpdate(
        user_id,
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
