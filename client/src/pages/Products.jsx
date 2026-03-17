import { useState, useMemo } from "react";
import { useAppContext } from "../context/AppContext";
import { categories, products } from "../assets/products";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const { searchQuery } = useAppContext();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (selectedCategory !== "All") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    switch (sortBy) {
      case "price-low":
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered = [...filtered].sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return filtered;
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="products-page" id="products-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <a href="/">Home</a> / <span>All Products</span>
      </div>

      <div className="products-layout">
        {/* Sidebar */}
        <aside className="products-sidebar" id="sidebar">
          <h3>Categories</h3>
          <ul className="category-list">
            <li>
              <button
                className={selectedCategory === "All" ? "active" : ""}
                onClick={() => setSelectedCategory("All")}
              >
                All Products
              </button>
            </li>
            {categories.map((cat) => (
              <li key={cat.id}>
                <button
                  className={selectedCategory === cat.name ? "active" : ""}
                  onClick={() => setSelectedCategory(cat.name)}
                >
                  {cat.emoji} {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Products Grid */}
        <div className="products-main">
          <div className="products-topbar">
            <p className="results-count">
              Showing <strong>{filteredProducts.length}</strong> products
            </p>
            <select
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              id="sort-select"
            >
              <option value="default">Sort by: Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating: Highest</option>
            </select>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <p className="no-results-emoji">🔍</p>
              <h3>No products found</h3>
              <p>Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
