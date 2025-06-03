const Order = require("../models/order.model");

exports.create = async (req, res) => {
  try {
    const { user_id, items, address, payment_method, total_price } = req.body;

    if (!user_id || !items?.length || !address || !payment_method || !total_price) {
      return res.status(400).json({ message: "Thiếu thông tin đơn hàng" });
    }

    // Gọi model xử lý đầy đủ: restaurant_id, shipper_id, status
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

    const order = await Order.getOrderInfo(orderId);
    const items = await Order.getOrderItems(orderId);

    if (!order) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
    }

    res.json({ order, items });
  } catch (err) {
    console.error("🔥 Lỗi khi tải chi tiết đơn:", err);
    res.status(500).json({ message: "Lỗi chi tiết đơn", error: err.message });
  }
};

exports.getPendingByUserId = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const orders = await Order.getPendingOrdersByUser(userId);
    res.json(orders);
  } catch (err) {
    console.error("❌ Lỗi getPendingByUserId:", err);
    res.status(500).json({ message: "Lỗi server khi lấy đơn chờ xử lý" });
  }
};

exports.getAssignedOrders = async (req, res) => {
  try {
    const orders = await Order.getAssignedOrders(parseInt(req.params.shipperId));
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Lỗi lấy đơn giao", error: err.message });
  }
};

exports.getDeliveryHistory = async (req, res) => {
  try {
    const orders = await Order.getDeliveryHistory(parseInt(req.params.shipperId));
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Lỗi lấy lịch sử giao", error: err.message });
  }
};

exports.approveOrder = async (req, res) => {
  try {
    const orderId = parseInt(req.params.id);
    await Order.approveOrder(orderId);
    res.json({ message: "✅ Đơn hàng đã được duyệt" });
  } catch (err) {
    console.error("❌ Lỗi approveOrder:", err);
    res.status(500).json({ message: "Lỗi xử lý đơn hàng" });
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
