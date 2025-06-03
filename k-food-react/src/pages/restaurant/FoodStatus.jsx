import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../api/config";
import "./FoodStatus.css";


function FoodStatus() {
  const [foods, setFoods] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/foods/by-user/${user.id}`);
        const data = await res.json();
        if (!Array.isArray(data)) throw new Error("Dữ liệu không hợp lệ");
        setFoods(data.map(f => ({ ...f, available: !!f.available })));
      } catch (err) {
        console.error("❌ Lỗi khi tải danh sách món:", err);
        setFoods([]);
      }
    };
    if (user?.id) fetchFoods();
  }, [user]);

  const toggleAvailability = async (foodId, currentStatus) => {
    try {
      const res = await fetch(`${API_BASE_URL}/foods/${foodId}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ available: !currentStatus })
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message || "✅ Cập nhật thành công");
        setFoods(foods.map(f => f.id === foodId ? { ...f, available: !currentStatus } : f));
      } else {
        alert(data.message || "❌ Lỗi cập nhật");
      }
    } catch (err) {
      console.error("❌ Lỗi gửi yêu cầu:", err);
      alert("❌ Lỗi cập nhật");
    }
  };

  return (
    <div className="food-status-container">
        <h3>🍽️ Tình trạng món ăn</h3>
        <ul className="food-status-list">
        {foods.map(food => (
            <li key={food.id} className="food-status-item">
            <div className="food-info">
                <strong>{food.name}</strong> –
                {food.available ? (
                <span className="available">✅ Còn món</span>
                ) : (
                <span className="unavailable">❌ Hết món</span>
                )}
            </div>
            <button
                className={`toggle-button ${food.available ? 'available' : 'unavailable'}`}
                onClick={() => toggleAvailability(food.id, food.available)}
            >
                {food.available ? "Đánh dấu hết" : "Đánh dấu còn"}
            </button>
            </li>
        ))}
        </ul>
    </div>
    );

}

export default FoodStatus;
