require("dotenv").config();
const jwt = require("jsonwebtoken");
const userModel = require("../../models/user.model");
const appointmentModel = require("../../models/appointment.model");

const getAppointments = async (req, res) => {
    const token = req.headers['x-access-token'];
    const secret = process.env.JWT_SECRET_TOKEN;
    const { id, role } = req.query;
    
    if(!token || !id || !role){
        return res.json({ status: 'error', error: 'Missing data' })
    }

    try{
        jwt.verify(token, secret);
        let appointments = []
        let users = await userModel.find()

        if(role === 'doctor'){
            appointments = await appointmentModel.find({booked_for: id, confirmed: true});
            appointments = appointments.map( appointment => {
                let bookedBy = users.filter(user => user.id === appointment.booked_by)[0];
                
                return {
                    ...appointment._doc,
                    user: bookedBy
                }
            })
        }else{
            appointments = await appointmentModel.find({booked_by: id, confirmed: true});

            appointments = appointments.map( appointment => {
                let bookedFor = users.filter(user => user.id === appointment.booked_for)[0];

                return {
                    ...appointment._doc,
                    user: bookedFor
                }
            })
        }

        return res.json({ status: 'ok', appointments })
    }catch(error){
        return res.json({ status: 'error', error: 'Invalid token' })
    }
};

module.exports = getAppointments;