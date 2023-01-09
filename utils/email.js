const nodemailer = require('nodemailer');
// const { google } = require('googleapis');
const pug = require('pug');
const { htmlToText } = require('html-to-text');
// const sgMail = require('@sendgrid/mail');

const oauth_link = 'https://developers.google.com/oauthplayground';

// const auth = new google.auth.OAuth2(
//   process.env.MAILLING_ID,
//   process.env.MAILLING_SECRET,
//   oauth_link
// );

// auth.setCredentials({
//   refresh_token: process.env.MAILLING_REFRESH_TOKEN,
// });

// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstname = user.first_name;
    this.url = url;
    this.from = process.env.EMAIL_ID;
  }

  // async newTransport(mailOptions) {
  //   let transport;

  //   if (process.env.EMAIL_TYPE === 'gmail') {
  //     transport = nodemailer.createTransport({
  //       service: 'Gmail',
  //       host: 'smtp.gmail.com',
  //       secure: false,
  //       auth: {
  //         user: process.env.EMAIL_ID,
  //         pass: process.env.GMAIL_APPA_PASSWORD,
  //       },
  //     });
  //   } else {
  //     if (process.env.NODE_ENV === 'production') {
  //       const accessToken = await auth.getAccessToken();
  //       transport = nodemailer.createTransport({
  //         service: 'gmail',
  //         secure: true,
  //         greetingTimeout: 1000 * 4,
  //         auth: {
  //           type: 'OAuth2',
  //           user: process.env.EMAIL_ID,
  //           clientId: process.env.MAILLING_ID,
  //           clientSecret: process.env.MAILLING_SECRET,
  //           refreshToken: process.env.MAILLING_REFRESH_TOKEN,
  //           accessToken: accessToken,
  //         },
  //       });
  //     } else {
  //       transport = nodemailer.createTransport({
  //         host: process.env.TRAP_EMAIL_HOST,
  //         port: process.env.TRAP_EMAIL_PORT,
  //         auth: {
  //           user: process.env.TRAP_EMAIL_USERNAME,
  //           pass: process.env.TRAP_EMAIL_PASSWORD,
  //         },
  //       });
  //     }
  //   }

  //   await transport.sendMail(mailOptions);
  // }

  async send(template, subject) {
    const html = pug.renderFile(
      `${__dirname}/../views/emails/${template}.pug`,
      { firstname: this.firstname, url: this.url, subject }
    );
    const mailOptions = {
      to: this.to,
      from: process.env.EMAIL_ID,
      subject: subject,
      text: htmlToText(html),
      html: html,
    };

    // await this.newTransport(mailOptions);

    // try {
    //   await sgMail.send(mailOptions);
    //   console.log('done');
    // } catch (error) {
    //   console.error(error);

    //   if (error.response) {
    //     console.error(error.response.body);
    //   }
    // }

    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      host: 'smtp.gmail.com',
      secure: false,
      auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    try {
      await transporter.sendMail(mailOptions);
    } catch (err) {
      console.log(err);
    }
  }

  async sendVerificationEmail() {
    await this.send('VerificationEmail', 'Backbook email verification');
  }

  async sendPasswordReset() {
    await this.send(
      'PasswordReset',
      `${this.url} is your Backbook recovery code ( Valid for 10 min )`
    );
  }
};
