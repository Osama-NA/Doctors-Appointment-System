const mongoose = require('mongoose');

const Appointment = new mongoose.Schema(
    {
        appointment_for: {type: String, required: true},
        appointment_by: {type: String, required: true},
        appointment_date: {type: String, required: true},
        note: {type: String}
    },{
        collection: 'appointment'
    }
)

const model = mongoose.model('appointment', Appointment);

module.exports = model;