const Order = require("../models/order.model");

exports.create = async (req, res) => {
  try {
    const { user_id, items, address, payment_method, total_price } = req.body;
    if (!user_id || !items || !address || !payment_method || !total_price) {
      return res.status(400).json({ message: "Thiếu thông tin đơn hàng" });
    }
    const orderId = await Order.createOrder(user_id, items, address, payment_method, total_price);
    res.json({ message: "Đặt hàng thành công", orderId });
  } catch (err) {
    res.status(500).json({ message: "Lỗi tạo đơn hàng", error: err });console.error("🔥 Lỗi chi tiết:", err);
    res.status(500).json({ message: "Lỗi tạo đơn hàng", error: err });
  }
};

exports.getByUser = async (req, res) => {
  try {
    const orders = await Order.getOrdersByUser(req.params.id);
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Lỗi lấy đơn", error: err });
  }
};

exports.getAll = async (req, res) => {
  try {
    const orders = await Order.getAllOrders();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Lỗi lấy tất cả đơn", error: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const order = await Order.getOrderById(req.params.id);
    if (order.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Lỗi lấy chi tiết đơn", error: err });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    await Order.updateOrderStatus(req.params.id, req.body.status);
    res.json({ message: "Cập nhật trạng thái thành công" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi cập nhật trạng thái", error: err });
  }
};
