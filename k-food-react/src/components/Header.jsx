import { Link } from "react-router-dom";
import "./Header.css";

function Header({ onLogout }) {
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;

  return (
    <header className="navbar">
      <div className="logo">
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "#00b14f",
            fontWeight: "bold",
            fontSize: "24px"
          }}
        >
          K-FOOD
        </Link>
      </div>

      <div className="nav-actions">
        {user ? (
          <>
            <span>👤 {user.full_name || user.username}</span>
            <Link to="/account">
              <button>Tài khoản</button>
            </Link>
            <Link to="/orders">
              <button>Lịch sử</button>
            </Link>
            <Link to="/cart">
              <button>Giỏ hàng</button>
            </Link>
            <button onClick={onLogout}>Đăng xuất</button>
          </>
        ) : (
          <Link to="/login">
            <button>Đăng nhập/Đăng ký</button>
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
