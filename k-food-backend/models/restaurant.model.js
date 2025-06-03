const db = require("./db");
const sql = require("mssql");

exports.getRestaurantByUserId = async (userId) => {
  const request = await db.request();
  const result = await request
    .input("userId", sql.Int, userId)
    .query("SELECT * FROM restaurants WHERE user_id = @userId");
  return result.recordset[0];
};
