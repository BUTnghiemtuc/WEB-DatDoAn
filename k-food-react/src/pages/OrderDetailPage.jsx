import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../api/config";

function OrderDetailPage() {
  const { id } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/orders/${id}`)
      .then(res => res.json())
      .then(setItems)
      .catch(err => console.error("Lỗi load chi tiết đơn:", err));
  }, [id]);

  if (items.length === 0) return <p>Đang tải...</p>;

  return (
    <div className="order-detail-container">
      <h2>Chi tiết đơn hàng #{id}</h2>
      <ul>
        {items.map((item, idx) => (
          <li key={idx}>
            {item.food_name} × {item.quantity} — {(item.price * item.quantity).toLocaleString()} đ
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrderDetailPage;
