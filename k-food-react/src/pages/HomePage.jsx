import React, { useEffect, useState } from "react";
import SearchBox from "../components/SearchBox";
import PromoCard from "../components/PromoCard";
import { API_BASE_URL } from "../api/config";

function HomePage({ user }) {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/foods`);
        if (!res.ok) throw new Error("Lỗi khi tải danh sách món ăn");
        const data = await res.json();
        setFoods(data); // data phải là array các món ăn
      } catch (err) {
        console.error("Lỗi tải món ăn:", err.message);
      }
    };

    fetchFoods();
  }, []);

  return (
    <>
      <SearchBox />
      <section className="promo">
        <h2>
          Ưu đãi K-Food tại <span style={{ color: "#00b14f" }}>Hà Nội</span>
        </h2>
        <div className="promo-list">
          {foods.map((food, index) => (
            <PromoCard
              key={index}
              imgSrc={food.image}
              title={food.name}
              category={food.category }
              rating={food.rating }
              time={food.time_estimate }
              distance={food.distance }
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default HomePage;
