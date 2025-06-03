import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../api/config";
import "./PendingOrders.css";


function PendingOrders() {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/orders/pending/${user.id}`);
        const data = await res.json();
        if (!Array.isArray(data)) throw new Error("Dữ liệu không hợp lệ");
        setOrders(data);
      } catch (err) {
        console.error("❌ Lỗi lấy đơn hàng:", err);
        setOrders([]);
      }
    };

    if (user?.id) fetchOrders();
  }, [user]);

  const handleApprove = async (orderId) => {
    try {
      const res = await fetch(`${API_BASE_URL}/orders/${orderId}/approve`, {
        method: "PUT"
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message || "✅ Đơn đã xử lý");
        setOrders(orders.filter(o => o.id !== orderId));
      } else {
        alert(data.message || "❌ Không thể xử lý đơn");
      }
    } catch (err) {
      console.error("❌ Lỗi xử lý đơn:", err);
      alert("❌ Lỗi xử lý đơn");
    }
  };

  return (
    <div className="pending-orders-container">
        <h3>📦 Đơn hàng cần xử lý</h3>
        {orders.length > 0 ? (
        <ul className="order-list">
            {orders.map(order => (
            <li key={order.id} className="order-item">
                <div className="order-info">
                <div><strong>Khách:</strong> {order.customer_name || "Không rõ"}</div>
                <div><strong>Tổng:</strong> {order.total_price?.toLocaleString?.() || "Không rõ"}đ</div>
                </div>
                <button className="approve-button" onClick={() => handleApprove(order.id)}>
                ✅ Duyệt đơn
                </button>
            </li>
            ))}
        </ul>
        ) : (
        <p className="no-orders">🕐 Không có đơn nào chờ xử lý.</p>
        )}
    </div>
    );

}

export default PendingOrders;
