require("dotenv").config();
const jwt = require("jsonwebtoken");
const userModel = require("../../models/user.model");
const appointmentModel = require("../../models/appointment.model");

const getPatientBookings = async (req, res) => {
    const token = req.headers['x-access-token'];
    const secret = process.env.JWT_SECRET_TOKEN;
    const { id, role } = req.query;
    
    if(!token || !id || !role){
        return res.json({ status: 'error', error: 'Missing data' })
    }

    try{
        jwt.verify(token, secret);
        let bookings = []
        let users = await userModel.find()

        if(role === 'doctor'){
            bookings = await appointmentModel.find({booked_for: id, confirmed: false});
            bookings = bookings.map( booking => {
                let bookedBy = users.filter(user => user.id === booking.booked_by)[0];
                
                return {
                    ...booking._doc,
                    user: bookedBy
                }
            })
        }else{
            bookings = await appointmentModel.find({booked_by: id, confirmed: false});

            bookings = bookings.map( booking => {
                let bookedFor = users.filter(user => user.id === booking.booked_for)[0];

                return {
                    ...booking._doc,
                    user: bookedFor
                }
            })
        }

        return res.json({ status: 'ok', bookings })
    }catch(error){
        return res.json({ status: 'error', error: 'Invalid token' })
    }
};

module.exports = getPatientBookings;