import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllProduct } from "../../api";
import "./Search.css";

const Search = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getAllProduct();
      setProducts(data.data || []);
    } catch (error) {
      console.log("Product Error:", error);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="search-page">
      {/* Top Header */}
      <div className="search-top">
        {/* Logo */}
        <Link to="/" className="search-logo">
          <span>Shop</span>Cart
        </Link>

        {/* Search */}
        <div className="search-main-box">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />

          <span>🔍</span>
        </div>

        {/* Actions */}
        <div className="search-actions">
          <Link to="/wishlist" className="search-action">
            ♡
          </Link>

          <Link to="/cart" className="search-action">
            🛒
          </Link>

          <Link to="/profile" className="search-action">
            👤
          </Link>
        </div>
      </div>

      {/* Products */}

      <div className="search-product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div className="search-product-card" key={product._id}>
              <div className="search-product-image">
                <img src={product.image} alt={product.name} />
              </div>

              <div className="search-product-info">
                <h3>{product.name}</h3>

                <p>
                  {product.description.length > 80
                    ? product.description.slice(0, 80) + "..."
                    : product.description}
                </p>

                <div className="search-product-bottom">
                  <span>₹{product.price}</span>

                  <Link
                    to={`/Product-detail/${product._id}`}
                    className="search-view-btn"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-search-result">
            <h2>No Products Found</h2>

            <p>Try searching for another product.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
