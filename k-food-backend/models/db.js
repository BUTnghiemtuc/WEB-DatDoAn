const sql = require("mssql");
require("dotenv").config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  port: 1433,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

console.log("🔍 DEBUG cấu hình:", config);

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log("✅ Đã kết nối SQL Server thành công!");
    return pool;
  })
  .catch(err => {
    console.error("❌ Lỗi kết nối SQL Server:", err);
  });

module.exports = {
  sql,
  poolPromise,
  request: async () => {
    const pool = await poolPromise;
    return pool.request(); // <-- hàm đúng phải trả về pool.request()
  }
};
