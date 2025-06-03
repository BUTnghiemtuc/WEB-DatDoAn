const Food = require("../models/food.model");
const foodModel = require("../models/food.model");

exports.getAll = async (req, res) => {
  try {
    const foods = await Food.getAllFoods(); // <- GỌI TỪ model
    res.json(foods);
  } catch (err) {
    console.error("🔥 Lỗi getAll:", err);
    res.status(500).json({ message: "Lỗi lấy danh sách món ăn", error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const food = await Food.getFoodById(req.params.id);
    if (!food) return res.status(404).json({ message: "Không tìm thấy món ăn" });
    res.json(food);
  } catch (err) {
    res.status(500).json({ message: "Lỗi truy vấn", error: err });
  }
};

exports.getByUserId = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const foods = await foodModel.getFoodsByUserId(userId);
    res.json(foods);
  } catch (err) {
    console.error("🔥 Lỗi getByUserId:", err);
    res.status(500).json({ message: "Lỗi server khi lấy món ăn theo userId" });
  }
};

exports.getByRestaurant = async (req, res) => {
  try {
    const foods = await Food.getByRestaurant(req.params.id);
    res.json(foods);
  } catch (err) {
    res.status(500).json({ message: "Lỗi lấy món ăn theo nhà hàng", error: err.message });
  }
};


exports.create = async (req, res) => {
  try {
    await Food.createFood(req.body);
    res.json({ message: "Thêm món ăn thành công" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi thêm món ăn", error: err });
  }
};

exports.update = async (req, res) => {
  try {
    await Food.updateFood(req.params.id, req.body);
    res.json({ message: "Cập nhật thành công" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi cập nhật", error: err });
  }
};

exports.updateAvailability = async (req, res) => {
  try {
    const foodId = parseInt(req.params.id);
    const { available } = req.body;
    await foodModel.updateFoodAvailability(foodId, available);
    res.json({ message: "Cập nhật tình trạng thành công" });
  } catch (err) {
    console.error("❌ Lỗi updateAvailability:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};


exports.remove = async (req, res) => {
  try {
    await Food.deleteFood(req.params.id);
    res.json({ message: "Xóa thành công" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi xóa", error: err });
  }
};
