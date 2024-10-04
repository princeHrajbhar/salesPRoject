import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail', // or any email service you are using
  auth: {
    user: process.env.EMAIL_USER,  // Your email id
    pass: process.env.EMAIL_PASS   // Your password
  }
});

export const sendVerificationEmail = async (email: string, otp: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Verify your email',
    html: `<p>Your verification OTP is <strong>${otp}</strong></p>`
  };

  return await transporter.sendMail(mailOptions);
};

export const sendPasswordResetEmail = async (email: string, otp: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Password Reset Request',
    html: `<p>Your password reset OTP is <strong>${otp}</strong></p>`
  };

  return await transporter.sendMail(mailOptions);
};
