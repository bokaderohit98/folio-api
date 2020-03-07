const jwt = require("jsonwebtoken");
const { User } = require("../models");

const auth = (req, res, next) => {
  if (!req.header("Authorization"))
    res.status(401).send({ error: "Unauthorized access" });
  const token = req.header("Authorization").replace("Bearer ", "");
  const payload = jwt.verify(token, process.env.JWT_SECRET);

  User.findOne({ _id: payload._id, "tokens.token": token })
    .then(user => {
      if (!user) throw new Error("User not found");
      req.token = token;
      req.user = user;
      next();
    })
    .catch(err => {
      console.log(err);
      res.status(401).send({ error: "Unauthorized access" });
    });
};

module.exports = auth;
