import React from "react";
import { Link } from "react-router-dom";
// import "./PromoCard.css"; // nếu có CSS riêng cho card

function PromoCard({ imgSrc, title, category, rating, time, distance, id }) {
  return (
    <Link to={`/food/${id}`} className="promo-card">
      <img src={imgSrc} alt={title} />
      <h3>{title}</h3>
      <p>{category}</p>
      <span>⭐ {rating} - {time} - {distance}</span>
    </Link>
  );
}

export default PromoCard;
