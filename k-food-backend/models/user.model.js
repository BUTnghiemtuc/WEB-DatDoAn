const db = require("./db");
const sql = require("mssql");

exports.getAllUsers = async () => {
  const request = await db.request();
  const result = await request.query("SELECT id, username, full_name, role FROM users");
  return result.recordset;
};

exports.getUserById = async (id) => {
  const request = await db.request();
  const result = await request
    .input("id", sql.Int, id)
    .query("SELECT id, username, full_name, role FROM users WHERE id = @id");
  return result.recordset[0];
};

exports.createUser = async (user) => {
  const { username, password, full_name, role } = user;
  const request = await db.request();
  await request
    .input("username", sql.VarChar, username)
    .input("password", sql.VarChar, password)
    .input("full_name", sql.NVarChar, full_name)
    .input("role", sql.VarChar, role || "user")
    .query(`
      INSERT INTO users (username, password, full_name, role)
      VALUES (@username, @password, @full_name, @role)
    `);
};

exports.deleteUser = async (id) => {
  const request = await db.request();
  await request.input("id", sql.Int, id).query("DELETE FROM users WHERE id = @id");
};
