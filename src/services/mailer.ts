import nodemailer from 'nodemailer';
import config from '@/config';

const sendWelcomeMail = async (email: string) => {
  const message = {
    from: 'hello@friends.app',
    to: email,
    subject: 'Message title',
    text: 'Plaintext version of the message',
    html: '<p>HTML version of the message</p>',
  };

  try {
    const transporter = nodemailer.createTransport({
      // host: 'smtp.ethereal.email',
      // port: 587,
      // secure: false, // true for 465, false for other ports
      service: 'gmail',
      auth: {
        user: config.emails.user,
        pass: config.emails.pass,
      },
    });
    await transporter.sendMail(message);

    return { delivered: 1, status: 'ok' };
  } catch (e) {
    return { delivered: 0, status: 'error' };
  }
};

export default {
  sendWelcomeMail,
};
