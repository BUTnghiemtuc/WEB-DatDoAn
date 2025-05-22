const db = require("../models/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (req, res) => {
  const { username, password, full_name, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    db.query(
      "INSERT INTO users (username, password, full_name, role) VALUES (?, ?, ?, ?)",
      [username, hashedPassword, full_name, role || "user"],
      (err, result) => {
        if (err) return res.status(500).json({ message: "Lỗi đăng ký", error: err });
        res.json({ message: "Đăng ký thành công" });
      }
    );
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err });
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

      res.json({ message: "Đăng nhập thành công", token, user });
    });
  } catch (err) {
    console.error("💥 Lỗi tại login:", err);
    res.status(500).json({ message: "Lỗi server trong login", error: err });
  }
};
