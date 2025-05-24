import React from "react";
import { useNavigate } from "react-router-dom";

export default function ShipperHomePage() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Trang dành cho Shipper</h1>
      <p>Chào mừng bạn đến với hệ thống giao hàng K-FOOD.</p>

      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        marginTop: "2rem",
        maxWidth: "400px"
      }}>
        <button onClick={() => navigate("/shipper/assigned-orders")}>📋 Đơn hàng được phân công</button>
        <button onClick={() => navigate("/shipper/update-status")}>🚚 Cập nhật trạng thái giao</button>
        <button onClick={() => navigate("/shipper/history")}>🕓 Lịch sử giao hàng</button>
      </div>
    </div>
  );
}
