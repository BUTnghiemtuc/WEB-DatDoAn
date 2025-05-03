import React from "react";

function PromoCard({ imgSrc, title, category, rating, time, distance }) {
  return (
    <div className="promo-card">
      <img src={imgSrc} alt={title} />
      <h3>{title}</h3>
      <p>{category}</p>
      <span>⭐ {rating} - {time} - {distance}</span>
    </div>
  );
}

export default PromoCard;
