require("dotenv").config();
const userModel = require("../../models/user.model");
const appointmentModel = require("../../models/appointment.model");

const getBookings = async (req, res) => {
    const { id, role } = req.query;
    
    if( !id || !role){
        return res.json({ status: 'error', error: 'Missing data' })
    }

    try{
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

module.exports = getBookings;