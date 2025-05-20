// src/pages/CartPage.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // ✅ THÊM thiếu
import "./CartPage.css";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  const handleQuantityChange = (index, newQty) => {
    const updated = [...cartItems];
    updated[index].quantity = newQty;
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const handleRemove = (index) => {
    const updated = cartItems.filter((_, i) => i !== index);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h2>Giỏ hàng</h2>

      {cartItems.length === 0 ? (
        <p>Giỏ hàng của bạn đang trống.</p>
      ) : (
        <>
          <div className="cart-list">
            {cartItems.map((item, index) => (
              <div key={index} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="info">
                  <h3>{item.name}</h3>
                  <p>{item.price.toLocaleString()} đ</p>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(index, parseInt(e.target.value))
                    }
                  />
                  <button onClick={() => handleRemove(index)}>Xóa</button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-total">
            <strong>Tổng cộng:</strong> {total.toLocaleString()} đ
            <br />
            <Link to="/checkout">
              <button className="submit-order-btn">Tiến hành thanh toán</button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
