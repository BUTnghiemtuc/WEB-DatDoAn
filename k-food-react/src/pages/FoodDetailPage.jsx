// src/pages/FoodDetailPage.jsx
import React from "react";
import { useParams } from "react-router-dom";
import "./FoodDetailPage.css";
import mcdonald from "../assets/mcdonald.png";

function FoodDetailPage() {
  const { id } = useParams();

  // Món ăn mẫu, có thể mở rộng bằng cách fetch API theo id
  const food = {
    id: "1",
    name: "McDonald's",
    image: mcdonald,
    category: "Fastfood",
    price: 55000,
    description:
      "Combo burger bò nướng thơm ngon với khoai tây chiên và nước ngọt.",
    rating: 4.3,
    time: "25 phút",
    distance: "2.2 km",
  };

  const handleAddToCart = () => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = storedCart.find((item) => item.id === food.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      storedCart.push({ ...food, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(storedCart));
    alert("✅ Đã thêm vào giỏ hàng!");
  };

  return (
    <div className="food-detail-container">
      <img src={food.image} alt={food.name} className="food-image" />
      <h2>{food.name}</h2>
      <p className="food-desc">{food.description}</p>
      <p>
        <strong>Loại:</strong> {food.category}
      </p>
      <p>
        <strong>Giá:</strong> {food.price.toLocaleString()} đ
      </p>
      <p>
        <strong>Đánh giá:</strong> ⭐ {food.rating} / 5
      </p>
      <p>
        <strong>Thời gian giao:</strong> {food.time} - {food.distance}
      </p>
      <button className="add-to-cart-btn" onClick={handleAddToCart}>
        Thêm vào giỏ hàng
      </button>
    </div>
  );
}

export default FoodDetailPage;
