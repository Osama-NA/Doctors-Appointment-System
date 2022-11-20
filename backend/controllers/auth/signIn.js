require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const specialityModel = require("../../models/speciality.model");
const userModel = require("../../models/user.model");

const signIn = async (req, res) => {
  const { email, password, role } = req.body;

  if (!password || !email || !role) {
    return res.json({ status: "error", error: "Missing fields" });
  }

  let user = await userModel.findOne({ email, role });

  if (!user) {
    return res.json({
      status: "error",
      error: "Could not find an account connected to this email and role",
    });
  }

  const isCorrectPassword = await bcrypt.compare(password, user.password);

  if (!isCorrectPassword) {
    return res.json({ status: "error", error: "Incorrect password" });
  }

  try {
    const secret = process.env.JWT_SECRET_TOKEN;
    const token = jwt.sign({ email }, secret);

    let doctor = undefined
    
    if (user.role === "doctor") {
      const speciality = await specialityModel.findOne({ doctor_id: user.id });

      doctor = {
        ...user._doc,
        speciality: speciality ? speciality.speciality : "",
      };
    }

    user = doctor ? doctor : user
    
    return res.json({ status: "ok", token, user });
  } catch (error) {
    console.log(error)
    return res.json({ status: "error", error: "Invalid token" });
  }
};

module.exports = signIn;
