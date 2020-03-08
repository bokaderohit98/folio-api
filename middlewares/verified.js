module.exports = (req, res, next) => {
  if (!req.user.verified) res.status(400).send({ error: "Unverified Email" });
  else next();
};
