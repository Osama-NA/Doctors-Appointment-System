require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../../models/user.model");

const signIn = async (req, res) => {
  const { email, password, role } = req.body;

  if(!password || !email || !role){ 
    return res.json({ status: "error", error: 'Missing fields' });
  }

  const user = await userModel.findOne({ email, role });

  if (!user) {
    return res.json({ 
        status: "error", 
        error: "Could not find an account connected to this email and role" 
    });
  }

  const isCorrectPassword = await bcrypt.compare(password, user.password);

  if (!isCorrectPassword) {
      return res.json({ status: 'error', error: 'Incorrect password' });
  }

  const secret = process.env.JWT_SECRET_TOKEN;
  const token = jwt.sign({ email }, secret)
  return res.json({ status: 'ok', token, user })
};

module.exports = signIn;