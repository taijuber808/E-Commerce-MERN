import { useEffect, useState } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { getSingleProduct, addToCart } from "../../api";
import "./ProductDetail.css";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);

      const data = await getSingleProduct(id);

      if (data.status) {
        setProduct(data.data);
      }
    } catch (error) {
      console.log("Single Product Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    try {
      setAdding(true);

      await addToCart({ productId: product._id, quantity }, token);

      alert("Product added to cart!");
    } catch (error) {
      console.log("Add to Cart Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setAdding(false);
    }
  };

  const handleBuyNow = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    try {
      await addToCart({ productId: product._id, quantity }, token);
      navigate("/cart");
    } catch (error) {
      console.log("Buy Now Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="single-loading">
        <h2>Loading Product...</h2>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product Not Found</h2>

        <Link to="/allProduct">Back to Products</Link>
      </div>
    );
  }

  return (
    <div className="single-product-page">
      <div className="single-product-container">
        {/* Product Image */}
        <div className="single-product-image">
          <img src={product.image} alt={product.name} />
        </div>

        {/* Product Details */}
        <div className="single-product-details">
          <p className="product-brand">SHOPCART</p>

          <h1>{product.name}</h1>

          <div className="product-rating">
            ⭐⭐⭐⭐⭐
            <span> 4.8 / 5</span>
          </div>

          <h2 className="single-product-price">₹{product.price}</h2>

          <p className="single-product-description">{product.description}</p>

          {/* Quantity */}
          <div className="quantity-section">
            <span>Quantity</span>

            <div className="quantity-box">
              <button onClick={decreaseQuantity}>−</button>

              <span>{quantity}</span>

              <button onClick={increaseQuantity}>+</button>
            </div>
          </div>

          {/* Buttons */}
          <div className="product-buttons">
            <button
              className="add-cart-btn"
              onClick={handleAddToCart}
              disabled={adding}
            >
              🛒 {adding ? "Adding..." : "Add To Cart"}
            </button>

            <button className="buy-now-btn" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>

          {/* Extra Information */}
          <div className="product-info-box">
            <div>
              🚚
              <span>
                <strong>Fast Delivery</strong>
                <small>Delivery available</small>
              </span>
            </div>

            <div>
              🔒
              <span>
                <strong>Secure Payment</strong>
                <small>Safe & secure checkout</small>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
