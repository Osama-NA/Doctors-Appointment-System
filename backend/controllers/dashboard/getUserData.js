require("dotenv").config();
const jwt = require("jsonwebtoken");
const specialityModel = require("../../models/speciality.model");
const userModel = require("../../models/user.model");

const getUserData = async (req, res) => {
    const token = req.headers['x-access-token'];
    const { id } = req.query;
    const secret = process.env.JWT_SECRET_TOKEN;

    if(!token || !id){
        return res.json({ status: 'error', error: 'Missing data' })
    }

    try{
        jwt.verify(token, secret);
        let user = await userModel.findOne({_id: id})
        let doctor = undefined

        if(user.role === 'doctor'){
            const speciality = await specialityModel.findOne({ doctor_id: id });
            
            doctor = {
                ...user._doc,
                speciality: speciality ? speciality.speciality : ''
            }
        }

        user = doctor ? doctor : user

        return res.json({ status: 'ok', user })
    }catch(error){
        return res.json({ status: 'error', error: 'Invalid token' })
    }
};

module.exports = getUserData;