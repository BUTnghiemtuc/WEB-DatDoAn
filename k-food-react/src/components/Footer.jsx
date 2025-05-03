import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>K-FOOD</h3>
          <p>K-FOOD là dịch vụ giao đồ ăn nhanh chóng và tiện lợi tại Việt Nam.</p>
        </div>
        <div className="footer-section">
          <h4>Về chúng tôi</h4>
          <ul>
            <li><a href="#">Giới thiệu</a></li>
            <li><a href="#">Tuyển dụng</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Hỗ trợ</h4>
          <ul>
            <li><a href="#">Trung tâm trợ giúp</a></li>
            <li><a href="#">Chính sách bảo mật</a></li>
            <li><a href="#">Điều khoản dịch vụ</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Theo dõi chúng tôi</h4>
          <div className="social-icons">
            <a href="#">Facebook</a> | <a href="#">Instagram</a> | <a href="#">YouTube</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; 2025 K-FOOD. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
