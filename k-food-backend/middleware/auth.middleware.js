const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) return res.status(401).json({ message: "Thiếu token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // chứa id và role
    next();
  } catch (err) {
    res.status(401).json({ message: "Token không hợp lệ" });
  }
};

module.exports = authMiddleware;
