import React from "react";
import { useNavigate } from "react-router-dom";
import "./ShipperHomePage.css"; // ✅ import CSS

export default function ShipperHomePage() {
  const navigate = useNavigate();

  return (
    <div className="shipper-home-container">
      <h1>🚚 Trang dành cho Shipper</h1>
      <p>Chào mừng bạn đến với hệ thống giao hàng K-FOOD.</p>

    <div className="shipper-home-buttons">
      <button onClick={() => navigate("/shipper/assigned-orders")}>
        📋 Đơn hàng được phân công
      </button>
      <button onClick={() => navigate("/shipper/update-status")}>
        🚚 Cập nhật trạng thái giao
      </button>
    </div>

    </div>
  );
}
