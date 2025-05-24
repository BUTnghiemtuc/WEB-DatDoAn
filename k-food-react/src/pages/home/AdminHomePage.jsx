import React from "react";
import { useNavigate } from "react-router-dom";

export default function AdminHomePage() {
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
      <div style={{ textAlign: "center", width: "100%", maxWidth: "600px" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>Trang Quản Trị Admin</h1>
        <p>Chào mừng bạn đến với bảng điều khiển hệ thống.</p>

        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          marginTop: "2rem"
        }}>
          <button onClick={() => navigate("/admin/users")}>👥 Quản lý người dùng</button>
          <button onClick={() => navigate("/admin/foods")}>🍽️ Quản lý món ăn</button>
          <button onClick={() => navigate("/admin/orders")}>📦 Quản lý đơn hàng</button>
          <button onClick={() => navigate("/admin/stats")}>📊 Thống kê doanh thu</button>
        </div>
      </div>
    </div>
  );
}
