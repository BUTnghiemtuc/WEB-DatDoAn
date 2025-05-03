import React, { useState } from "react";

function SearchBox() {
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    if (!location.trim()) {
      alert("Vui lòng nhập vị trí để tìm kiếm.");
    } else {
      alert("Đang tìm kiếm quán ăn gần " + location + "...");
    }
  };

  return (
    <section className="banner">
      <div className="search-box">
        <h4>Good Morning</h4>
        <h2>Where should we deliver your food today?</h2>
        <input
          type="text"
          placeholder="Nhập vị trí giao đồ ăn"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button className="btn-search" onClick={handleSearch}>Tìm kiếm</button>
      </div>
    </section>
  );
}

export default SearchBox;
