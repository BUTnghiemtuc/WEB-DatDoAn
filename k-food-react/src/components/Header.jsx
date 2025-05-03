function Header({ user, onLogout }) {
  return (
    <header className="navbar">
      <div className="logo">
        <Link to="/" style={{ textDecoration: "none", color: "#00b14f" }}>K-FOOD</Link>
      </div>
      <div className="nav-actions">
        {user ? (
          <>
            <span>👤 {user}</span>
            <button onClick={onLogout}>Đăng xuất</button>
          </>
        ) : (
          <Link to="/login">
            <button>Đăng nhập/Đăng ký</button>
          </Link>
        )}
        <select>
          <option>VI</option>
          <option>EN</option>
        </select>
      </div>
    </header>
  );
}
