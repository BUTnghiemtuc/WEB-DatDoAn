import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../api/config";

export default function FoodManager() {
  const [foods, setFoods] = useState([]);
  const [formFood, setFormFood] = useState({
    name: "", price: "", image_url: "", description: "", category: ""
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/foods`);
      const data = await res.json();
      setFoods(data);
    } catch (err) {
      console.error("Lỗi tải món ăn:", err);
    }
  };

  const handleChange = (e) => {
    setFormFood({ ...formFood, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/foods`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formFood)
      });
      if (res.ok) {
        alert("Thêm món thành công!");
        fetchFoods();
        setFormFood({ name: "", price: "", image_url: "", description: "", category: "" });
      }
    } catch (err) {
      alert("Lỗi khi thêm món ăn");
    }
  };

  const handleUpdate = async () => {
    try {
      await fetch(`${API_BASE_URL}/foods/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formFood)
      });
      fetchFoods();
      setEditId(null);
      setFormFood({ name: "", price: "", image_url: "", description: "", category: "" });
    } catch (err) {
      alert("Lỗi khi cập nhật món ăn");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa món này?")) return;
    try {
      await fetch(`${API_BASE_URL}/foods/${id}`, { method: "DELETE" });
      fetchFoods();
    } catch (err) {
      alert("Lỗi khi xóa món ăn");
    }
  };

  const startEdit = (food) => {
    setEditId(food.id);
    setFormFood({ ...food });
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Quản lý món ăn</h1>

      <h3>{editId ? "Cập nhật món" : "Thêm món mới"}</h3>
      <input name="name" placeholder="Tên món" value={formFood.name} onChange={handleChange} />
      <input name="price" placeholder="Giá" value={formFood.price} onChange={handleChange} />
      <input name="image_url" placeholder="Link ảnh" value={formFood.image_url} onChange={handleChange} />
      <input name="description" placeholder="Mô tả" value={formFood.description} onChange={handleChange} />
      <input name="category" placeholder="Danh mục" value={formFood.category} onChange={handleChange} />
      {editId ? (
        <button onClick={handleUpdate}>Cập nhật</button>
      ) : (
        <button onClick={handleAdd}>Thêm</button>
      )}

      <h3 style={{ marginTop: "2rem" }}>Danh sách món ăn</h3>
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Giá</th>
            <th>Hình ảnh</th>
            <th>Danh mục</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {foods.map(food => (
            <tr key={food.id}>
              <td>{food.id}</td>
              <td>{food.name}</td>
              <td>{food.price}</td>
              <td><img src={food.image_url} alt={food.name} width="60" /></td>
              <td>{food.category}</td>
              <td>
                <button onClick={() => startEdit(food)}>✏️</button>
                <button onClick={() => handleDelete(food.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
