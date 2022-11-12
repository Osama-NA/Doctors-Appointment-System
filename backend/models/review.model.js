const mongoose = require('mongoose');

const Review = new mongoose.Schema(
    {
        reviewed_doctor: {type: String, required: true},
        review_by: {type: String, required: true},
        review: {type: String, required: true}
    },{
        collection: 'review'
    }
)

const model = mongoose.model('review', Review);

module.exports = model;