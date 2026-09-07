import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCategories } from "../../api";

const Navbar = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data.data || []);
    } catch (error) {
      console.log("Category Error:", error);
    }
  };

  const handleCategoryChange = (e) => {
    const id = e.target.value;

    if (id) {
      navigate(`/products/category/${id}`);
    }
  };

  // 👇 NEW: login hai to profile, warna login page pe bhejo
  const handleProfileClick = () => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className="navbar">
      {/* Logo */}

      <div className="logo">
        <span>Shop</span>Cart
      </div>

      {/* Navigation */}
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/allProducts">All Products</Link>
        </li>

        <li>
          <select
            className="category-dropdown"
            defaultValue=""
            onChange={handleCategoryChange}
          >
            <option value="" disabled>
              Categories
            </option>

            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </li>

        <li>
          <Link to="/about">About</Link>
        </li>

        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>

      {/* Search */}
      <div className="search-box" onClick={() => navigate("/Search")}>
        <input type="text" placeholder="Search products..." readOnly />

        <span>⌕</span>
      </div>

      {/* Actions */}
      <div className="nav-actions">
        <button
          className="nav-icon"
          onClick={() => navigate("/wishlist")}
          title="Wishlist"
        >
          ♡
        </button>

        <button
          className="nav-icon cart-icon"
          onClick={() => navigate("/cart")}
          title="Cart"
        >
          🛒
        </button>

        <button
          className="nav-icon"
          onClick={handleProfileClick}
          title="Profile"
        >
          👤
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
