import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../api/config";

export default function StatsPage() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    orders: [],
    topFoods: []
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/stats`);
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error("Lỗi khi tải thống kê:", err);
    }
  };

  const countByStatus = (status) => {
    return stats.orders.filter(order => order.status === status).length;
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>📊 Thống kê hệ thống</h1>

      <div style={{ marginBottom: "2rem" }}>
        <h3>🧾 Tổng doanh thu: <span style={{ color: "green" }}>{stats.totalRevenue.toLocaleString()} đ</span></h3>
        <p>📦 Đơn đã giao: <strong>{countByStatus("delivered")}</strong></p>
        <p>❌ Đơn bị hủy: <strong>{countByStatus("cancelled")}</strong></p>
        <p>⏳ Đang xử lý: <strong>{countByStatus("pending")}</strong></p>
      </div>

      <div>
        <h3>🍽️ Món ăn bán chạy nhất:</h3>
        <table border="1" cellPadding="8" cellSpacing="0">
          <thead>
            <tr>
              <th>Tên món</th>
              <th>Số lượng đã bán</th>
            </tr>
          </thead>
          <tbody>
            {stats.topFoods.map((food, index) => (
              <tr key={index}>
                <td>{food.name}</td>
                <td>{food.sold_quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
