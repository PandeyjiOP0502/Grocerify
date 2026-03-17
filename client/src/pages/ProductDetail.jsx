import { useParams, Link } from "react-router-dom";
import { products } from "../assets/products";
import { useAppContext } from "../context/AppContext";
import { useState } from "react";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart, navigate } = useAppContext();
  const [qty, setQty] = useState(1);

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="not-found-page">
        <h2>Product Not Found</h2>
        <Link to="/products" className="btn-primary">Browse Products</Link>
      </div>
    );
  }

  const relatedProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addToCart(product.id);
    }
  };

  const handleBuyNow = () => {
    for (let i = 0; i < qty; i++) {
      addToCart(product.id);
    }
    navigate("/cart");
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalf = rating - fullStars >= 0.5;
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) stars.push(<span key={i} className="star filled">★</span>);
      else if (i === fullStars && hasHalf) stars.push(<span key={i} className="star half">★</span>);
      else stars.push(<span key={i} className="star empty">★</span>);
    }
    return stars;
  };

  return (
    <div className="product-detail-page" id="product-detail">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/">Home</Link> / <Link to="/products">Products</Link> / <Link to="/products">{product.category}</Link> / <span>{product.name}</span>
      </div>

      <div className="product-detail-container">
        {/* Product Gallery */}
        <div className="product-gallery">
          <div className="main-image-wrapper">
            <img src={product.image} alt={product.name} className="main-image" />
            {discount > 0 && <span className="discount-badge large">-{discount}%</span>}
          </div>
        </div>

        {/* Product Info */}
        <div className="product-detail-info">
          <span className="detail-category">{product.category}</span>
          <h1 className="detail-name">{product.name}</h1>
          <div className="detail-rating">
            {renderStars(product.rating)}
            <span className="rating-text">{product.rating} out of 5</span>
          </div>
          <div className="detail-price">
            <span className="detail-current-price">₹{product.price}</span>
            <span className="detail-original-price">₹{product.originalPrice}</span>
            <span className="detail-savings">You save ₹{product.originalPrice - product.price}</span>
          </div>
          <p className="detail-unit">Unit: {product.unit}</p>
          <p className="detail-description">{product.description}</p>

          <div className="detail-features">
            <h3>About Product</h3>
            <ul>
              {product.features.map((f, i) => (
                <li key={i}>✓ {f}</li>
              ))}
            </ul>
          </div>

          {/* Quantity + Actions */}
          <div className="detail-actions">
            <div className="qty-selector">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="qty-btn">−</button>
              <span className="qty-value">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="qty-btn">+</button>
            </div>
            <button className="btn-add-cart" onClick={handleAddToCart} id="add-to-cart-btn">
              Add to Cart
            </button>
            <button className="btn-buy-now" onClick={handleBuyNow} id="buy-now-btn">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="related-section">
          <h2>Related Products</h2>
          <div className="products-grid">
            {relatedProducts.map((p) => (
              <div className="product-card" key={p.id}>
                <Link to={`/products/${p.category.toLowerCase().replace(/\s/g, "-")}/${p.id}`} className="product-image-link">
                  <div className="product-image-wrapper">
                    <img src={p.image} alt={p.name} className="product-image" loading="lazy" />
                  </div>
                </Link>
                <div className="product-info">
                  <span className="product-category">{p.category}</span>
                  <h3 className="product-name">{p.name}</h3>
                  <div className="product-price-row">
                    <span className="current-price">₹{p.price}</span>
                    <span className="original-price">₹{p.originalPrice}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
