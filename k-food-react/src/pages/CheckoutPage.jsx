import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../api/config";
import "./CheckoutPage.css";

function CheckoutPage() {
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(stored);
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userRaw = localStorage.getItem("user");
    if (!userRaw) return alert("⚠ Bạn chưa đăng nhập!");

    let user;
    try {
      user = JSON.parse(userRaw);
      console.log("🧪 Dữ liệu user parse ra:", user);
      if (typeof user !== "object" || user === null || typeof user.id !== "number") {
        console.warn("⚠ Dữ liệu user không hợp lệ:", user);
        localStorage.removeItem("user");
        return alert("⚠ Dữ liệu người dùng không hợp lệ! Đã đăng xuất.");
      }
    } catch (err) {
      console.warn("🔥 JSON parse lỗi:", err);
      localStorage.removeItem("user");
      return alert("⚠ Dữ liệu người dùng không hợp lệ! Đã đăng xuất.");
    }

    console.log("👤 Dữ liệu user trước khi gửi đơn:", user);

    if (!address.trim()) return alert("⚠ Vui lòng nhập địa chỉ giao hàng!");
    if (cart.length === 0) return alert("⚠ Giỏ hàng đang trống!");

    const payload = {
      user_id: user.id,
      address,
      payment_method: paymentMethod,
      total_price: total,
      items: cart.map((item) => ({
        food_id: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    try {
      const res = await fetch(`${API_BASE_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("📦 Phản hồi từ server:", data);

      if (res.ok) {
        alert("✅ Đặt hàng thành công!");
        localStorage.removeItem("cart");
        navigate("/orders");
      } else {
        alert("❌ Thất bại: " + (data.message || data.error));
      }
    } catch (err) {
      console.error("🔥 Lỗi gửi đơn:", err);
      alert("⚠ Có lỗi khi gửi đơn hàng!");
    }
  };

  return (
    <div className="checkout-container">
      <h2>Xác nhận đơn hàng</h2>

      <form onSubmit={handleSubmit}>
        <div className="checkout-section">
          <h3>Địa chỉ giao hàng</h3>
          <textarea
            rows={2}
            required
            placeholder="Nhập địa chỉ cụ thể..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="checkout-section">
          <h3>Phương thức thanh toán</h3>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="cash">Tiền mặt</option>
            <option value="bank">Chuyển khoản</option>
            <option value="momo">Ví MoMo</option>
          </select>
        </div>

        <div className="checkout-section">
          <h3>Món đã chọn</h3>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                {item.name} × {item.quantity} —{" "}
                {(item.price * item.quantity).toLocaleString()} đ
              </li>
            ))}
            <li className="fw-bold mt-2">
              Tổng cộng:{" "}
              <span className="text-danger">{total.toLocaleString()} đ</span>
            </li>
          </ul>
        </div>

        <button type="submit" className="submit-order-btn">
          ✅ Xác nhận đặt hàng
        </button>
      </form>
    </div>
  );
}

export default CheckoutPage;
