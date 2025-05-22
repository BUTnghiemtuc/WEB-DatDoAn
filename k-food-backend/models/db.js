const sql = require("mssql");
require("dotenv").config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,  // ⚠ phải là string không null
  database: process.env.DB_NAME,
  port: 1433,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

console.log("🔍 DEBUG cấu hình:", config); // 👈 Dòng này giúp test

const pool = new sql.ConnectionPool(config);

pool.connect()
  .then(() => {
    console.log("✅ Đã kết nối SQL Server thành công!");
  })
  .catch(err => {
    console.error("❌ Lỗi kết nối SQL Server:", err);
  });

module.exports = pool;
