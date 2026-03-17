import { Link } from "react-router-dom";
import { categories, bestSellers } from "../assets/products";
import ProductCard from "../components/ProductCard";

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section" id="hero">
        <div className="hero-content">
          <p className="hero-tag">🌿 Farm Fresh Goodness</p>
          <h1 className="hero-title">
            Freshness You Can Trust,
            <br />
            <span className="highlight">Savings You Will Love!</span>
          </h1>
          <p className="hero-desc">
            Discover premium quality groceries at unbeatable prices. Fresh from farm
            to your doorstep within hours.
          </p>
          <div className="hero-buttons">
            <Link to="/products" className="btn-primary" id="shop-now-btn">Shop Now</Link>
            <Link to="/products" className="btn-secondary" id="explore-deals-btn">Explore Deals</Link>
          </div>
        </div>
        <div className="hero-image">
          <div className="hero-blob"></div>
          <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&h=500&fit=crop" alt="Fresh groceries" className="hero-img" />
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section" id="categories">
        <div className="section-header">
          <h2>Shop by Category</h2>
          <Link to="/products" className="see-all-link">See All →</Link>
        </div>
        <div className="categories-grid">
          {categories.map((cat) => (
            <Link
              to="/products"
              key={cat.id}
              className="category-card"
              style={{ backgroundColor: cat.color }}
            >
              <span className="category-emoji">{cat.emoji}</span>
              <span className="category-name">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="bestsellers-section" id="best-sellers">
        <div className="section-header">
          <h2>Best Sellers</h2>
          <Link to="/products" className="see-all-link">See All →</Link>
        </div>
        <div className="products-grid">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" id="why-us">
        <h2>Why We Are the Best?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🚀</div>
            <h3>Fastest Delivery</h3>
            <p>Get your groceries delivered in under 30 minutes. We promise speed without compromising freshness.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌱</div>
            <h3>Freshness Guaranteed</h3>
            <p>All products are sourced directly from farms and verified for quality before reaching your doorstep.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>Affordable Prices</h3>
            <p>Enjoy the best quality groceries at prices that won't burn a hole in your pocket. Save every day!</p>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter-section" id="newsletter">
        <div className="newsletter-content">
          <h2>Never Miss a Deal!</h2>
          <p>Subscribe to our newsletter and get exclusive deals, coupons, and updates.</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email address..." className="newsletter-input" id="newsletter-email" />
            <button type="submit" className="btn-primary" id="subscribe-btn">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
