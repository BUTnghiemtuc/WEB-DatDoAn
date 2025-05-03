import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import SearchBox from "./components/SearchBox";
import PromoCard from "./components/PromoCard";
import LoginPage from "./pages/LoginPage";
import nemNuong from "./assets/nemNuong.png";
import mcdonald from "./assets/mcdonald.png";


function Home({ user }) {
  return (
    <>
      <SearchBox />
      <section className="promo">
        <h2>Ưu đãi K-Food tại <span style={{ color: "#00b14f" }}>Hà Nội</span></h2>
        <div className="promo-list">
          <PromoCard imgSrc="" title="Nem Nướng" category="Món Khác" rating="4.8" time="35 phút" distance="5.5 km" />
          <PromoCard imgSrc=""title="McDonald's" category="Fastfood" rating="4.3" time="25 phút" distance="2.2 km" />
        </div>
      </section>
    </>
  );
}

function App() {
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    setUser(null); // Clear user
  };

  return (
    <BrowserRouter>
      <Header user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/login" element={<LoginPage onLogin={setUser} />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
