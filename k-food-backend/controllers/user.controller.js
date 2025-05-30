const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

exports.getAll = async (req, res) => {
  try {
    const users = await User.getAllUsers();
    res.json(users);
  } catch (err) {
    console.error("🔥 Lỗi getAllUsers:", err);
    res.status(500).json({ message: "Lỗi lấy danh sách user", error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const user = await User.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: "Không tìm thấy user" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Lỗi truy vấn", error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { username, password, full_name, role } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    await User.createUser({ username, password: hashed, full_name, role });
    res.json({ message: "Tạo user thành công" });
  } catch (err) {
    console.error("🔥 Lỗi tạo user:", err);
    res.status(500).json({ message: "Lỗi tạo user", error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await User.deleteUser(req.params.id);
    res.json({ message: "Xóa user thành công" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi xóa user", error: err.message });
  }
};
