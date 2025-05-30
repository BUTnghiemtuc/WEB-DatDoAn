import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../api/config";

function RestaurantFoodManager() {
  const [foods, setFoods] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", description: "", image_url: "" });
  const [editingId, setEditingId] = useState(null);

  const restaurant = JSON.parse(localStorage.getItem("user"));
  const restaurantId = restaurant?.id;

  const fetchFoods = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/foods/restaurant/${restaurantId}`);
      const data = await res.json();
      if (!Array.isArray(data)) throw new Error("Dữ liệu không hợp lệ");
      setFoods(data);
    } catch (err) {
      console.error("🔥 Lỗi khi tải danh sách món:", err);
      setFoods([]);
    }
  };

  useEffect(() => {
    if (restaurantId) fetchFoods();
  }, [restaurantId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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
    
    console.log("📦 Payload gửi lên:", payload);

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
        fetchFoods(); // cập nhật lại danh sách
      } else {
        alert(data.message || "❌ Thao tác thất bại!");
      }
    } catch (err) {
      console.error("🔥 Lỗi khi gửi dữ liệu:", err);
      alert("❌ Đã có lỗi xảy ra!");
    }
  };

  const handleEdit = (food) => {
    setForm({
      name: food.name,
      price: food.price,
      image_url: food.image_url || "",
      description: food.description || ""
    });
    setEditingId(food.id);
  };

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
    <div className="container mt-4">
      <h3>📋 Quản lý món ăn</h3>

      <form onSubmit={handleSubmit} className="mb-4">
        <input name="name" placeholder="Tên món" className="form-control mb-2" value={form.name} onChange={handleChange} required />
        <input name="price" type="number" placeholder="Giá" className="form-control mb-2" value={form.price} onChange={handleChange} required />
        <input name="image_url" placeholder="Ảnh (URL)" className="form-control mb-2" value={form.image_url} onChange={handleChange} />
        <textarea name="description" placeholder="Mô tả" className="form-control mb-2" value={form.description} onChange={handleChange} />
        <button type="submit" className="btn btn-primary">
          {editingId ? "Cập nhật" : "➕ Thêm món"}
        </button>
      </form>

      {Array.isArray(foods) && foods.length > 0 ? (
        <ul className="list-group">
          {foods.map(food => (
            <li key={food.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{food.name}</strong> – {food.price.toLocaleString()}đ
                <div><small>{food.description}</small></div>
              </div>
              <div>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(food)}>✏️ Sửa</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(food.id)}>🗑️ Xoá</button>
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
