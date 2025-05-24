import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../api/config";

export default function ShipperHistoryPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchDeliveredOrders();
  }, []);

  const fetchDeliveredOrders = async () => {
    try {
      const username = localStorage.getItem("user");
      const res = await fetch(`${API_BASE_URL}/orders/shipper/${username}`);
      const data = await res.json();
      const delivered = data.filter(order => order.status === "delivered");
      setOrders(delivered);
    } catch (err) {
      console.error("Lỗi tải lịch sử đơn hàng:", err);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>🕓 Lịch sử đơn hàng đã giao</h1>
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Khách hàng</th>
            <th>Tổng tiền</th>
            <th>Thời gian giao</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer_name || order.user_id}</td>
              <td>{order.total?.toLocaleString()} đ</td>
              <td>{new Date(order.updated_at || order.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
