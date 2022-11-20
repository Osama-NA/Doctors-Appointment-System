require("dotenv").config();
const userModel = require("../../models/user.model");
const appointmentModel = require("../../models/appointment.model");

const getOverviewContent = async (req, res) => {
    const { id, role } = req.query;

    if(!id){
        return res.json({ status: 'error', error: 'Missing data' })
    }

    try{
        let bookings = []
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
            
            bookings = await appointmentModel.find({booked_for: id, confirmed: false});
            bookings = bookings.map( booking => {
                let bookedBy = users.filter(user => user.id === booking.booked_by)[0];
                
                return {
                    ...booking._doc,
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
            
            bookings = await appointmentModel.find({booked_by: id, confirmed: false});
            bookings = bookings.map( (booking, i) => {
                let bookedFor = users.filter(user => user.id === booking.booked_for)[0];

                return {
                    ...booking._doc,
                    user: bookedFor
                }
            })
        }

        return res.json({ status: 'ok', content: {appointments, bookings} })
    }catch(error){
        console.log(error)
        return res.json({ status: 'error', error: 'Invalid token' })
    }
};

module.exports = getOverviewContent;