
// src/pages/OrderHistoryPage.jsx
import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../api/config";
import { Link } from "react-router-dom";

function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.id) return;

    fetch(`${API_BASE_URL}/orders/user/${user.id}`)
      .then(res => res.json())
      .then(setOrders)
      .catch(err => console.error("Lỗi load đơn hàng:", err));
  }, []);

  return (
    <div className="order-history-container">
      <h2>Lịch sử đơn hàng</h2>
      {orders.length === 0 ? <p>Chưa có đơn nào</p> : (
        <ul>
          {orders.map((order, idx) => (
            <li key={idx}>
              Mã đơn: {order.id} - Trạng thái: {order.status || "chờ xử lý"} - 
              <Link to={`/orders/${order.id}`}>Xem chi tiết</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default OrderHistoryPage;