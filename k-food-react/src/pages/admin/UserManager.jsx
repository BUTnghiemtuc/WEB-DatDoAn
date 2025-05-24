import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../api/config";

export default function UserManager() {
  const [users, setUsers] = useState([]);
  const [filterRole, setFilterRole] = useState("all");
  const [formUser, setFormUser] = useState({ username: "", password: "", full_name: "", role: "user" });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/users`);
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Lỗi tải danh sách người dùng:", err);
    }
  };

  const handleChange = (e) => {
    setFormUser({ ...formUser, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formUser),
      });
      if (res.ok) {
        alert("Thêm thành công");
        fetchUsers();
        setFormUser({ username: "", password: "", full_name: "", role: "user" });
      }
    } catch (err) {
      alert("Lỗi khi thêm người dùng");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa?")) return;
    try {
      await fetch(`${API_BASE_URL}/users/${id}`, { method: "DELETE" });
      fetchUsers();
    } catch (err) {
      alert("Lỗi khi xóa");
    }
  };

  const handleUpdate = async () => {
    try {
      await fetch(`${API_BASE_URL}/users/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formUser),
      });
      fetchUsers();
      setEditId(null);
      setFormUser({ username: "", password: "", full_name: "", role: "user" });
    } catch (err) {
      alert("Lỗi khi cập nhật");
    }
  };

  const startEdit = (user) => {
    setEditId(user.id);
    setFormUser({ ...user, password: "" });
  };

  const filteredUsers = users.filter(user =>
    filterRole === "all" ? true : user.role === filterRole
  );

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Quản lý người dùng</h1>

      <div style={{ marginBottom: "1rem" }}>
        <label>Lọc vai trò: </label>
        <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
          <option value="all">Tất cả</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
          <option value="restaurant">Nhà hàng</option>
          <option value="shipper">Shipper</option>
        </select>
      </div>

      <h3>{editId ? "Chỉnh sửa người dùng" : "Thêm người dùng mới"}</h3>
      <input name="username" placeholder="Tên đăng nhập" value={formUser.username} onChange={handleChange} disabled={editId !== null} />
      {!editId && (
        <input name="password" placeholder="Mật khẩu" value={formUser.password} onChange={handleChange} />
      )}
      <input name="full_name" placeholder="Họ tên" value={formUser.full_name} onChange={handleChange} />
      <select name="role" value={formUser.role} onChange={handleChange}>
        <option value="admin">Admin</option>
        <option value="user">User</option>
        <option value="restaurant">Nhà hàng</option>
        <option value="shipper">Shipper</option>
      </select>
      {editId ? (
        <button onClick={handleUpdate}>Cập nhật</button>
      ) : (
        <button onClick={handleAdd}>Thêm</button>
      )}

      <h3 style={{ marginTop: "2rem" }}>Danh sách người dùng</h3>
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên đăng nhập</th>
            <th>Họ tên</th>
            <th>Vai trò</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.full_name}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => startEdit(user)}>✏️</button>
                <button onClick={() => handleDelete(user.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
