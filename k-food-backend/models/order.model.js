const db = require("./db");
const sql = require("mssql");

exports.createOrder = async (userId, items, address, payment_method, total_price) => {
  const request = db.request();
  request.input("user_id", sql.Int, userId);
  request.input("address", sql.NVarChar, address);
  request.input("payment_method", sql.NVarChar, payment_method);
  request.input("total_price", sql.Decimal(18, 2), total_price);

  const orderResult = await request.query(`
    INSERT INTO orders (user_id, address, payment_method, total_price)
    OUTPUT INSERTED.id
    VALUES (@user_id, @address, @payment_method, @total_price)
  `);
  const orderId = orderResult.recordset[0].id;

  for (const item of items) {
    await db.request()
    .input("order_id", sql.Int, orderId)
    .input("food_id", sql.Int, item.food_id)
    .input("quantity", sql.Int, item.quantity)
    .input("price", sql.Decimal(18, 2), item.price)
    .query(`
      INSERT INTO order_items (order_id, food_id, quantity, price)
      VALUES (@order_id, @food_id, @quantity, @price)
    `);

  }

  return orderId;
};

exports.getOrdersByUser = async (userId) => {
  const result = await db.request()
    .input("user_id", sql.Int, userId)
    .query(`
      SELECT o.*, oi.food_id, oi.quantity
      FROM orders o
      JOIN order_items oi ON o.id = oi.order_id
      WHERE o.user_id = @user_id
    `);
  return result.recordset;
};

exports.getAllOrders = async () => {
  const result = await db.request().query(`
    SELECT o.*, u.username
    FROM orders o
    JOIN users u ON o.user_id = u.id
  `);
  return result.recordset;
};

exports.getOrderById = async (orderId) => {
  const result = await db.request()
    .input("id", sql.Int, orderId)
    .query(`
      SELECT o.*, oi.food_id, oi.quantity, f.name AS food_name, f.price
      FROM orders o
      JOIN order_items oi ON o.id = oi.order_id
      JOIN food f ON oi.food_id = f.id
      WHERE o.id = @id
    `);
  return result.recordset;
};

exports.updateOrderStatus = async (orderId, status) => {
  await db.request()
    .input("id", sql.Int, orderId)
    .input("status", sql.VarChar, status)
    .query(`
      UPDATE orders SET status = @status WHERE id = @id
    `);
};
