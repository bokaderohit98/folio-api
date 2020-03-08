const transporter = require("../config/nodemailer");

exports.sendVerificationEmail = (email, url) => {
  const { USER, HOST, PORT } = process.env;

  const mailOptions = {
    from: USER,
    to: email,
    subject: "Verify your email for Folio",
    html: `<h4>Click below link to verify your Email</h4><a href=${HOST}:${PORT}/api/user/verify/${url}>Verify</a>`
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, response) => {
      if (err) reject(err);
      else resolve(response);
    });
  });
};
