import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer" id="footer">
      <div className="footer-container">
        <div className="footer-col">
          <div className="footer-logo">
            <span className="logo-icon">🛒</span>
            <span className="logo-text">Grocerify</span>
          </div>
          <p className="footer-desc">
            Freshness You Can Trust, Savings You Will Love! Get fresh groceries
            delivered right to your doorstep.
          </p>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">All Products</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Categories</h4>
          <ul>
            <li><Link to="/products">Organic Veggies</Link></li>
            <li><Link to="/products">Fresh Fruits</Link></li>
            <li><Link to="/products">Cold Drinks</Link></li>
            <li><Link to="/products">Dairy Products</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contact Info</h4>
          <ul>
            <li>📧 support@grocerify.com</li>
            <li>📞 +91 98765 43210</li>
            <li>📍 Mumbai, India</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Grocerify. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
