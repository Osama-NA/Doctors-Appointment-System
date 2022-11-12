require("dotenv").config();
const userModel = require("../../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { email, username, password, role, profileImage } = req.body;

  if(!password || !email || !role || !username){ 
    return res.json({ status: "error", error: 'Missing fields' });
  }
  
  const matchingEmails = await userModel.find({ email });

  if(matchingEmails.length > 0){
      return res.json({ status: "error", error: 'This email is already taken' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await userModel.create({
      email,
      username,
      password: hashedPassword,
      role,
      profileImage
    });

    const secret = process.env.JWT_SECRET_TOKEN;
    const token = jwt.sign({ email }, secret);

    return res.json({ status: "ok", token, user });
  } catch (error) {
    return res.json({ status: "error", error: error.message });
  }
};

module.exports = register;