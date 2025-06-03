import React from "react";
import { useNavigate } from "react-router-dom";
import "./RestaurantHomePage.css";

export default function RestaurantHomePage() {
  const navigate = useNavigate();

  return (
    <div className="restaurant-home-container">
      <h1>Trang dành cho Nhà hàng</h1>
      <p>Chào mừng bạn đến với bảng điều khiển của nhà hàng.</p>

      <div className="restaurant-home-buttons">
        <button onClick={() => navigate("/restaurant/orders")}>📦 Đơn hàng cần xử lý</button>
        <button onClick={() => navigate("/restaurant/foods")}>🍽️ Quản lý món ăn</button>
        <button onClick={() => navigate("/restaurant/availability")}>📋 Tình trạng món ăn</button>
      </div>
    </div>
  );
}