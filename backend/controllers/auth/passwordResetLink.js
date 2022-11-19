require('dotenv').config();
const userModel = require("../../models/user.model");
const jwt = require("jsonwebtoken");
const TOKEN_EXPIRY_TIME = "30m";
const { options, sendMail } = require("../../utils/nodemailer");

const passwordResetLink = async (req, res) => {
    const {email} = req.body;

    const user = await userModel.findOne({ email: email });

    if (!user) {
        return res.json({ status: 'error', error: 'Could not find account. Check your email for spelling errors and try again.' });
    }

    const id = user.id;

    // Generated link expires after using it to change 
    // the password once or after token expires
    const secret = process.env.JWT_SECRET_TOKEN + user.password;
    const payload = {email, id};
    const token = jwt.sign(payload, secret, { expiresIn: TOKEN_EXPIRY_TIME});

    const link = getPasswordResetLink(req, id, token);
    
    const response = sendResetLinkToUser(email, link);

    if(response.status !== "ok"){
        return res.json({status: 'error', error: response.error});
    }
    
    return res.json({status: 'ok'});
}

const sendResetLinkToUser = (toEmail, link) => {
    const fromEmail = process.env.EMAIL;
    const subject = "FindDoc Account Password Reset Link";
    const message = `
        Use the link below to reset your password:\n
        ${link}\n\n
        This link expires in ${TOKEN_EXPIRY_TIME}
    `;
    
    const mailingOptions = options(fromEmail, toEmail, subject, message);

    return sendMail(mailingOptions);
}

const getPasswordResetLink = (req, id, token) => {
    const CMS_HOST = process.env.CMS_HOST;
    
    return `${req.protocol}://${CMS_HOST}auth/change-password/${id}/${token}`;
}

module.exports = passwordResetLink