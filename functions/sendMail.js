const nodemailer = require('nodemailer');

exports.handler = async (event) => {
  const data = JSON.parse(event.body);

  // Email transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'kailashyatra365@gmail.com',        // replace with your Gmail
      pass: 'frgb yjif ohdh rsnp',           // use app password (not your normal password)
    },
  });

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: data.email,
    subject: 'Thank you for your enquiry',
    text: `Hi ${data.name},\n\nThanks for contacting us. We'll get back to you shortly!\n\n- KailashYatra Team`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
