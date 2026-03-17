import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useState } from "react";

const Cart = () => {
  const { getCartProducts, getCartTotal, addToCart, removeFromCart, deleteFromCart } = useAppContext();
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const cartProducts = getCartProducts();
  const subtotal = getCartTotal();
  const shipping = subtotal > 500 ? 0 : 40;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + shipping + tax;

  if (cartProducts.length === 0) {
    return (
      <div className="empty-cart" id="empty-cart">
        <div className="empty-cart-content">
          <span className="empty-icon">🛒</span>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any items yet.</p>
          <Link to="/products" className="btn-primary">Start Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page" id="cart-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/">Home</Link> / <span>Shopping Cart</span>
      </div>

      <h1 className="cart-title">Shopping Cart</h1>

      <div className="cart-layout">
        {/* Cart Items */}
        <div className="cart-items">
          <div className="cart-header-row">
            <span>Product</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Subtotal</span>
            <span></span>
          </div>
          {cartProducts.map((item) => (
            <div className="cart-item" key={item.id} id={`cart-item-${item.id}`}>
              <div className="cart-item-product">
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  <span className="cart-item-category">{item.category}</span>
                </div>
              </div>
              <div className="cart-item-price">₹{item.price}</div>
              <div className="cart-item-qty">
                <button className="qty-btn" onClick={() => removeFromCart(item.id)}>−</button>
                <span className="qty-value">{item.quantity}</span>
                <button className="qty-btn" onClick={() => addToCart(item.id)}>+</button>
              </div>
              <div className="cart-item-subtotal">₹{item.price * item.quantity}</div>
              <button className="cart-item-remove" onClick={() => deleteFromCart(item.id)} title="Remove item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="3,6 5,6 21,6" />
                  <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6M8,6V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2V6" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="order-summary" id="order-summary">
          <h3>Order Summary</h3>

          {/* Delivery Address */}
          <div className="summary-section">
            <h4>Delivery Address</h4>
            <div className="address-input">
              <textarea placeholder="Enter your delivery address..." className="address-textarea" id="delivery-address" />
            </div>
          </div>

          {/* Payment Method */}
          <div className="summary-section">
            <h4>Payment Method</h4>
            <label className="payment-option">
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>Cash on Delivery</span>
            </label>
            <label className="payment-option">
              <input
                type="radio"
                name="payment"
                value="online"
                checked={paymentMethod === "online"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>Online Payment</span>
            </label>
          </div>

          {/* Price Breakdown */}
          <div className="summary-section price-breakdown">
            <div className="price-row">
              <span>Price ({cartProducts.length} items)</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="price-row">
              <span>Shipping</span>
              <span className={shipping === 0 ? "free-text" : ""}>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
            </div>
            <div className="price-row">
              <span>Tax (5%)</span>
              <span>₹{tax}</span>
            </div>
            <div className="price-row total-row">
              <span>Total Amount</span>
              <span>₹{total}</span>
            </div>
          </div>

          <button className="btn-place-order" id="place-order-btn">
            Place Order
          </button>
          {shipping === 0 && (
            <p className="free-shipping-note">🎉 You qualify for free shipping!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
