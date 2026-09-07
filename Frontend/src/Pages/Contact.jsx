import { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    orderId: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Support request:", formData);
    // yaha apni API call add karna
    setFormData({ name: "", email: "", orderId: "", message: "" });
  };

  const helpTopics = [
    {
      icon: "📦",
      title: "Track My Order",
      desc: "Check the live status and delivery updates of your order.",
    },
    {
      icon: "↩️",
      title: "Returns & Refunds",
      desc: "Start a return, check refund status or replacement.",
    },
    {
      icon: "💳",
      title: "Payments & Billing",
      desc: "Issues with payment, invoice or transaction failure.",
    },
    {
      icon: "👤",
      title: "Manage My Account",
      desc: "Update profile, address, password or login issues.",
    },
    {
      icon: "🛍️",
      title: "Product & Ordering",
      desc: "Questions about a product, size, or placing an order.",
    },
    {
      icon: "🚚",
      title: "Shipping Information",
      desc: "Delivery timelines, charges and shipping partners.",
    },
  ];

  return (
    <div className="help-page">
      {/* ================= HELP HERO ================= */}
      <section className="help-hero">
        <h1>How Can We Help You?</h1>
        <span>Search for help topics or browse categories below.</span>

        <div className="help-search-box">
          <input
            type="text"
            placeholder="Search your issue, e.g. 'track order'"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="button">Search</button>
        </div>
      </section>

      {/* ================= HELP TOPICS ================= */}
      <section className="help-topics-section">
        <h2>Browse By Topic</h2>

        <div className="help-topics-grid">
          {helpTopics.map((topic, index) => (
            <div className="help-topic-card" key={index}>
              <div className="help-topic-icon">{topic.icon}</div>
              <h3>{topic.title}</h3>
              <p>{topic.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= STILL NEED HELP ================= */}
      <section className="still-help-section">
        <div className="still-help-container">
          {/* Left: quick contact options */}
          <div className="quick-contact-box">
            <h2>Still Need Help?</h2>
            <p>Reach out to us directly using any of the options below.</p>

            <div className="quick-contact-item">
              <div className="quick-contact-icon">📧</div>
              <div>
                <h4>Email Support</h4>
                <span>support@shopcart.com</span>
              </div>
            </div>

            <div className="quick-contact-item">
              <div className="quick-contact-icon">📞</div>
              <div>
                <h4>Call Us</h4>
                <span>+91 98765 43210 (9AM–7PM, Mon–Sat)</span>
              </div>
            </div>

            <div className="quick-contact-item">
              <div className="quick-contact-icon">💬</div>
              <div>
                <h4>Live Chat</h4>
                <span>Chat with our support team instantly</span>
              </div>
            </div>

            <button type="button" className="chat-btn">
              Start Live Chat
            </button>
          </div>

          {/* Right: support form */}
          <div className="support-form-box">
            <h3>Raise A Support Request</h3>

            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <input
                type="text"
                name="orderId"
                placeholder="Order ID (optional)"
                value={formData.orderId}
                onChange={handleChange}
              />

              <textarea
                rows="5"
                name="message"
                placeholder="Describe your issue"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>

              <button type="submit">Submit Request</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
