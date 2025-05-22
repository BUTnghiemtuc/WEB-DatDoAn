const Order = require("../models/order.model");

exports.create = async (req, res) => {
  try {
    const { user_id, items } = req.body;
    const orderId = await Order.createOrder(user_id, items);
    res.json({ message: "Đặt hàng thành công", orderId });
  } catch (err) {
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

exports.updateStatus = async (req, res) => {
  try {
    await Order.updateOrderStatus(req.params.id, req.body.status);
    res.json({ message: "Cập nhật trạng thái thành công" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi cập nhật trạng thái", error: err });
  }
};
