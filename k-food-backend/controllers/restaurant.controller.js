const restaurantModel = require("../models/restaurant.model");

exports.getByUserId = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const restaurant = await restaurantModel.getRestaurantByUserId(userId);
    if (!restaurant) {
      return res.status(404).json({ message: "Không tìm thấy nhà hàng" });
    }
    res.json(restaurant);
  } catch (err) {
    console.error("Lỗi khi lấy restaurant theo userId:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};
