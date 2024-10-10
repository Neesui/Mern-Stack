const nodemailer = require('nodemailer');

const send = (email, token) => {
  // Nodemailer transporter configuration (using Mailtrap for testing)
 // Looking to send emails in production? Check out our Email API/SMTP product!
// var transporter = nodemailer.createTransport({
//     host: "sandbox.smtp.mailtrap.io",
//     port: 587,
//     secure:false,
//     auth: {
//       user: "89a60872423136",
//       pass: "5472b85444bc9a"
//     }
//   });
// Looking to send emails in production? Check out our Email API/SMTP product!
var transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    secure:false,
    auth: {
      user: "349608039b9e78",
      pass: "70964153c430fe"
    }
  });

  // Email data
  const mailOptions = {
    from: "bibashcdry46@gmail.com",
    to: email,
    subject: "Account activation link ✔",
    text: "Hello world?",
    html: `
      <h1>Please use the following link to activate your account</h1>
      <a>${process.env.CLIENT_URL}/auth/activate/${token}</a>
      <hr />
      <p>This email may contain sensitive information</p>
      <p>${process.env.CLIENT_URL}</p>
    `,
  };

  // Send email using Nodemailer
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error occurred:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

// Export the send function
module.exports = send;
