const nodemailer = require('nodemailer');

const sendEmail = async (email, subject, text) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: process.env.EMAIL_PORT,
      secure: process.env.SECURE,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject,
      text,
    });

    console.log('Email send successfully');
  } catch (error) {
    console.log(`Email not send ${error}`);
  }
};

module.exports =  sendEmail;
