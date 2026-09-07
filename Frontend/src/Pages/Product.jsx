import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getAllProduct, getProductByCategory } from "../../api";
import { addToWishlistAPI, removeFromWishlistAPI } from "../../api";
import "./Product.css";

const PRODUCTS_PER_PAGE = 12;

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlisted, setWishlisted] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    loadProducts();
  }, [id]);

  useEffect(() => {
    setCurrent(1); // category ya sort change ho to page 1 pe reset
  }, [id, sortOrder]);

  const loadProducts = async () => {
    try {
      setLoading(true);

      let data;

      if (id) {
        data = await getProductByCategory(id);
      } else {
        data = await getAllProduct();
      }

      setProducts(data.data || []);
    } catch (error) {
      console.log("Product Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleWishlistClick = async (e, productId) => {
    e.preventDefault();
    e.stopPropagation();

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login", { state: { from: `/products/category/${id || ""}` } });
      return;
    }

    try {
      if (wishlisted.includes(productId)) {
        await removeFromWishlistAPI(productId);
        setWishlisted((prev) => prev.filter((pid) => pid !== productId));
      } else {
        await addToWishlistAPI(productId);
        setWishlisted((prev) => [...prev, productId]);
      }
    } catch (error) {
      console.log("Wishlist Error:", error);
    }
  };

  // Sorting
  const sortedProducts = [...products].sort((a, b) => {
    if (sortOrder === "Low") return a.price - b.price;
    if (sortOrder === "High") return b.price - a.price;
    return 0;
  });

  // Pagination
  const lastIndex = current * PRODUCTS_PER_PAGE;
  const firstIndex = lastIndex - PRODUCTS_PER_PAGE;
  const currentProducts = sortedProducts.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  if (loading) {
    return <h2 className="product-loading">Loading Products...</h2>;
  }

  return (
    <div className="product-page">
      {/* Page Heading */}
      <div className="product-heading">
        <h1>{id ? "Category Products" : "All Products"}</h1>

        <span>Discover our latest products and find something you love.</span>
      </div>

      {/* Toolbar: count + sort */}
      <div className="product-toolbar">

        <select
          className="sort-dropdown"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="">Sort by Price</option>
          <option value="Low">Low to High</option>
          <option value="High">High to Low</option>
        </select>
      </div>

      {/* Products + Pagination arrows */}
      <div className="product-wrapper">
        <button
          className="pagination-arrow"
          onClick={() => setCurrent(current - 1)}
          disabled={current === 1}
        >
          ←
        </button>

        <div className="product-grid">
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <Link
                to={`/Product-detail/${product._id}`}
                className="product-card"
                key={product._id}
              >
                {/* Product Image */}
                <div className="product-image">
                  {product.discount && (
                    <span className="discount-badge">
                      {product.discount}% OFF
                    </span>
                  )}

                  <button
                    className="wishlist-btn"
                    onClick={(e) => handleWishlistClick(e, product._id)}
                    aria-label="Add to wishlist"
                  >
                    {wishlisted.includes(product._id) ? "❤️" : "🤍"}
                  </button>

                  <img src={product.image} alt={product.name} />
                </div>

                {/* Product Details */}
                <div className="product-info">
                  <div className="product-top-row">
                    <h3>{product.name}</h3>

                    <span className="product-rating">
                      ★ {product.rating || "4.9"}
                    </span>
                  </div>

                  <span className="product-price">₹{product.price}</span>
                </div>
              </Link>
            ))
          ) : (
            <p className="no-product">No products found.</p>
          )}
        </div>

        <button
          className="pagination-arrow"
          onClick={() => setCurrent(current + 1)}
          disabled={current === totalPages}
        >
          →
        </button>
      </div>
    </div>
  );
};

export default Product;
