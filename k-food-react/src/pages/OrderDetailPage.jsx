import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../api/config";
import "./OrderDetailPage.css";


function OrderDetailPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/orders/${id}`)
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Lỗi ${res.status}: ${text}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("📦 Chi tiết đơn hàng:", data);
        setOrder(data.order || {});
        setItems(Array.isArray(data.items) ? data.items : []);
      })
      .catch((err) => {
        console.error("🔥 Lỗi khi tải chi tiết đơn hàng:", err);
        setError("Không thể tải chi tiết đơn hàng.");
      });
  }, [id]);

  if (error) return <p className="text-danger">{error}</p>;
  if (!order) return <p>Đang tải đơn hàng...</p>;

  return (
    <div className="order-detail-container">
      <h2>Chi tiết đơn hàng #{order.id}</h2>
      <p><strong>Địa chỉ:</strong> {order.address}</p>
      <p><strong>Phương thức thanh toán:</strong> {order.payment_method}</p>
      <p><strong>Trạng thái:</strong> {order.status || "Chờ xử lý"}</p>
      <p><strong>Tổng tiền:</strong> {order.total_price?.toLocaleString()} đ</p>

      <h4>Món đã đặt:</h4>
      {items.length === 0 ? (
        <p>Không có món nào.</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.name} × {item.quantity} — {(item.price * item.quantity).toLocaleString()} đ
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default OrderDetailPage;
