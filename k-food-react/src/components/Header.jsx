import { Link } from "react-router-dom";
import "./Header.css";

function Header({ onLogout }) {
  const user = localStorage.getItem("user");

  return (
    <header className="navbar">
      <div className="logo">
        <Link to="/" style={{ textDecoration: "none", color: "#00b14f", fontWeight: "bold", fontSize: "24px" }}>
          K-FOOD
        </Link>
      </div>

      <div className="nav-actions">
        {user ? (
          <>
            <span>👤 {user}</span>
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
        <select style={{ marginLeft: "12px" }}>
          <option>VI</option>
          <option>EN</option>
        </select>
      </div>
    </header>
  );
}

export default Header;