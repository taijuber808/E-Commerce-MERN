import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      navigate("/login", { state: { from: "/profile" } });
      return;
    }

    setUser(JSON.parse(userData));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  if (!user) {
    return <h2 className="profile-loading">Loading Profile...</h2>;
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Left: User Info */}
        <div className="profile-info-box">
          <div className="profile-avatar">
            {user.name?.charAt(0).toUpperCase() || "U"}
          </div>

          <h2>{user.name}</h2>
          <p className="profile-email">{user.email}</p>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

        {/* Right: Quick Links */}
        <div className="profile-links-box">
          <h3>My Account</h3>

          <Link to="/orders" className="profile-link-card">
            <span className="profile-link-icon">📦</span>
            <div>
              <h4>My Orders</h4>
              <p>Track and view your order history</p>
            </div>
            <span className="profile-link-arrow">→</span>
          </Link>

          <Link to="/wishlist" className="profile-link-card">
            <span className="profile-link-icon">🤍</span>
            <div>
              <h4>My Wishlist</h4>
              <p>Products you've saved for later</p>
            </div>
            <span className="profile-link-arrow">→</span>
          </Link>

          <Link to="/cart" className="profile-link-card">
            <span className="profile-link-icon">🛒</span>
            <div>
              <h4>My Cart</h4>
              <p>Review items before checkout</p>
            </div>
            <span className="profile-link-arrow">→</span>
          </Link>

          <Link to="/allProducts" className="profile-link-card">
            <span className="profile-link-icon">🛍️</span>
            <div>
              <h4>Continue Shopping</h4>
              <p>Explore more products</p>
            </div>
            <span className="profile-link-arrow">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
