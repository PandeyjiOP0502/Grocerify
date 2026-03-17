import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const { getCartCount, searchQuery, searchProducts, setSearchQuery } = useAppContext();
  const [mobileMenu, setMobileMenu] = useState(false);
  const cartCount = getCartCount();

  const handleSearch = (e) => {
    e.preventDefault();
    searchProducts(searchQuery);
  };

  return (
    <nav className="navbar" id="main-nav">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo" id="logo">
          <span className="logo-icon">🛒</span>
          <span className="logo-text">Grocerify</span>
        </Link>

        {/* Search Bar */}
        <form className="navbar-search" onSubmit={handleSearch} id="search-form">
          <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search for groceries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
            id="search-input"
          />
        </form>

        {/* Navigation Links */}
        <div className={`navbar-links ${mobileMenu ? "active" : ""}`}>
          <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={() => setMobileMenu(false)}>
            Home
          </NavLink>
          <NavLink to="/products" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={() => setMobileMenu(false)}>
            All Products
          </NavLink>
          <Link to="/contact" className="nav-link" onClick={() => setMobileMenu(false)}>
            Contact
          </Link>
        </div>

        {/* Right Actions */}
        <div className="navbar-actions">
          <Link to="/cart" className="cart-btn" id="cart-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="cart-icon">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
          <button className="login-btn" id="login-btn">Login</button>

          {/* Mobile Menu Toggle */}
          <button className="mobile-toggle" onClick={() => setMobileMenu(!mobileMenu)} id="mobile-menu-toggle">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
