require("dotenv").config();
const reviewModel = require("../../models/review.model");

const deleteReview = async (req, res) => {
  const { review_id } = req.body;

  if (!review_id ){
    return res.json({ status: "error", error: "Missing data" });
  }

  try {
    await reviewModel.deleteOne({_id: review_id});

    return res.json({ status: "ok" });
  } catch (error) {
    return res.json({ status: "error", error: error.message });
  }
};

module.exports = deleteReview;