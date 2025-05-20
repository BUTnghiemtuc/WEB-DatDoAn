import React, { useEffect, useState } from "react";
import "./OrderHistoryPage.css";

function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("orders");
    if (stored) {
      setOrders(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="order-history-container">
      <h2>Lịch sử đơn hàng</h2>
      {orders.length === 0 ? (
        <p>Chưa có đơn hàng nào.</p>
      ) : (
        orders
          .slice()
          .reverse()
          .map((order) => (
            <div key={order.id} className="order-card">
              <p><strong>Mã đơn:</strong> {order.id}</p>
              <p><strong>Trạng thái:</strong> {order.status}</p>
              <p><strong>Thời gian đặt:</strong> {new Date(order.createdAt).toLocaleString()}</p>
              <p><strong>Địa chỉ giao hàng:</strong> {order.address}</p>
              <p><strong>Phương thức thanh toán:</strong> {order.paymentMethod}</p>
              <p><strong>Tổng tiền:</strong> {order.total.toLocaleString()} đ</p>
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

export default OrderHistoryPage;
