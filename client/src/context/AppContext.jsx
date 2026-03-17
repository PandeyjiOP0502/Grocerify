import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { products } from "../assets/products";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("grocerify_cart");
    return saved ? JSON.parse(saved) : {};
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    localStorage.setItem("grocerify_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (productId) => {
    setCartItems((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      if (updated[productId] > 1) {
        updated[productId] -= 1;
      } else {
        delete updated[productId];
      }
      return updated;
    });
  };

  const deleteFromCart = (productId) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      delete updated[productId];
      return updated;
    });
  };

  const getCartCount = () => {
    return Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);
  };

  const getCartTotal = () => {
    return Object.entries(cartItems).reduce((total, [id, qty]) => {
      const product = products.find((p) => p.id === Number(id));
      return product ? total + product.price * qty : total;
    }, 0);
  };

  const getCartProducts = () => {
    return Object.entries(cartItems)
      .map(([id, qty]) => {
        const product = products.find((p) => p.id === Number(id));
        return product ? { ...product, quantity: qty } : null;
      })
      .filter(Boolean);
  };

  const searchProducts = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      navigate("/products");
    }
  };

  const value = {
    products,
    cartItems,
    addToCart,
    removeFromCart,
    deleteFromCart,
    getCartCount,
    getCartTotal,
    getCartProducts,
    searchQuery,
    setSearchQuery,
    searchProducts,
    showUserMenu,
    setShowUserMenu,
    navigate,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
};

export default AppContext;
