import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useAppContext();

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalf = rating - fullStars >= 0.5;
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<span key={i} className="star filled">★</span>);
      } else if (i === fullStars && hasHalf) {
        stars.push(<span key={i} className="star half">★</span>);
      } else {
        stars.push(<span key={i} className="star empty">★</span>);
      }
    }
    return stars;
  };

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="product-card" id={`product-${product.id}`}>
      <Link to={`/products/${product.category.toLowerCase().replace(/\s/g, "-")}/${product.id}`} className="product-image-link">
        <div className="product-image-wrapper">
          <img src={product.image} alt={product.name} className="product-image" loading="lazy" />
          {discount > 0 && <span className="discount-badge">-{discount}%</span>}
        </div>
      </Link>
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <Link to={`/products/${product.category.toLowerCase().replace(/\s/g, "-")}/${product.id}`}>
          <h3 className="product-name">{product.name}</h3>
        </Link>
        <div className="product-rating">
          {renderStars(product.rating)}
          <span className="rating-count">({product.rating})</span>
        </div>
        <div className="product-price-row">
          <div className="price-group">
            <span className="current-price">₹{product.price}</span>
            <span className="original-price">₹{product.originalPrice}</span>
          </div>
          <button className="add-btn" onClick={() => addToCart(product.id)} title="Add to cart">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
