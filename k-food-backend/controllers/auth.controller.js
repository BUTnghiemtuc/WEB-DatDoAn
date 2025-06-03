const db = require("../models/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const sql = db.sql;

// Đăng ký tài khoản
exports.register = async (req, res) => {
  const { id, username, password, full_name, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const request = await db.request();
    await request
      .input("id", sql.Int, id) // 👈 thêm dòng này để nhận id
      .input("username", sql.VarChar, username)
      .input("password", sql.VarChar, hashedPassword)
      .input("full_name", sql.NVarChar, full_name)
      .input("role", sql.VarChar, role || "user")
      .query(`
        SET IDENTITY_INSERT users ON;
        INSERT INTO users (id, username, password, full_name, role)
        VALUES (@id, @username, @password, @full_name, @role);
        SET IDENTITY_INSERT users OFF;
      `);

    res.json({ message: "Đăng ký thành công với ID" });
  } catch (err) {
    console.error("🔥 Lỗi đăng ký:", err);
    res.status(500).json({ message: "Lỗi đăng ký", error: err.message });
  }
};


// Đăng nhập
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const request = await db.request(); // ✅ thêm await
    const result = await request
      .input("username", sql.VarChar, username)
      .query("SELECT * FROM users WHERE username = @username");

    const user = result.recordset[0];

    if (!user) {
      return res.status(401).json({ message: "Tài khoản không tồn tại" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Sai mật khẩu" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || "secret", // fallback nếu chưa có biến môi trường
      { expiresIn: "1d" }
    );

    res.json({
      message: "Đăng nhập thành công",
      token,
      user: {
        id: user.id,
        username: user.username,
        full_name: user.full_name,
        role: user.role,
      },
    });

  } catch (err) {
    console.error("💥 Lỗi tại login:", err);
    res.status(500).json({ message: "Lỗi server trong login", error: err.message });
  }
};
