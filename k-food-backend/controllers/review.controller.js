const reviewModel = require("../models/review.model");

exports.getByFoodId = async (req, res) => {
  try {
    const reviews = await reviewModel.getReviewsByFoodId(req.params.foodId);
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: "Lỗi khi lấy đánh giá" });
  }
};

exports.create = async (req, res) => {
  try {
    await reviewModel.addReview(req.body);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Lỗi khi thêm đánh giá" });
  }
};
