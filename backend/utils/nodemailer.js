require('dotenv').config();
const nodemailer = require('nodemailer');
const EMAIL = process.env.EMAIL;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: "587",
    tls: {
        ciphers: "SSLv3",
        rejectUnauthorized: false,
    },
    requireTLS: true,
    auth: {
        user: EMAIL,
        pass: EMAIL_PASSWORD
    }
});

const options = (from, to, subject, text) => {
    return {from, to, subject, text}
}

const sendMail = (options) => {
    try {
        transporter.sendMail(options, (error, response) => {
            if (error) console.log(error);

            console.log(response);
        })
        
        return {status: 'ok'};
    } catch (error) {
        return {status: 'error', error: error.message};
    }
}

module.exports = {
    options,
    sendMail
}