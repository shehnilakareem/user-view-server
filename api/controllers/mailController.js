'use strict';


var controller = {};
var nodemailer = require('nodemailer');



function handleError(res, err) {
  console.error(err);
  return res.status(500).send(err);
}


controller.send_a_mail = function (req, res) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: '587',
      auth: {
        user: process.env.email, // generated ethereal user
        pass: process.env.password // generated ethereal password
      },
      secureConnection: 'false',
      tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false

      }
    });

    // setup email data with unicode symbols
    let mailOptions = {
      from: req.body.senderEmail, // sender address
      to: 'touqeeeraslam@gmail.com, shehnila.kareem@hotmail.com', // list of receivers
      subject: 'Portfolio Contact', // Subject line
      text: req.body.message, // plain text body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return handleError(res,'Your message could not be sent , please try again later');
      }
      return res.status(200).json('Email Sent');
      

    });
  });

}


module.exports = controller;