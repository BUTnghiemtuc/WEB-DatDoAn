import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../api/config";

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) throw new Error("Đăng nhập thất bại");

      const data = await res.json();
      const user = data.user;

      if (!user || !user.id) throw new Error("Không có thông tin người dùng trả về");

      // ✅ Lưu object user vào localStorage
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("role", user.role);
      localStorage.setItem("token", data.token); // nếu có dùng token

      // ✅ Gọi callback để App cập nhật header (nếu có)
      onLogin(user.username, user.role);

      navigate("/");
    } catch (err) {
      alert("Đăng nhập thất bại: " + err.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-content">
        <h2>Đăng nhập</h2>
        <input
          type="text"
          placeholder="Tên đăng nhập"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Đăng nhập</button>
      </div>
    </div>
  );
}

export default LoginPage;
