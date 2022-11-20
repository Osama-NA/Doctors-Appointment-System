require("dotenv").config();
const jwt = require("jsonwebtoken");
const userModel = require("../../models/user.model");
const specialityModel = require("../../models/speciality.model");

const getDoctors = async (req, res) => {
    const token = req.headers['x-access-token'];
    const secret = process.env.JWT_SECRET_TOKEN;

    if(!token){
        return res.json({ status: 'error', error: 'Token missing' })
    }

    try{
        jwt.verify(token, secret);
        let users = await userModel.find()
        let specialities = await specialityModel.find();

        let doctors = users.filter(user => user.role === 'doctor')

        doctors = doctors.map(doctor => {
            let speciality = specialities.filter(speciality => speciality.doctor_id === doctor.id)

            
            return speciality.length === 0 ? doctor : {
                ...doctor._doc,
                speciality: speciality[0].speciality
            }
        })
        
        doctors = doctors.filter(doctor => doctor.speciality && doctor.speciality !== '')
        return res.json({ status: 'ok', doctors })
    }catch(error){
        return res.json({ status: 'error', error: 'Invalid token' })
    }
};

module.exports = getDoctors;