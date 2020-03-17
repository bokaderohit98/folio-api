const { User, Work } = require("../models");
const validations = require("../helpers/validations");

/**
 * Add new work field
 */
exports.addWork = (req, res) => {
  const { body, error } = validations.validateWork(req.body);
  const userId = req.user._id;

  if (!body) res.status(400).send(error);

  new Work(body)
    .save()
    .then(work => {
      return User.findByIdAndUpdate(
        userId,
        {
          $push: { works: work._id }
        },
        { new: true, useFindAndModify: false }
      );
    })
    .then(user => Work.find({ _id: { $in: user.works } }))
    .then(works => res.send(works))
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

  const { body, error } = validations.validateUpdatedWork(req.body);
  const { user } = req;

  if (!body) res.status(400).send(error);

  Work.findByIdAndUpdate(id, body, { new: true, useFindAndModify: false })
    .then(() => Work.find({ _id: { $in: user.works } }))
    .then(works => res.send(works))
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
  const userId = req.user._id;

  Work.findByIdAndDelete(id)
    .then(() => {
      return User.findByIdAndUpdate(
        userId,
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
