import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../api/config";
import "./RestaurantFoodManager.css";

function RestaurantFoodManager() {
  const [foods, setFoods] = useState([]);
  const [restaurantId, setRestaurantId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image_url: ""
  });
  const [editingId, setEditingId] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  // Lấy restaurant_id từ user.id
  useEffect(() => {
    const fetchRestaurantId = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/restaurants/user/${user.id}`);
        const data = await res.json();
        if (!data?.id) throw new Error("Không tìm thấy nhà hàng");
        setRestaurantId(data.id);
      } catch (err) {
        console.error("❌ Lỗi lấy restaurant_id:", err);
      }
    };

    if (user?.id) fetchRestaurantId();
  }, [user]);

  // Lấy danh sách món ăn
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/foods/by-user/${user.id}`);
        const data = await res.json();
        if (!Array.isArray(data)) throw new Error("Dữ liệu không hợp lệ");
        setFoods(data);
      } catch (err) {
        console.error("🔥 Lỗi khi tải danh sách món:", err);
        setFoods([]);
      }
    };

    if (restaurantId) fetchFoods();
  }, [restaurantId]);

  // Cập nhật form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Thêm hoặc cập nhật món ăn
  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `${API_BASE_URL}/foods/${editingId}`
      : `${API_BASE_URL}/foods`;

    const payload = {
      ...form,
      price: Number(form.price),
      restaurant_id: restaurantId
    };

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (res.ok) {
        alert(data.message || "✅ Thành công!");
        setForm({ name: "", price: "", description: "", image_url: "" });
        setEditingId(null);
        // Reload danh sách
        const refreshed = await fetch(`${API_BASE_URL}/foods/by-user/${user.id}`);
        const refreshedData = await refreshed.json();
        setFoods(refreshedData);
      } else {
        alert(data.message || "❌ Thao tác thất bại!");
      }
    } catch (err) {
      console.error("🔥 Lỗi khi gửi dữ liệu:", err);
      alert("❌ Đã có lỗi xảy ra!");
    }
  };

  // Sửa món ăn
  const handleEdit = (food) => {
    setForm({
      name: food.name,
      price: food.price,
      image_url: food.image_url || "",
      description: food.description || ""
    });
    setEditingId(food.id);
  };

  // Xoá món ăn
  const handleDelete = async (id) => {
    if (!window.confirm("❗ Xác nhận xoá món ăn?")) return;
    try {
      const res = await fetch(`${API_BASE_URL}/foods/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok) {
        alert(data.message || "✅ Đã xoá");
        setFoods(foods.filter(f => f.id !== id));
      } else {
        alert(data.message || "❌ Không xoá được");
      }
    } catch (err) {
      console.error("🔥 Lỗi xoá:", err);
      alert("❌ Đã có lỗi khi xoá!");
    }
  };

  return (
    <div className="food-manager-container">
      <h3>📋 Quản lý món ăn</h3>

      <form onSubmit={handleSubmit} className="food-form">
        <input name="name" placeholder="Tên món" value={form.name} onChange={handleChange} required />
        <input name="price" type="number" placeholder="Giá" value={form.price} onChange={handleChange} required />
        <input name="image_url" placeholder="Ảnh (URL)" value={form.image_url} onChange={handleChange} />
        <textarea name="description" placeholder="Mô tả" value={form.description} onChange={handleChange} />
        <button type="submit">{editingId ? "Cập nhật" : "➕ Thêm món"}</button>
      </form>

      {Array.isArray(foods) && foods.length > 0 ? (
        <ul className="food-list">
          {foods.map(food => (
            <li key={food.id} className="food-item">
              <div className="food-details">
                <strong>{food.name}</strong> – {food.price.toLocaleString()}đ
                <small>{food.description}</small>
              </div>
              <div className="food-actions">
                <button className="edit-btn" onClick={() => handleEdit(food)}>✏️ Sửa</button>
                <button className="delete-btn" onClick={() => handleDelete(food.id)}>🗑️ Xoá</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>📝 Chưa có món ăn nào</p>
      )}
    </div>
  );

}

export default RestaurantFoodManager;
