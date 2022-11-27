require("dotenv").config();
const userModel = require("../../models/user.model");
const specialityModel = require("../../models/speciality.model");
const reviewModel = require("../../models/review.model");

const getDoctors = async (req, res) => {
    try{
        let reviews = await reviewModel.find();
        let users = await userModel.find()
        let specialities = await specialityModel.find();

        let doctors = users.filter(user => user.role === 'doctor')

        doctors = doctors.map(doctor => {
            let speciality = specialities.filter(speciality => speciality.doctor_id === doctor.id)

            reviews = reviews.filter(review => review.review_for === doctor.id)
            reviews = reviews.map(review => {
                let reviewedBy = users.filter(user => user.id === review.reviewed_by)[0]
                
                return {
                    ...review._doc,
                    reviewed_by: reviewedBy.username
                }
            })

            return speciality.length === 0 ? doctor : {
                ...doctor._doc,
                speciality: speciality[0].speciality,
                reviews
            }
        })
        
        doctors = doctors.filter(doctor => doctor.speciality && doctor.speciality !== '')
        return res.json({ status: 'ok', doctors })
    }catch(error){
        return res.json({ status: 'error', error: 'Invalid token' })
    }
};

module.exports = getDoctors;