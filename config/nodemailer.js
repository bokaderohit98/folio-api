const nodemailer = require("nodemailer");

const { USER, CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN } = process.env;

const auth = {
  type: "oauth2",
  user: USER,
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  refreshToken: REFRESH_TOKEN
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth
});

transporter.verify(err => {
  if (err) console.log(err);
  else console.log("Transporter Active");
});

module.exports = transporter;
