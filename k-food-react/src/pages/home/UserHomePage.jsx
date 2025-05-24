import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../api/config";

export default function UserHomePage() {
  const [foods, setFoods] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/foods`);
        if (!res.ok) throw new Error("Lỗi khi tải danh sách món ăn");
        const data = await res.json();
        setFoods(data);
      } catch (err) {
        console.error("Lỗi:", err);
      }
    };
    fetchFoods();
  }, []);

  const addToCart = (food) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const exists = cart.find(item => item.id === food.id);
    if (exists) {
      exists.quantity += 1;
    } else {
      cart.push({ ...food, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Đã thêm vào giỏ hàng!");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Chào mừng bạn đến với K-FOOD!</h1>
      <h3>Món ăn nổi bật:</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {foods.map((food) => (
          <div key={food.id} style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "1rem",
            width: "220px",
            textAlign: "center"
          }}>
            <img
              src={food.image_url}
              alt={food.name}
              style={{
                width: "100%",
                height: "150px",
                objectFit: "cover",
                borderRadius: "6px"
              }}
            />
            <h4>{food.name}</h4>
            <p>{food.description}</p>
            <p><strong>{food.price.toLocaleString()} đ</strong></p>
            <button onClick={() => addToCart(food)}>Thêm vào giỏ</button>
          </div>
        ))}
      </div>
      <div style={{ marginTop: "2rem" }}>
        <button onClick={() => navigate("/cart")}>🛒 Xem giỏ hàng</button>
        <button onClick={() => navigate("/orders")} style={{ marginLeft: "1rem" }}>
          📦 Xem đơn hàng
        </button>
      </div>
    </div>
  );
}
