require("dotenv").config();
const jwt = require("jsonwebtoken");
const userModel = require("../../models/user.model");

const getUserData = async (req, res) => {
    const token = req.headers['x-access-token'];
    const { id } = req.query;
    const secret = process.env.JWT_SECRET_TOKEN;

    if(!token || !id){
        console.log(id)
        return res.json({ status: 'error', error: 'Missing data' })
    }

    try{
        jwt.verify(token, secret);
        const user = await userModel.findOne({_id: id})

        return res.json({ status: 'ok', user })
    }catch(error){
        return res.json({ status: 'error', error: 'Invalid token' })
    }
};

module.exports = getUserData;