import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories, getAllProduct } from "../../api";
import "./Home.css";


function Home() {
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    loadCategories();
    loadFeaturedProducts();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data.data || []);
    } catch (error) {
      console.log("Category Error:", error);
    }
  };

  const loadFeaturedProducts = async () => {
    try {
      const data = await getAllProduct();
      setFeaturedProducts((data.data || []).slice(4, 12));
    } catch (error) {
      console.log("Product Error:", error);
    }
  };

  return (
    <div className="home">
      {/* ================= HERO ================= */}
      <section className="hero-section">
        <Link to="/allProducts" className="view-all">
          <button>Shop Now</button>
        </Link>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="category-section">
        <div className="category-header">
          <h2>Categories</h2>

          <Link to="/allProducts" className="view-all">
            View All →
          </Link>
        </div>

        <div className="category-slider">
          {categories.length > 0 ? (
            categories.map((category) => (
              <Link
                to={`/products/category/${category._id}`}
                className="category-card"
                key={category._id}
              >
                <div className="category-image">
                  <img src={category.image} alt={category.name} />
                </div>

                <h3>{category.name}</h3>
              </Link>
            ))
          ) : (
            <p className="loading-text">Loading categories...</p>
          )}
        </div>
      </section>

      {/* ================= FEATURED PRODUCTS ================= */}
      <section className="featured-section">
        <div className="category-header">
          <h2>Featured Products</h2>

          <Link to="/allProducts" className="view-all">
            View All →
          </Link>
        </div>

        <div className="featured-grid">
          {featuredProducts.length > 0 ? (
            featuredProducts.map((product) => (
              <Link
                to={`/product/${product._id}`}
                className="featured-card"
                key={product._id}
              >
                <div className="featured-image">
                  {product.discount && (
                    <span className="discount-badge">
                      {product.discount}% OFF
                    </span>
                  )}

                  <button
                    className="wishlist-btn"
                    onClick={(e) => e.preventDefault()}
                    aria-label="Add to wishlist"
                  >
                    🤍
                  </button>

                  <img src={product.image} alt={product.name} />
                </div>

                <div className="featured-info">
                  <div className="featured-top-row">
                    <h3>{product.name}</h3>

                    <span className="featured-rating">
                      ★ {product.rating || "4.9"}
                    </span>
                  </div>

                  <span className="featured-price">₹{product.price}</span>
                </div>
              </Link>
            ))
          ) : (
            <p className="loading-text">Loading products...</p>
          )}
        </div>
      </section>

      {/* ================= WHY SHOPCART ================= */}
      <section className="features-section">
        <div className="section-heading">
          <p>WHY SHOPCART</p>
          <h2>Shopping Made Simple</h2>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🚚</div>
            <h3>Fast Delivery</h3>
            <p>
              Get your favorite products delivered quickly and safely to your
              doorstep.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure Shopping</h3>
            <p>
              Your information and shopping experience are kept safe and secure.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⭐</div>
            <h3>Quality Products</h3>
            <p>
              Explore products selected to give you a great shopping experience.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💬</div>
            <h3>Easy Support</h3>
            <p>Have questions? Our support is always ready to help you.</p>
          </div>
        </div>
      </section>

      {/* ================= ABOUT SHOPCART ================= */}
      <section id="about" className="about-section">
        <div className="about-content">
          <div className="about-text">
            <p className="about-small-title">ABOUT SHOPCART</p>

            <h2>
              Your Everyday Shopping,
              <br />
              Made Simple.
            </h2>

            <p>
              ShopCart is your one-stop destination for quality products, great
              deals and a smooth online shopping experience.
            </p>

            <p>
              From electronics and fashion to beauty, groceries and everyday
              essentials, we bring everything together in one convenient place.
            </p>

            <Link to="/allProducts" className="about-btn">
              Start Shopping →
            </Link>

            {/* Stats row */}
            <div className="about-stats">
              <div className="about-stat">
                <h4>10K+</h4>
                <span>Happy Customers</span>
              </div>

              <div className="about-stat">
                <h4>500+</h4>
                <span>Products</span>
              </div>

              <div className="about-stat">
                <h4>4.9★</h4>
                <span>Average Rating</span>
              </div>
            </div>
          </div>

          <div className="about-cards">
            <div className="about-info-card">
              <div className="about-info-icon">🛍️</div>
              <h3>Wide Collection</h3>
              <p>Discover products across multiple categories.</p>
            </div>

            <div className="about-info-card">
              <div className="about-info-icon">💰</div>
              <h3>Best Deals</h3>
              <p>Find amazing products at affordable prices.</p>
            </div>

            <div className="about-info-card">
              <div className="about-info-icon">❤️</div>
              <h3>Happy Customers</h3>
              <p>We focus on making every shopping experience better.</p>
            </div>

            <div className="about-info-card">
              <div className="about-info-icon">⚡</div>
              <h3>Easy Shopping</h3>
              <p>Simple browsing, quick checkout and easy ordering.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="testimonials-section">
        <div className="section-heading">
          <p>TESTIMONIALS</p>
          <h2>What Our Customers Say</h2>
        </div>

        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-rating">★★★★★</div>

            <p className="testimonial-text">
              “Amazing quality and super fast delivery. ShopCart has become my
              go-to place for everything I need.”
            </p>

            <div className="testimonial-user">
              <div className="testimonial-avatar">P</div>

              <div>
                <h4>Priya Sharma</h4>
                <span>Verified Buyer</span>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-rating">★★★★★</div>

            <p className="testimonial-text">
              “Great prices, easy checkout and the products always match the
              photos. Highly recommend ShopCart!”
            </p>

            <div className="testimonial-user">
              <div className="testimonial-avatar">R</div>

              <div>
                <h4>Rahul Verma</h4>
                <span>Verified Buyer</span>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-rating">★★★★★</div>

            <p className="testimonial-text">
              “Customer support helped me instantly with my order. Smooth
              experience from start to finish.”
            </p>

            <div className="testimonial-user">
              <div className="testimonial-avatar">A</div>

              <div>
                <h4>Ananya Patel</h4>
                <span>Verified Buyer</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="cta-section">
        <div className="cta-content">
          <p>READY TO SHOP?</p>
          <h2>Find Something You’ll Love</h2>
          <span>Explore our products and start shopping today.</span>

          <div className="cta-badges">
            <div className="cta-badge">
              <span className="badge-icon">🚚</span>
              Free Delivery
            </div>

            <div className="cta-badge">
              <span className="badge-icon">🔒</span>
              Secure Payment
            </div>

            <div className="cta-badge">
              <span className="badge-icon">⭐</span>
              4.9 Rating
            </div>
          </div>
        </div>

        <div className="cta-action">
          <Link to="/allProducts" className="cta-btn">
            Explore Products
          </Link>

          <Link to="/contact" className="cta-secondary-link">
            or Contact Us →
          </Link>
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section className="contact-section">
        <div className="contact-heading">
          <p>CONTACT US</p>
          <h2>We’re Here To Help</h2>
          <span>Have a question? Get in touch with us.</span>
        </div>

        <div className="contact-container">
          <div className="contact-info">
            <h2>Get In Touch</h2>

            <p>
              Have questions about your order, products or anything else? Feel
              free to contact us.
            </p>

            <div className="contact-item">
              <div className="contact-icon">📧</div>

              <div>
                <h4>Email</h4>
                <p>support@shopcart.com</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">📞</div>

              <div>
                <h4>Phone</h4>
                <p>+91 98765 43210</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">📍</div>

              <div>
                <h4>Location</h4>
                <p>India</p>
              </div>
            </div>
          </div>

          <div className="contact-form">
            <form>
              <div className="form-row">
                <input type="text" placeholder="Your Name" />

                <input type="email" placeholder="Your Email" />
              </div>

              <input type="text" placeholder="Subject" />

              <textarea rows="6" placeholder="Your Message"></textarea>

              <button type="submit">Send Message</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
