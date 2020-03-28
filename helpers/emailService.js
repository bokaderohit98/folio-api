const transporter = require("../config/nodemailer");

const sendMail = (email, subject, html) => {
  const { USER } = process.env;

  const mailOptions = {
    from: USER,
    to: email,
    subject,
    html
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, response) => {
      if (err) reject(err);
      else resolve(response);
    });
  });
};

const sendVerificationEmail = (email, url) => {
  const { HOST, PORT, NODE_ENV } = process.env;

  const subject = "Verify your email for Folio";
  const html = `<h4>Click below link to verify your Email</h4><a href=${HOST}${
    NODE_ENV !== "production" ? `:${PORT}` : ""
  }/api/user/verify/${url}>Verify</a>`;

  return sendMail(email, subject, html);
};

const sendOTP = (email, otp) => {
  const subject = "Your One Time Password to log into Folio";
  const html = `<h4>Use the otp below to log into Folio</h4><h3>${otp}</h3>`;

  return sendMail(email, subject, html);
};

module.exports = {
  sendVerificationEmail,
  sendOTP
};
