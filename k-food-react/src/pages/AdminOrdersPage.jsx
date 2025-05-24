import React, { useEffect, useState } from "react";
import "./AdminOrdersPage.css";

function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = localStorage.getItem("orders");
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
  }, []);

  const updateStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  return (
    <div className="admin-orders-container">
      <h2>Quản lý đơn hàng</h2>
      {orders.length === 0 ? (
        <p>Không có đơn hàng nào.</p>
      ) : (
        orders
          .slice()
          .reverse()
          .map((order) => (
            <div key={order.id} className="admin-order-card">
              <p><strong>Mã đơn:</strong> {order.id}</p>
              <p><strong>Thời gian:</strong> {new Date(order.createdAt).toLocaleString()}</p>
              <p><strong>Địa chỉ giao:</strong> {order.address}</p>
              <p><strong>Phương thức thanh toán:</strong> {order.paymentMethod}</p>
              <p><strong>Tổng tiền:</strong> {order.total.toLocaleString()} đ</p>
              <p><strong>Trạng thái hiện tại:</strong> {order.status}</p>
              <label>
                Cập nhật trạng thái:
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order.id, e.target.value)}
                >
                  <option>Đang xử lý</option>
                  <option>Đang giao</option>
                  <option>Hoàn tất</option>
                  <option>Đã hủy</option>
                </select>
              </label>
              <ul>
                {order.items.map((item, i) => (
                  <li key={i}>
                    {item.name} x {item.quantity} → {(item.price * item.quantity).toLocaleString()} đ
                  </li>
                ))}
              </ul>
            </div>
          ))
      )}
    </div>
  );
}

export default AdminOrdersPage;
