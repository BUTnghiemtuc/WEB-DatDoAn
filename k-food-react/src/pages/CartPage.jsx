import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CartPage.css"; // ✅ Đảm bảo import đúng file

function CartPage() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(stored);
  }, []);

  const updateQuantity = (id, amount) => {
    const updated = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + amount) }
        : item
    );
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const removeItem = (id) => {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="cart-container">
      <h2>🛒 Giỏ hàng của bạn</h2>

      <div className="cart-list">
        {cart.length === 0 ? (
          <p>Giỏ hàng đang trống.</p>
        ) : (
          cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={`/${item.image_url}`} alt={item.name} />
              <div className="info">
                <h5>{item.name}</h5>
                <p className="text-success fw-bold">{item.price.toLocaleString()} đ</p>
                <div>
                  <button
                    className="btn btn-sm btn-outline-secondary me-1"
                    onClick={() => updateQuantity(item.id, -1)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="btn btn-sm btn-outline-secondary ms-1"
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div>
                <p className="fw-bold">{(item.price * item.quantity).toLocaleString()} đ</p>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => removeItem(item.id)}
                >
                  Xóa
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {cart.length > 0 && (
        <>
          <div className="cart-total">
            Tổng cộng: <span className="text-danger">{total.toLocaleString()} đ</span>
          </div>
          <button className="submit-order-btn" onClick={handleCheckout}>
            ➕ Thanh toán
          </button>
        </>
      )}
    </div>
  );
}

export default CartPage;
