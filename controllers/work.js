const { User, Work } = require("../models");
const validations = require("../helpers/validations");

/**
 * Add new work field
 */
exports.addWork = (req, res) => {
  const { body, error } = validations.validateWork(req.body);
  // TODO: replace with actual user id
  const user_id = "5e638b86b70f8e0660cbf59e";

  if (!body) res.status(400).send(error);

  new Work(body)
    .save()
    .then(work => {
      return User.findByIdAndUpdate(
        user_id,
        {
          $push: { works: work._id }
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
exports.editWork = (req, res) => {
  const { id } = req.params;
  const user_id = "5e638b86b70f8e0660cbf59e";

  const { body, error } = validations.validateUpdatedWork(req.body);

  console.log(body, error);

  if (!body) res.status(400).send(error);

  Work.findByIdAndUpdate(id, body, { new: true, useFindAndModify: false })
    .then(work => {
      res.send(work);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({ error: "Something went wrong. Try again Later!" });
    });
};

/**
 * Delete existing education field
 */
exports.deleteWork = (req, res) => {
  const { id } = req.params;
  const user_id = "5e638b86b70f8e0660cbf59e";

  Work.findByIdAndDelete(id)
    .then(() => {
      return User.findByIdAndUpdate(
        user_id,
        { $pull: { works: id } },
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
