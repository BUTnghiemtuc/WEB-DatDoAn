import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../api/config";

export default function ShipperOrderManager() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const username = localStorage.getItem("user");
      const res = await fetch(`${API_BASE_URL}/orders/shipper/${username}`);
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error("Lỗi tải đơn hàng shipper:", err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await fetch(`${API_BASE_URL}/orders/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      fetchOrders();
    } catch (err) {
      alert("Lỗi khi cập nhật trạng thái");
    }
  };

  const nextStatus = (current) => {
    if (current === "assigned") return "delivering";
    if (current === "delivering") return "delivered";
    return null;
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>📦 Đơn hàng của bạn</h1>
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Khách hàng</th>
            <th>Trạng thái</th>
            <th>Tổng tiền</th>
            <th>Thời gian</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer_name || order.user_id}</td>
              <td>{order.status}</td>
              <td>{order.total?.toLocaleString()} đ</td>
              <td>{new Date(order.created_at).toLocaleString()}</td>
              <td>
                {nextStatus(order.status) ? (
                  <button onClick={() => updateStatus(order.id, nextStatus(order.status))}>
                    Cập nhật: {nextStatus(order.status)}
                  </button>
                ) : "✅ Đã giao"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
