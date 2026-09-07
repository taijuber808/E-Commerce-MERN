import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCart, removeFromCart, addToCart, placeOrderAPI } from "../../api";
import "./Cart.css";

function Cart() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [showAddress, setShowAddress] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login", { state: { from: "/cart" } });
      return;
    }

    loadCart();
  }, []);

  const loadCart = async (showLoading = true) => {
    try {
      if (showLoading) setLoading(true);

      const token = localStorage.getItem("token");
      const data = await getCart(token);

      setCartItems(data?.items?.filter((item) => item.productId) || []);
    } catch (error) {
      console.log("Cart Error:", error);
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  const handleRemove = async (productId) => {
    const token = localStorage.getItem("token");
    await removeFromCart({ productId }, token);
    setCartItems((prev) =>
      prev.filter((item) => item.productId._id !== productId),
    );
  };

  const handleQuantityChange = async (productId, currentQty, change) => {
    if (currentQty + change < 1) return;

    const token = localStorage.getItem("token");
    await addToCart({ productId, quantity: change }, token);
    loadCart(false);
  };

  const handlePlaceOrder = async () => {
    if (!address.trim()) {
      alert("Please enter your address");
      return;
    }

    const token = localStorage.getItem("token");
    const data = await placeOrderAPI({ address, paymentMethod }, token);

    if (data.status) {
      alert("Order placed successfully!");
      navigate("/orders");
    } else {
      alert(data.message);
    }
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0,
  );

  if (loading) return <h2 className="cart-loading">Loading Cart...</h2>;

  return (
    <div className="cart-page">
      <div className="cart-heading">
        <h1>My Cart</h1>
        <span>Review your items before checkout.</span>
      </div>

      {cartItems.length > 0 ? (
        <div className="cart-container">
          {/* Cart Items */}
          <div className="cart-items-list">
            {cartItems.map((item) => (
              <div className="cart-item-card" key={item.productId._id}>
                <Link
                  to={`/product/${item.productId._id}`}
                  className="cart-item-image"
                >
                  <img src={item.productId.image} alt={item.productId.name} />
                </Link>

                <div className="cart-item-info">
                  <Link
                    to={`/product/${item.productId._id}`}
                    className="cart-item-name"
                  >
                    {item.productId.name}
                  </Link>

                  <span className="cart-item-price">
                    ₹{item.productId.price}
                  </span>

                  <div className="cart-item-quantity">
                    <button
                      onClick={() =>
                        handleQuantityChange(
                          item.productId._id,
                          item.quantity,
                          -1,
                        )
                      }
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleQuantityChange(
                          item.productId._id,
                          item.quantity,
                          1,
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="cart-item-right">
                  <span className="cart-item-subtotal">
                    ₹{item.productId.price * item.quantity}
                  </span>

                  <button
                    className="cart-item-remove"
                    onClick={() => handleRemove(item.productId._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="cart-summary-box">
            <h3>Order Summary</h3>

            <div className="cart-summary-row">
              <span>Subtotal</span>
              <span>₹{totalPrice}</span>
            </div>

            <div className="cart-summary-row">
              <span>Delivery</span>
              <span className="free-text">Free</span>
            </div>

            <div className="cart-summary-divider"></div>

            <div className="cart-summary-row cart-summary-total">
              <span>Total</span>
              <span>₹{totalPrice}</span>
            </div>

            {showAddress ? (
              <>
                <textarea
                  className="address-input"
                  rows="3"
                  placeholder="Enter delivery address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                ></textarea>

                <div className="payment-method-box">
                  <label>Payment Method</label>

                  <div className="payment-options">
                    <label
                      className={`payment-option ${paymentMethod === "COD" ? "selected" : ""}`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="COD"
                        checked={paymentMethod === "COD"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      💵 Cash on Delivery
                    </label>

                    <label
                      className={`payment-option ${paymentMethod === "UPI" ? "selected" : ""}`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="UPI"
                        checked={paymentMethod === "UPI"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      📱 UPI / QR Payment
                    </label>
                  </div>

                  {/* 👇 NEW: QR Code jab UPI select ho */}
                  {paymentMethod === "UPI" && (
                    <div className="qr-box">
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=ShopCartPayment-${totalPrice}`}
                        alt="UPI QR Code"
                      />
                      <p>Scan using PhonePe, Google Pay or Paytm</p>
                    </div>
                  )}
                </div>

                <button className="checkout-btn" onClick={handlePlaceOrder}>
                  Place Order
                </button>
              </>
            ) : (
              <button
                className="checkout-btn"
                onClick={() => setShowAddress(true)}
              >
                Proceed to Checkout
              </button>
            )}

            <Link to="/allProducts" className="continue-shopping-link">
              ← Continue Shopping
            </Link>
          </div>
        </div>
      ) : (
        <div className="cart-empty">
          <div className="cart-empty-icon">🛒</div>
          <h3>Your cart is empty</h3>
          <p>Looks like you haven't added anything to your cart yet.</p>
          <Link to="/allProducts" className="cart-empty-btn">
            Start Shopping
          </Link>
        </div>
      )}
    </div>
  );
}

export default Cart;
