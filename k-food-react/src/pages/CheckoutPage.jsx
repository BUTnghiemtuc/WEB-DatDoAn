// src/pages/CheckoutPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CheckoutPage.css";

function CheckoutPage() {
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setCart(JSON.parse(stored));
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = () => {
    if (!address.trim()) {
      alert("Vui lòng nhập địa chỉ giao hàng.");
      return;
    }

    // Lưu đơn hàng vào localStorage (hoặc gọi API thực tế sau này)
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    const newOrder = {
      id: Date.now(),
      items: cart,
      total,
      address,
      paymentMethod,
      status: "Đang xử lý",
      createdAt: new Date().toISOString(),
    };
    orders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(orders));

    // Xóa giỏ hàng
    localStorage.removeItem("cart");
    alert("🎉 Đặt hàng thành công!");

    navigate("/"); // Chuyển về trang chủ
  };

  return (
    <div className="checkout-container">
      <h2>Thanh toán</h2>

      <div className="checkout-section">
        <h3>Thông tin giao hàng</h3>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Nhập địa chỉ chi tiết..."
        />
      </div>

      <div className="checkout-section">
        <h3>Phương thức thanh toán</h3>
        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
          <option value="COD">Thanh toán khi nhận hàng (COD)</option>
          <option value="Momo">Ví điện tử Momo</option>
          <option value="Bank">Thẻ ngân hàng</option>
        </select>
      </div>

      <div className="checkout-section">
        <h3>Tóm tắt đơn hàng</h3>
        <ul>
          {cart.map((item, i) => (
            <li key={i}>
              {item.name} x {item.quantity} → {(item.price * item.quantity).toLocaleString()} đ
            </li>
          ))}
        </ul>
        <p><strong>Tổng tiền: {total.toLocaleString()} đ</strong></p>
      </div>

      <button className="submit-order-btn" onClick={handleSubmit}>
        Xác nhận đặt hàng
      </button>
    </div>
  );
}

export default CheckoutPage;
