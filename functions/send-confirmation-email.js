const nodemailer = require('nodemailer');

exports.handler = async (event) => {
  const { email, name } = JSON.parse(event.body);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'kailashyatra365@gmail.com',        // replace with your Gmail
      pass: 'frgb yjif ohdh rsnp',           // use app password (not your normal password)
    }
  });

  const mailOptions = {
    from: 'yourgmail@gmail.com',
    to: email,
    subject: 'Thanks for your Enquiry!',
    html: `<p>Dear ${name},</p><p>Thank you for your interest in our Kailash Mansarovar Yatra. We’ll get back to you shortly.</p><p>Warm regards,<br/>KailashYatra Pvt. Ltd.</p>`
  };

  try {
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
