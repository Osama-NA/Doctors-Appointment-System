require("dotenv").config();
const appointmentModel = require("../../models/appointment.model");

const deleteAppointment = async (req, res) => {
  const { appointment_id, token, date } = req.body;

  if (!appointment_id || !token || !date ){
    return res.json({ status: "error", error: "Missing data" });
  }

  try {
    await appointmentModel.updateOne({_id: appointment_id}, {$set: {date}});

    return res.json({ status: "ok" });
  } catch (error) {
    return res.json({ status: "error", error: error.message });
  }
};

module.exports = deleteAppointment;