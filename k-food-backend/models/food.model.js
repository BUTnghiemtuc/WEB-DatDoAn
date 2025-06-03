const db = require("./db");
const sql = require("mssql");

exports.getAllFoods = async () => {
  const request = await db.request();
  const result = await request.query("SELECT * FROM foods");
  return result.recordset;
};

exports.getFoodById = async (id) => {
  const request = await db.request();
  const result = await request
    .input("id", sql.Int, id)
    .query("SELECT * FROM foods WHERE id = @id");
  return result.recordset[0];
};

exports.getFoodsByUserId = async (userId) => {
  const request = await db.request();
  const result = await request
    .input("userId", sql.Int, userId)
    .query(`
      SELECT f.*
      FROM foods f
      JOIN restaurants r ON f.restaurant_id = r.id
      WHERE r.user_id = @userId
    `);
  return result.recordset;
};


exports.getFoodsByRestaurant = async (restaurantId) => {
  const request = await db.request();
  const result = await request
    .input("restaurantId", restaurantId)
    .query("SELECT * FROM foods WHERE restaurant_id = @restaurantId");
  return result.recordset;
};


exports.createFood = async (food) => {
  const { name, price, image_url, description, restaurant_id } = food;
  const request = await db.request();
  await request
    .input("name", sql.NVarChar, name)
    .input("price", sql.Float, price)
    .input("image_url", sql.Text, image_url)
    .input("description", sql.Text, description)
    .input("restaurant_id", sql.Int, restaurant_id)
    .query(`INSERT INTO foods (name, price, image_url, description, restaurant_id)
            VALUES (@name, @price, @image_url, @description, @restaurant_id)`);
};

exports.updateFood = async (id, food) => {
  const { name, price, image_url, description } = food;
  const request = await db.request();
  await request
    .input("id", sql.Int, id)
    .input("name", sql.NVarChar, name)
    .input("price", sql.Float, price)
    .input("image_url", sql.Text, image_url)
    .input("description", sql.Text, description)
    .query(`UPDATE foods
            SET name = @name, price = @price, image_url = @image_url, description = @description
            WHERE id = @id`);
};

exports.updateFoodAvailability = async (foodId, available) => {
  const request = await db.request();
  await request
    .input("foodId", sql.Int, foodId)
    .input("available", sql.Bit, available)
    .query(`
      UPDATE foods
      SET available = @available
      WHERE id = @foodId
    `);
};


exports.deleteFood = async (id) => {
  const request = await db.request();
  await request.input("id", sql.Int, id).query("DELETE FROM foods WHERE id = @id");
};
