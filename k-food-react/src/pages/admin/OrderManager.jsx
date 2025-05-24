import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../api/config";

export default function OrderManager() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/orders`);
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error("Lỗi tải đơn hàng:", err);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Quản lý đơn hàng</h1>
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Người đặt</th>
            <th>Trạng thái</th>
            <th>Tổng tiền</th>
            <th>Ngày tạo</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
