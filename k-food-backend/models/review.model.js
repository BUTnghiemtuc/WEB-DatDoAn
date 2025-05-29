const db = require("./db");
const sql = require("mssql");

exports.getReviewsByFoodId = async (foodId) => {
  const result = await db.request()
    .input("foodId", sql.Int, foodId)
    .query(`SELECT r.*, u.full_name 
            FROM reviews r 
            JOIN users u ON r.user_id = u.id 
            WHERE r.food_id = @foodId 
            ORDER BY r.created_at DESC`);
  return result.recordset;
};

exports.addReview = async (review) => {
  const { user_id, food_id, rating, comment } = review;
  await db.request()
    .input("user_id", sql.Int, user_id)
    .input("food_id", sql.Int, food_id)
    .input("rating", sql.Int, rating)
    .input("comment", sql.NVarChar, comment)
    .query(`INSERT INTO reviews (user_id, food_id, rating, comment) 
            VALUES (@user_id, @food_id, @rating, @comment)`);
};
