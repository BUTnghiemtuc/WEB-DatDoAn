import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage"; 
import UserHomePage from "./pages/home/UserHomePage";
import AdminHomePage from "./pages/home/AdminHomePage";
import ShipperHomePage from "./pages/home/ShipperHomePage";
import RestaurantHomePage from "./pages/home/RestaurantHomePage";
import FoodDetailPage from "./pages/FoodDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import AccountPage from "./pages/AccountPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import StatsPage from "./pages/admin/StatsPage";
import UserManager from "./pages/admin/UserManager";
import OrderManager from "./pages/admin/OrderManager";
import FoodManager from "./pages/admin/FoodManager";
import ShipperHistoryPage from "./pages/shipper/ShipperHistoryPage";
import ShipperOrderManager from "./pages/shipper/ShipperOrderManager";

function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedRole = localStorage.getItem("role");
    if (storedUser) setUser(storedUser);
    if (storedRole) setRole(storedRole);
  }, []);

  const handleLogin = (username, role) => {
    setUser(username);
    setRole(role);
    localStorage.setItem("user", username);
    localStorage.setItem("role", role);
  };

  const handleLogout = () => {
    setUser(null);
    setRole(null);
    localStorage.removeItem("user");
    localStorage.removeItem("role");
  };

  const getHomePage = () => {
    if (!user) return <HomePage />;
    if (role === "admin") return <AdminHomePage />;
    if (role === "shipper") return <ShipperHomePage />;
    if (role === "restaurant") return <RestaurantHomePage />;
    return <UserHomePage />;
  };

  return (
    <BrowserRouter>
      <Header user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={getHomePage()} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/food/:id" element={<FoodDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/orders" element={<OrderHistoryPage />} />
        <Route path="/admin/users" element={<UserManager />} />
        <Route path="/admin/orders" element={<OrderManager />} />
        <Route path="/admin/foods" element={<FoodManager />} />
        <Route path="/admin/stats" element={<StatsPage />} />
        <Route path="/shipper/history" element={<ShipperHistoryPage />} />
        <Route path="/shipper/order" element={<ShipperOrderManager />} /> 
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
