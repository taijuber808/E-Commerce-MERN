import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      {/* Main Footer */}
      <div className="footer-container">
        {/* Get in Touch */}
        <div className="footer-column">
          <h3>Get in Touch</h3>

          <p className="footer-info">
            <span className="footer-icon">📍</span>
            53 Rain Road, Suite 41 Austin
            <br />
            Greater NY, USA
          </p>

          <p className="footer-info">
            <span className="footer-icon">✉️</span>
            support@shopcart.com
          </p>

          <p className="footer-info">
            <span className="footer-icon">📞</span>
            02 478 658 8936
          </p>

          <div className="footer-social">
            <a href="#">f</a>
            <a href="#">𝕏</a>
            <a href="#">◎</a>
            <a href="#">p</a>
          </div>
        </div>

        {/* Our Policies */}
        <div className="footer-column">
          <h3>Our Policies</h3>

          <Link to="/shipping">Shipping And Delivery</Link>
          <Link to="/payment">Payment Method</Link>
          <Link to="/how-to-shop">How to Shop</Link>
          <Link to="/terms">Terms And Conditions</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/returns">Returns</Link>
        </div>

        {/* Support */}
        <div className="footer-column">
          <h3>Support</h3>

          <Link to="/account">My Account</Link>
          <Link to="/orders">Order Tracking</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/customer-services">Customer Services</Link>
          <Link to="/faqs">FAQs</Link>
          <Link to="/help">Help Desk</Link>
        </div>

        {/* Join Newsletter */}
        <div className="footer-column footer-newsletter">
          <h3>Join Newsletter</h3>

          <p>Subscribe to the newsletter for all the latest updates</p>

          <input type="email" placeholder="Enter your email" />

          <button type="button">Subscribe</button>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <p>Copyright @2026. All Rights Reserved by ShopCart</p>
      </div>
    </footer>
  );
};

export default Footer;
