import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getMyOrdersAPI } from "../../api";
import "./Orders.css";

const Orders = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login", { state: { from: "/orders" } });
      return;
    }

    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const data = await getMyOrdersAPI(token);

      if (data.status) {
        setOrders(data.data || []);
      }
    } catch (error) {
      console.log("Orders Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return <h2 className="orders-loading">Loading Orders...</h2>;
  }

  return (
    <div className="orders-page">
      <div className="orders-heading">
        <h1>My Orders</h1>
        <span>Track and manage all your past orders.</span>
      </div>

      {orders.length > 0 ? (
        <div className="orders-list">
          {orders.map((order) => (
            <div className="order-card" key={order._id}>
              {/* Order Top Row */}
              <div className="order-top">
                <div>
                  <span className="order-id">Order #{order._id.slice(-8).toUpperCase()}</span>
                  <span className="order-date">
                    Placed on {formatDate(order.createdAt)}
                  </span>
                </div>

                <span className={`order-status status-${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </div>

              {/* Order Items */}
              <div className="order-items">
                {order.items.map((item) => (
                  <div className="order-item" key={item._id}>
                    <Link
                      to={`/Product-detail/${item.productId?._id}`}
                      className="order-item-image"
                    >
                      <img
                        src={item.productId?.image}
                        alt={item.productId?.name}
                      />
                    </Link>

                    <div className="order-item-info">
                      <Link
                        to={`/Product-detail/${item.productId?._id}`}
                        className="order-item-name"
                      >
                        {item.productId?.name || "Product unavailable"}
                      </Link>

                      <span className="order-item-qty">
                        Qty: {item.quantity} × ₹{item.price}
                      </span>
                    </div>

                    <span className="order-item-subtotal">
                      ₹{item.quantity * item.price}
                    </span>
                  </div>
                ))}
              </div>

              {/* Order Bottom */}
              <div className="order-bottom">
                <span className="order-address">
                  📍 {order.address}
                </span>

                <span className="order-total">
                  Total: ₹{order.totalAmount}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="orders-empty">
          <div className="orders-empty-icon">📦</div>
          <h3>No orders yet</h3>
          <p>You haven't placed any orders. Start shopping now!</p>
          <Link to="/allProducts" className="orders-empty-btn">
            Explore Products
          </Link>
        </div>
      )}
    </div>
  );
};

export default Orders;