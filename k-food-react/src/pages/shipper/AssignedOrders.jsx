import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../api/config";
import "./AssignedOrders.css";

function AssignedOrders() {
  const [orders, setOrders] = useState([]);
  const shipper = JSON.parse(localStorage.getItem("user"));

  const fetchAssignedOrders = async () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return;

      const parsedUser = JSON.parse(storedUser);
      const shipperId = parsedUser?.id;
      if (!shipperId) return;

      const res = await fetch(`${API_BASE_URL}/orders/assigned/${shipperId}`);
      if (!res.ok) throw new Error("Failed to fetch assigned orders");

      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error("❌ Lỗi khi tải đơn hàng được phân công:", err);
      setOrders([]); // clear danh sách nếu lỗi
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`${API_BASE_URL}/orders/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });

      const result = await res.json();

      if (res.ok) {
        alert(result.message || "✅ Cập nhật trạng thái thành công");
        fetchAssignedOrders(); // Refresh lại danh sách
      } else {
        alert(result.message || "❌ Không thể cập nhật trạng thái");
      }
    } catch (err) {
      console.error("❌ Lỗi khi cập nhật trạng thái:", err);
      alert("❌ Lỗi kết nối khi cập nhật trạng thái");
    }
  };

  useEffect(() => {
    if (shipper?.id) fetchAssignedOrders();
  }, [shipper]);

  return (
    <div className="container mt-4">
      <h3>📦 Đơn hàng được phân công</h3>
      {orders.length === 0 ? (
        <p>🚚 Không có đơn hàng nào</p>
      ) : (
        <ul className="list-group">
          {orders.map((order) => (
            <li key={order.id} className="list-group-item">
              <p>
                <strong>Khách hàng:</strong> {order.customer_name || "Ẩn danh"}
              </p>
              <p>
                <strong>Địa chỉ:</strong> {order.address}
              </p>
              <p>
                <strong>Trạng thái:</strong> {order.status}
              </p>
              <button
                className="btn btn-success me-2"
                onClick={() => updateStatus(order.id, "delivered")}
              >
                ✅ Giao thành công
              </button>
              <button
                className="btn btn-danger"
                onClick={() => updateStatus(order.id, "failed")}
              >
                ❌ Không giao được
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AssignedOrders;
