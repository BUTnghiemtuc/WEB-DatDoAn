import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../api/config";
import "./DeliveryHistory.css";

function DeliveryHistory() {
  const [history, setHistory] = useState([]);
  const shipper = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchHistory = async () => {
      const res = await fetch(`${API_BASE_URL}/orders/history/${shipper.id}`);
      const data = await res.json();
      setHistory(data);
    };

    if (shipper?.id) fetchHistory();
  }, [shipper]);

  return (
    <div className="container mt-4">
      <h3>🕘 Lịch sử giao hàng</h3>
      {history.length === 0 ? <p>Chưa có lịch sử giao hàng</p> :
        <ul className="list-group">
          {history.map(order => (
            <li key={order.id} className="list-group-item">
              <p><strong>Khách:</strong> {order.customer_name || "Ẩn danh"}</p>
              <p><strong>Địa chỉ:</strong> {order.address}</p>
              <p><strong>Trạng thái:</strong> {order.status}</p>
              <p><strong>Ngày tạo:</strong> {new Date(order.created_at).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      }
    </div>
  );
}

export default DeliveryHistory;
