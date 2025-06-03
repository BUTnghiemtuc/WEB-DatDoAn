const Review = require("../models/review.model");

exports.getReviewsByFoodId = async (req, res) => {
  try {
    const reviews = await Review.getReviewsByFoodId(req.params.foodId);
    res.json(reviews);
  } catch (err) {
    console.error("🔥 Lỗi khi lấy đánh giá:", err);
    res.status(500).json({ message: "Lỗi server khi lấy đánh giá" });
  }
};

exports.addReview = async (req, res) => {
  try {
    const { user_id, food_id, rating, comment } = req.body;
    await Review.addReview(user_id, food_id, rating, comment);
    res.json({ message: "✅ Gửi đánh giá thành công" });
  } catch (err) {
    console.error("❌ Lỗi khi gửi đánh giá:", err);
    res.status(500).json({ message: "Lỗi server khi gửi đánh giá" });
  }
};
