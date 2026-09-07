import { Link } from "react-router-dom";
import "./About.css";

const About = () => {
  return (
    <div className="about-page">
      {/* ================= ABOUT HERO ================= */}
      <section className="about-hero">
        <p className="about-hero-label">ABOUT US</p>
        <h1>Making Everyday Shopping Simple</h1>
        <span>
          ShopCart brings quality products, great deals and a smooth shopping
          experience — all in one place.
        </span>
      </section>

      {/* ================= OUR STORY ================= */}
      <section className="story-section">
        <div className="story-content">
          <div className="story-image">
          </div>

          <div className="story-text">
            <p className="section-label">OUR STORY</p>

            <h2>Built To Make Shopping Effortless</h2>

            <p>
              ShopCart started with a simple idea — online shopping should be
              easy, reliable and enjoyable. We noticed people struggling with
              cluttered stores, confusing checkouts and unreliable delivery,
              so we built a platform that puts the customer first.
            </p>

            <p>
              Today, ShopCart brings together electronics, fashion, home
              essentials, beauty products and more — all curated for quality
              and value, delivered right to your doorstep.
            </p>

            <Link to="/allProducts" className="story-btn">
              Explore Our Products →
            </Link>
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-box">
            <h3>10K+</h3>
            <span>Happy Customers</span>
          </div>

          <div className="stat-box">
            <h3>500+</h3>
            <span>Products Listed</span>
          </div>

          <div className="stat-box">
            <h3>8+</h3>
            <span>Categories</span>
          </div>

          <div className="stat-box">
            <h3>4.9★</h3>
            <span>Average Rating</span>
          </div>
        </div>
      </section>

      {/* ================= OUR VALUES ================= */}
      <section className="values-section">
        <div className="section-heading">
          <p>WHAT WE STAND FOR</p>
          <h2>Our Core Values</h2>
        </div>

        <div className="values-grid">
          <div className="value-card">
            <div className="value-icon">🎯</div>
            <h3>Customer First</h3>
            <p>
              Every decision we make starts with one question — does this
              make shopping better for our customers?
            </p>
          </div>

          <div className="value-card">
            <div className="value-icon">✅</div>
            <h3>Quality Assurance</h3>
            <p>
              We carefully select every product to ensure it meets our
              standards before it reaches you.
            </p>
          </div>

          <div className="value-card">
            <div className="value-icon">🤝</div>
            <h3>Trust & Transparency</h3>
            <p>
              Clear pricing, honest descriptions and no hidden surprises —
              that's our promise to you.
            </p>
          </div>

          <div className="value-card">
            <div className="value-icon">🚀</div>
            <h3>Constant Improvement</h3>
            <p>
              We're always listening, learning and improving to give you a
              better shopping experience.
            </p>
          </div>
        </div>
      </section>

      {/* ================= TEAM ================= */}
      <section className="team-section">
        <div className="section-heading">
          <p>THE PEOPLE BEHIND SHOPCART</p>
          <h2>Meet Our Team</h2>
        </div>

        <div className="team-grid">
          <div className="team-card">
            <div className="team-avatar">A</div>
            <h3>Aarav Mehta</h3>
            <span>Founder & CEO</span>
          </div>

          <div className="team-card">
            <div className="team-avatar">S</div>
            <h3>Sneha Kapoor</h3>
            <span>Head of Operations</span>
          </div>

          <div className="team-card">
            <div className="team-avatar">V</div>
            <h3>Vikram Rao</h3>
            <span>Lead Developer</span>
          </div>

          <div className="team-card">
            <div className="team-avatar">N</div>
            <h3>Neha Joshi</h3>
            <span>Customer Support Lead</span>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="about-cta-section">
        <div className="about-cta-content">
          <p>READY TO SHOP?</p>
          <h2>Join Thousands Of Happy Customers</h2>
          <span>Discover quality products at the best prices, today.</span>
        </div>

        <Link to="/allProducts" className="about-cta-btn">
          Start Shopping
        </Link>
      </section>
    </div>
  );
};

export default About;