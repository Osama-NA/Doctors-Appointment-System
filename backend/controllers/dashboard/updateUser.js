require("dotenv").config();
const userModel = require("../../models/user.model");
const specialityModel = require("../../models/speciality.model");
const bcrypt = require("bcrypt");

const updateUser = async (req, res) => {
  const { id, username, speciality, confirmPassword, profileImage } = req.body;

  if (!id || !username  || !confirmPassword) {
    return res.json({ status: "error", error: "Missing fields" });
  }

  let user = await userModel.findOne({ _id: id });

  if (!user) {
    return res.json({
      status: "error",
      error: "Could not find user",
    });
  }

  const isCorrectPassword = await bcrypt.compare(
    confirmPassword,
    user.password
  );

  if (!isCorrectPassword) {
    return res.json({ status: "error", error: "Incorrect password" });
  }


  try {
    if (username !== user.username) {
      user.username = username;
    }

    if (profileImage) {
        user.profileImage = profileImage;
    }

    user.save();

    let doctor = undefined;
    if (user.role === "doctor") {
      const currentSpeciality = await specialityModel.findOne({
        doctor_id: user.id,
      });

      if (!currentSpeciality || currentSpeciality.speciality !== speciality) {
        currentSpeciality.speciality = speciality;
        currentSpeciality.save();
      }

      doctor = {
        ...user._doc,
        speciality: currentSpeciality ? currentSpeciality.speciality : "",
      };
    }

    user = doctor ? doctor : user;

    return res.json({ status: "ok", user });
  } catch (error) {
    return res.json({ status: "error", error: error.message });
  }
};

module.exports = updateUser;
