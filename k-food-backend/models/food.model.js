const db = require("./db");
const sql = require("mssql");

exports.getAllFoods = async () => {
  const result = await db.request().query("SELECT * FROM foods");
  return result.recordset;
};

exports.getFoodById = async (id) => {
  const result = await db.request()
    .input("id", sql.Int, id)
    .query("SELECT * FROM foods WHERE id = @id");
  return result.recordset[0];
};

exports.createFood = async (food) => {
  const { name, price, image_url, description } = food;
  await db.request()
    .input("name", sql.NVarChar, name)
    .input("price", sql.Float, price)
    .input("image_url", sql.Text, image_url)
    .input("description", sql.Text, description)
    .query(`INSERT INTO foods (name, price, image_url, description)
            VALUES (@name, @price, @image_url, @description)`);
};

exports.updateFood = async (id, food) => {
  const { name, price, image_url, description } = food;
  await db.request()
    .input("id", sql.Int, id)
    .input("name", sql.NVarChar, name)
    .input("price", sql.Float, price)
    .input("image_url", sql.Text, image_url)
    .input("description", sql.Text, description)
    .query(`UPDATE foods
            SET name = @name, price = @price, image_url = @image_url, description = @description
            WHERE id = @id`);
};

exports.deleteFood = async (id) => {
  await db.request()
    .input("id", sql.Int, id)
    .query("DELETE FROM foods WHERE id = @id");
};
