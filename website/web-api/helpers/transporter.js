const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "hwsmtp.exmail.qq.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: "contact@suitntie.cn", // generated ethereal user
    pass: "gibJmdW5PszNRhVy", // generated ethereal password
  },
});
module.exports = transporter;
