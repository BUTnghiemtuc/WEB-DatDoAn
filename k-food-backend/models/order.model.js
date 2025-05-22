const db = require("./db");
const sql = require("mssql");

exports.createOrder = async (userId, items) => {
  const request = db.request();
  request.input("user_id", sql.Int, userId);

  // 1. Tạo đơn hàng
  const orderResult = await request.query(`
    INSERT INTO orders (user_id) OUTPUT INSERTED.id VALUES (@user_id)
  `);
  const orderId = orderResult.recordset[0].id;

  // 2. Thêm các món ăn vào order_items
  for (const item of items) {
    await db.request()
      .input("order_id", sql.Int, orderId)
      .input("food_id", sql.Int, item.food_id)
      .input("quantity", sql.Int, item.quantity)
      .query(`
        INSERT INTO order_items (order_id, food_id, quantity)
        VALUES (@order_id, @food_id, @quantity)
      `);
  }

  return orderId;
};

exports.getOrdersByUser = async (userId) => {
  const result = await db.request()
    .input("user_id", sql.Int, userId)
    .query(`
      SELECT o.id, o.status, o.created_at, oi.food_id, oi.quantity
      FROM orders o
      JOIN order_items oi ON o.id = oi.order_id
      WHERE o.user_id = @user_id
    `);
  return result.recordset;
};

exports.getAllOrders = async () => {
  const result = await db.request().query(`
    SELECT o.id, o.status, o.created_at, u.username
    FROM orders o
    JOIN users u ON o.user_id = u.id
  `);
  return result.recordset;
};

exports.updateOrderStatus = async (orderId, status) => {
  await db.request()
    .input("id", sql.Int, orderId)
    .input("status", sql.VarChar, status)
    .query("UPDATE orders SET status = @status WHERE id = @id");
};
