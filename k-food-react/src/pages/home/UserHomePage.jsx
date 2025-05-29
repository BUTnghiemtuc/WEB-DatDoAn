import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../api/config";

export default function UserHomePage() {
  const [foods, setFoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
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
    const exists = cart.find((item) => item.id === food.id);
    if (exists) {
      exists.quantity += 1;
    } else {
      cart.push({ ...food, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("✅ Đã thêm vào giỏ hàng!");
  };

  const filteredFoods = foods.filter(food =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Chào mừng bạn đến với <span style={{ color: "#28a745" }}>K-FOOD!</span></h1>

      <input
        type="text"
        placeholder="Tìm món ăn..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
          marginBottom: "20px",
          borderRadius: "5px",
          border: "1px solid #ccc"
        }}
      />

      <h3>Món ăn nổi bật:</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {filteredFoods.map((food) => (
          <div
            key={food.id}
            onClick={() => navigate(`/foods/${food.id}`)}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "1rem",
              width: "220px",
              textAlign: "center",
              backgroundColor: "#fdfdfd",
              cursor: "pointer"
            }}
          >
            <img
              src={`/${food.image_url}`}
              alt={food.name}
              style={{
                width: "100%",
                height: "140px",
                objectFit: "cover",
                borderRadius: "6px"
              }}
            />
            <h5 style={{ margin: "10px 0 5px" }}>{food.name}</h5>
            <p style={{ fontWeight: "bold", color: "#28a745" }}>
              {food.price.toLocaleString()}đ
            </p>
            {food.restaurant_name && (
              <p style={{ fontSize: "14px", color: "#777" }}>
                <i>Nhà hàng: {food.restaurant_name}</i>
              </p>
            )}
            <button
              className="btn btn-outline-primary"
              style={{ marginTop: "10px" }}
              onClick={(e) => {
                e.stopPropagation(); // tránh click cả card
                addToCart(food);
              }}
            >
              Thêm vào giỏ
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
