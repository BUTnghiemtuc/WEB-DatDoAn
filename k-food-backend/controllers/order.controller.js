const Order = require("../models/order.model");

exports.create = async (req, res) => {
  try {
    const { user_id, items, address, payment_method, total_price } = req.body;

    if (!user_id || !items?.length || !address || !payment_method || !total_price) {
      return res.status(400).json({ message: "Thiếu thông tin đơn hàng" });
    }

    const orderId = await Order.createOrder(user_id, items, address, payment_method, total_price);
    res.json({ message: "Đặt hàng thành công", orderId });
  } catch (err) {
    console.error("🔥 Lỗi tạo đơn hàng:", err);
    res.status(500).json({ message: "Lỗi tạo đơn hàng", error: err.message });
  }
};

exports.getByUser = async (req, res) => {
  try {
    const orders = await Order.getOrdersByUser(req.params.id);
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Lỗi lấy đơn người dùng", error: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const orders = await Order.getAllOrders();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Lỗi lấy tất cả đơn", error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const orderId = req.params.id;

    const order = await Order.getOrderInfo(orderId); // Lấy thông tin đơn
    const items = await Order.getOrderItems(orderId); // Lấy món ăn trong đơn

    if (!order) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
    }

    res.json({ order, items }); // ✅ Trả về đúng format frontend cần
  } catch (err) {
    console.error("🔥 Lỗi khi tải chi tiết đơn:", err);
    res.status(500).json({ message: "Lỗi chi tiết đơn", error: err.message });
  }
};


exports.updateStatus = async (req, res) => {
  try {
    await Order.updateOrderStatus(req.params.id, req.body.status);
    res.json({ message: "Cập nhật trạng thái thành công" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi cập nhật trạng thái", error: err.message });
  }
};
