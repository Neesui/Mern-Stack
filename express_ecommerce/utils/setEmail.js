const nodemailer=require('nodemailer')

const sentEmail=options=>{
    // const transport = nodemailer.createTransport({
    //     host: process.env.SMTP_HOST,
    //     port: process.env.SMTP_PORT,
    //     auth: {
    //     user: process.env.SMTP_USER,
    //     pass: process.env.SMTP_PASS
    //     }
    // });
    // Looking to send emails in production? Check out our Email API/SMTP product!
var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "89a60872423136",
      pass: "5472b85444bc9a"
    }
  });

    const mailOptions={
        from:options.from,
        to:options.to,
        subject:options.subject,
        text:options.text,
        html:options.html
    }

    transport.sendMail(mailOptions)
}

module.exports = sentEmail