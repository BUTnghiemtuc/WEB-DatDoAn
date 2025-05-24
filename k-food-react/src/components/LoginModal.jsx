import React, { useState } from "react";

function LoginModal({ isOpen, onClose, onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (username === "admin" && password === "123456") {
      onLogin(username);
      onClose();
    } else {
      alert("Sai tài khoản hoặc mật khẩu!");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="login-modal">
      <div className="login-content">
        <h3>Đăng nhập</h3>
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
        <button onClick={handleSubmit}>Đăng nhập</button>
        <button className="close-btn" onClick={onClose}>Hủy</button>
      </div>
    </div>
  );
}

export default LoginModal;