const db = require("./models/db");

async function testFoods() {
  try {
    const request = await db.request();
    const result = await request.query("SELECT TOP 5 * FROM foods");
    console.log("✅ Kết quả truy vấn:", result.recordset);
  } catch (err) {
    console.error("❌ Lỗi khi truy vấn bảng foods:", err);
  }
}

testFoods();
