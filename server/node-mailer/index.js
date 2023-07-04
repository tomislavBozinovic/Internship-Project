const nodemailer = require('nodemailer');
const logger = require('../logger/winston');

const config = require('../config');
const { email: { 
  emailAddressFrom,
  emailPassword,
  emailAddressTo
 } } = config;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: emailAddressFrom,
    pass: emailPassword
  }
});

const sendEmail = function(
    from = emailAddressFrom, 
    to = emailAddressTo,
    subject = 'TodoApp Problem!',
    text) {
  const mailOptions = {
    from,
    to,
    subject,
    text
  }

  transporter.sendMail(mailOptions, (error, _) => {
    if(error) {
      logger.error('Could not send an email');
    } else {
      logger.info(`Email sent to ${mailOptions.to}`);
    }
  })
}

module.exports = sendEmail;