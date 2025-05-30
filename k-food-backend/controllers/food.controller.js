const Food = require("../models/food.model");

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

exports.remove = async (req, res) => {
  try {
    await Food.deleteFood(req.params.id);
    res.json({ message: "Xóa thành công" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi xóa", error: err });
  }
};
