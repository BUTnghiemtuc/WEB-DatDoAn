// src/pages/AccountPage.jsx
import React, { useState, useEffect } from "react";
import "./AccountPage.css";

function AccountPage() {
  const [account, setAccount] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const stored = localStorage.getItem("account");
    if (stored) {
      setAccount(JSON.parse(stored));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccount((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    localStorage.setItem("account", JSON.stringify(account));
    alert("✅ Cập nhật thông tin thành công!");
  };

  return (
    <div className="account-container">
      <h2>Thông tin tài khoản</h2>
      <label>Họ tên:<input type="text" name="name" value={account.name} onChange={handleChange} /></label>
      <label>Email:<input type="email" name="email" value={account.email} onChange={handleChange} /></label>
      <label>SĐT:<input type="tel" name="phone" value={account.phone} onChange={handleChange} /></label>
      <label>Địa chỉ mặc định:<input type="text" name="address" value={account.address} onChange={handleChange} /></label>
      <button onClick={handleSave}>Lưu</button>
    </div>
  );
}

export default AccountPage;