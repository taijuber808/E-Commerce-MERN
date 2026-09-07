import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getWishlistAPI, removeFromWishlistAPI } from "../../api";
import "./Wishlist.css";

const Wishlist = () => {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login", { state: { from: "/wishlist" } });
      return;
    }

    loadWishlist();
  }, []);

  const loadWishlist = async () => {
    try {
      setLoading(true);
      const data = await getWishlistAPI();

      if (data && data.items) {
        const validItems = data.items.filter((item) => item.productId);
        setItems(validItems);
      } else {
        setItems([]);
      }
    } catch (error) {
      console.log("Wishlist Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (productId) => {
    try {
      await removeFromWishlistAPI(productId);
      setItems((prev) =>
        prev.filter((item) => item.productId._id !== productId)
      );
    } catch (error) {
      console.log("Remove Error:", error);
    }
  };

  if (loading) {
    return <h2 className="wishlist-loading">Loading Wishlist...</h2>;
  }

  return (
    <div className="wishlist-page">
      <div className="wishlist-heading">
        <h1>My Wishlist</h1>
        <span>Products you've saved for later.</span>
      </div>

      {items.length > 0 ? (
        <div className="wishlist-grid">
          {items.map((item) => (
            <div className="wishlist-card" key={item.productId._id}>
              <button
                className="wishlist-remove-btn"
                onClick={() => handleRemove(item.productId._id)}
                aria-label="Remove from wishlist"
              >
                ✕
              </button>

              <Link
                to={`/Product-detail/${item.productId._id}`}
                className="wishlist-image"
              >
                <img src={item.productId.image} alt={item.productId.name} />
              </Link>

              <div className="wishlist-info">
                <h3>{item.productId.name}</h3>
                <span className="wishlist-price">
                  ₹{item.productId.price}
                </span>

                <Link
                  to={`/Product-detail/${item.productId._id}`}
                  className="wishlist-view-btn"
                >
                  View Product
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="wishlist-empty">
          <div className="wishlist-empty-icon">🤍</div>
          <h3>Your wishlist is empty</h3>
          <p>Save products you love and find them here anytime.</p>
          <Link to="/allProducts" className="wishlist-empty-btn">
            Explore Products
          </Link>
        </div>
      )}
    </div>
  );
};

export default Wishlist;