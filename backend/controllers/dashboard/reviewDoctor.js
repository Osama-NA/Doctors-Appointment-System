require("dotenv").config();
const reviewModel = require("../../models/review.model");

const reviewDoctor = async (req, res) => {
  const { reviewBy, reviewFor, rating, review } = req.body;

  if (!reviewBy || !reviewFor || !rating || !review) {
    return res.json({ status: "error", error: "Missing fields" });
  }

  try {
    await reviewModel.create({
        reviewed_by: reviewBy,
        review_for: reviewFor,
        review,
        rating
    });

    return res.json({ status: "ok" });
  } catch (error) {
    return res.json({ status: "error", error: error.message });
  }
};

module.exports = reviewDoctor;