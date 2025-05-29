import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./FoodDetailPage.css";
import { API_BASE_URL } from "../api/config";

function FoodDetailPage() {
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetch(`${API_BASE_URL}/foods/${id}`)
      .then(res => res.json())
      .then(data => setFood(data))
      .catch(err => console.error("Lỗi khi lấy món ăn:", err));

    fetch(`${API_BASE_URL}/reviews/${id}`)
      .then(res => res.json())
      .then(data => setReviews(data))
      .catch(err => console.error("Lỗi khi lấy đánh giá:", err));
  }, [id]);

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

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    const newReview = {
      user_id: 2, // TODO: lấy user_id từ session/auth
      food_id: parseInt(id),
      rating: parseInt(rating),
      comment,
    };

    const res = await fetch(`${API_BASE_URL}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newReview),
    });

    if (res.ok) {
      alert("🎉 Đã gửi đánh giá!");
      setComment("");
      setRating(5);
      const updated = await fetch(`${API_BASE_URL}/reviews/${id}`).then(r => r.json());
      setReviews(updated);
    } else {
      alert("❌ Gửi đánh giá thất bại!");
    }
  };

  if (!food) return <p style={{ padding: "2rem" }}>⏳ Đang tải món ăn...</p>;

  return (
    <div className="food-detail-container">
      <img src={`/${food.image_url}`} alt={food.name} className="food-image" />

      <div className="food-info">
        <h2>{food.name}</h2>
        <p>{food.description}</p>
        <p><strong>Loại:</strong> {food.category || "—"}</p>
        <p><strong>Giá:</strong> {food.price.toLocaleString()} đ</p>
        <p><strong>Nhà hàng:</strong> {food.restaurant_name || "Không rõ"}</p>
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          Thêm vào giỏ hàng
        </button>
      </div>

      <div className="review-section">
        <h3>Đánh giá người dùng</h3>
        {reviews.length === 0 ? (
          <p>Chưa có đánh giá nào.</p>
        ) : (
          <ul>
            {reviews.map((r) => (
              <li key={r.id}>
                <strong>{r.full_name}</strong> – ⭐ {r.rating}/5 <br />
                <i>{r.comment}</i>
              </li>
            ))}
          </ul>
        )}

        <form onSubmit={handleSubmitReview} className="review-form">
          <h4>Gửi đánh giá của bạn:</h4>
          <label>
            Số sao:
            <select value={rating} onChange={(e) => setRating(e.target.value)}>
              {[5, 4, 3, 2, 1].map((v) => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
          </label>
          <br />
          <label>
            Bình luận:
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </label>
          <br />
          <button type="submit">Gửi đánh giá</button>
        </form>
      </div>
    </div>
  );
}

export default FoodDetailPage;
