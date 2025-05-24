const db = require("../models/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (req, res) => {
  const { username, password, full_name, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const request = db.request();

    request.input("username", username);
    request.input("password", hashedPassword);
    request.input("full_name", full_name);
    request.input("role", role || "user");

    await request.query(`
      INSERT INTO users (username, password, full_name, role)
      VALUES (@username, @password, @full_name, @role)
    `);

    res.json({ message: "Đăng ký thành công" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi đăng ký", error: err.message });
  }
};


exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const request = db.request();
    request.input("username", username);

    request.query("SELECT * FROM users WHERE username = @username", async (err, result) => {
      if (err || result.recordset.length === 0) {
        return res.status(401).json({ message: "Tài khoản không tồn tại" });
      }

      const user = result.recordset[0];
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ message: "Sai mật khẩu" });
      }

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      res.json({
        message: "Đăng nhập thành công",
        token,
        user: {
          id: user.id,
          username: user.username,
          full_name: user.full_name,
          role: user.role
        }
      });

    });
  } catch (err) {
    console.error("💥 Lỗi tại login:", err);
    res.status(500).json({ message: "Lỗi server trong login", error: err });
  }
};
