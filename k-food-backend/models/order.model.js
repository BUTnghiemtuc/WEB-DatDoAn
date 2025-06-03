const db = require("./db");
const sql = require("mssql");

exports.createOrder = async (userId, items, address, payment_method, total_price) => {
  const pool = await db.poolPromise;
  const transaction = new sql.Transaction(pool);

  try {
    await transaction.begin();

    // 🔍 B1: Lấy restaurant_id từ món đầu tiên
    const foodRequest = new sql.Request(transaction);
    const foodResult = await foodRequest
      .input("foodId", sql.Int, items[0].food_id)
      .query("SELECT restaurant_id FROM foods WHERE id = @foodId");

    const restaurantId = foodResult.recordset[0]?.restaurant_id;
    if (!restaurantId) throw new Error("Không tìm được restaurant_id từ món ăn");

    // 🔧 B2: Gán shipper mặc định (ví dụ shipper01 có id = 7)
    const shipperId = 7;

    // ✅ B3: Tạo đơn hàng với đầy đủ thông tin
    const request = new sql.Request(transaction);
    request.input("user_id", sql.Int, userId);
    request.input("address", sql.NVarChar, address);
    request.input("payment_method", sql.NVarChar, payment_method);
    request.input("total_price", sql.Decimal(18, 2), total_price);
    request.input("restaurant_id", sql.Int, restaurantId);
    request.input("shipper_id", sql.Int, shipperId);
    request.input("status", sql.NVarChar, "pending"); // 👈 Trạng thái mặc định

    const orderResult = await request.query(`
      INSERT INTO orders (user_id, address, payment_method, total_price, restaurant_id, shipper_id, status)
      OUTPUT INSERTED.id
      VALUES (@user_id, @address, @payment_method, @total_price, @restaurant_id, @shipper_id, @status)
    `);

    const orderId = orderResult.recordset[0].id;

    // 🧾 B4: Thêm từng món vào order_items
    for (const item of items) {
      const itemRequest = new sql.Request(transaction);
      await itemRequest
        .input("order_id", sql.Int, orderId)
        .input("food_id", sql.Int, item.food_id)
        .input("quantity", sql.Int, item.quantity)
        .input("price", sql.Decimal(18, 2), item.price)
        .query(`
          INSERT INTO order_items (order_id, food_id, quantity, price)
          VALUES (@order_id, @food_id, @quantity, @price)
        `);
    }

    await transaction.commit();
    return orderId;
  } catch (err) {
    await transaction.rollback();
    throw err;
  }
};




exports.getOrderInfo = async (orderId) => {
  const request = await db.request();
  const result = await request
    .input("orderId", orderId)
    .query("SELECT * FROM orders WHERE id = @orderId");
  return result.recordset[0]; // trả về object
};

exports.getOrderItems = async (orderId) => {
  const request = await db.request();
  const result = await request
    .input("orderId", orderId)
    .query(`
      SELECT oi.*, f.name 
      FROM order_items oi
      JOIN foods f ON oi.food_id = f.id
      WHERE oi.order_id = @orderId
    `);
  return result.recordset;
};

exports.getOrdersByUser = async (userId) => {
  const request = await db.request();
  const result = await request
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
  const request = await db.request();
  const result = await request.query(`
    SELECT o.*, u.username
    FROM orders o
    JOIN users u ON o.user_id = u.id
  `);
  return result.recordset;
};

exports.getOrderById = async (orderId) => {
  const request = await db.request();
  const result = await request
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

exports.getPendingOrdersByUser = async (userId) => {
  const request = await db.request();
  const result = await request
    .input("userId", sql.Int, userId)
    .query(`
      SELECT o.*, u.full_name AS customer_name
      FROM orders o
      JOIN restaurants r ON o.restaurant_id = r.id
      JOIN users u ON o.user_id = u.id
      WHERE r.user_id = @userId AND o.status = 'pending'
    `);
  return result.recordset;
};

exports.getAssignedOrders = async (shipperId) => {
  const request = await db.request();
  const result = await request
    .input("shipper_id", sql.Int, shipperId)
    .query(`SELECT * FROM orders WHERE shipper_id = @shipper_id AND status IN ('approved', 'delivering')`);
  return result.recordset;
};

exports.getDeliveryHistory = async (shipperId) => {
  const request = await db.request();
  const result = await request
    .input("shipper_id", sql.Int, shipperId)
    .query(`SELECT * FROM orders WHERE shipper_id = @shipper_id AND status = 'delivered'`);
  return result.recordset;
};

exports.approveOrder = async (orderId) => {
  const request = await db.request();
  await request
    .input("id", sql.Int, orderId)
    .query(`UPDATE orders SET status = 'approved' WHERE id = @id`);
};


exports.updateOrderStatus = async (orderId, status) => {
  const request = await db.request();
  await request
    .input("id", sql.Int, orderId)
    .input("status", sql.VarChar, status)
    .query("UPDATE orders SET status = @status WHERE id = @id");
};
