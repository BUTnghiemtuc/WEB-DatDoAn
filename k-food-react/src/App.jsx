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
import OrderDetailPage from "./pages/OrderDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import AccountPage from "./pages/AccountPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import StatsPage from "./pages/admin/StatsPage";
import UserManager from "./pages/admin/UserManager";
import OrderManager from "./pages/admin/OrderManager";
import FoodManager from "./pages/admin/FoodManager";
import RestaurantFoodManager from "./pages/restaurant/RestaurantFoodManager";
import PendingOrders from "./pages/restaurant/PendingOrders";
import FoodStatus from "./pages/restaurant/FoodStatus";
import AssignedOrders from "./pages/shipper/AssignedOrders";
import DeliveryHistory from "./pages/shipper/DeliveryHistory";

function App() {
  const [user, setUser] = useState(null); // user là object: { id, username, ... }
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && parsedUser.id) {
          setUser(parsedUser);
          setRole(parsedUser.role);
        }
      } catch (err) {
        console.warn("⚠ Dữ liệu user không hợp lệ trong localStorage:", err);
        localStorage.removeItem("user");
        localStorage.removeItem("role");
        setUser(null);
        setRole(null);
      }
    }
  }, []);

  // ✅ Nhận toàn bộ object user
  const handleLogin = (userObject) => {
    setUser(userObject);
    setRole(userObject.role);
    localStorage.setItem("user", JSON.stringify(userObject)); // ✅ lưu object
    localStorage.setItem("role", userObject.role);
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
        <Route path="/orders/:id" element={<OrderDetailPage />} />
        <Route path="/admin/users" element={<UserManager />} />
        <Route path="/admin/orders" element={<OrderManager />} />
        <Route path="/admin/foods" element={<FoodManager />} />
        <Route path="/admin/stats" element={<StatsPage />} />
        <Route path="/foods/:id" element={<FoodDetailPage />} />
        <Route path="/restaurant/foods" element={<RestaurantFoodManager />} />
        <Route path="/restaurant/orders" element={<PendingOrders />} />
        <Route path="/restaurant/food-status" element={<FoodStatus />} />
        <Route path="/restaurant/availability" element={<FoodStatus />} />
        <Route path="/shipper/assigned-orders" element={<AssignedOrders />} />
        <Route path="/shipper/update-status" element={<DeliveryHistory />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
