import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import products2 from "../data/products2";
import "./ProductList.css";

export default function Products() {
  const [category, setCategory] = useState("All");
  const [ratingFilter, setRatingFilter] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [discountFilter, setDiscountFilter] = useState("none");
  const [sortBy, setSortBy] = useState("popularity");
  const [page, setPage] = useState(1);

  const categories = ["All", "Mobiles", "Laptops", "Smartwatches", "Audio"];

  const filteredSorted = useMemo(() => {
    let list = [...products2];

    if (category !== "All") list = list.filter((p) => p.category === category);
    if (ratingFilter !== "All") list = list.filter((p) => p.rating >= Number(ratingFilter));
    if (minPrice) list = list.filter((p) => p.price >= Number(minPrice));
    if (maxPrice) list = list.filter((p) => p.price <= Number(maxPrice));
    if (discountFilter === "20") list = list.filter((p) => p.discount >= 20);
    if (discountFilter === "40") list = list.filter((p) => p.discount >= 40);

    if (sortBy === "priceLow") list.sort((a, b) => a.price - b.price);
    if (sortBy === "priceHigh") list.sort((a, b) => b.price - a.price);
    if (sortBy === "rating") list.sort((a, b) => b.rating - a.rating);

    return list;
  }, [category, ratingFilter, minPrice, maxPrice, discountFilter, sortBy]);

  const perPage = 8;
  const totalPages = Math.max(1, Math.ceil(filteredSorted.length / perPage));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * perPage;
  const currentItems = filteredSorted.slice(start, start + perPage);

  const applyPrice = () => setPage(1);

  return (
    <div className="products-page">
      <div className="products-container">
        
        <div className="filters-panel">
          <h3 className="filters-title">Filters</h3>

          <div className="filter-block">
            <div className="filter-label">Category</div>
            <select
              className="filter-select"
              value={category}
              onChange={(e) => { setCategory(e.target.value); setPage(1); }}
            >
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="filter-block">
            <div className="filter-label">Rating</div>
            <select   
              className="filter-select"
              value={ratingFilter}
              onChange={(e) => { setRatingFilter(e.target.value); setPage(1); }}
            >
              <option value="All">All Ratings</option>
              <option value="4">4★ & above</option>
              <option value="3">3★ & above</option>
            </select>
          </div>

          <div className="filter-block">
            <div className="filter-label">Price Range</div>
            <div className="price-inputs">
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
              <span>-</span>
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
            <button className="apply-btn" onClick={applyPrice}>Apply</button>
          </div>

          <div className="filter-block">
            <div className="filter-label">Discount</div>
            <div className="discount-options">
              <label>
                <input
                  type="radio"
                  name="d"
                  value="none"
                  checked={discountFilter === "none"}
                  onChange={(e) => { setDiscountFilter(e.target.value); setPage(1); }}
                />
                None
              </label>
              <label>
                <input
                  type="radio"
                  name="d"
                  value="20"
                  checked={discountFilter === "20"}
                  onChange={(e) => { setDiscountFilter(e.target.value); setPage(1); }}
                />
                20% or more
              </label>
              <label>
                <input
                  type="radio"
                  name="d"
                  value="40"
                  checked={discountFilter === "40"}
                  onChange={(e) => { setDiscountFilter(e.target.value); setPage(1); }}
                />
                40% or more
              </label>
            </div>
          </div>
        </div>

        <div className="products-main">
          <div className="products-list">
            
            <div className="results-row inside-box">
              <div className="sort-tabs">
                <button className={sortBy === "popularity" ? "sort-tab active" : "sort-tab"} onClick={() => setSortBy("popularity")}>Popularity</button>
                <button className={sortBy === "priceLow" ? "sort-tab active" : "sort-tab"} onClick={() => setSortBy("priceLow")}>Price — Low to High</button>
                <button className={sortBy === "priceHigh" ? "sort-tab active" : "sort-tab"} onClick={() => setSortBy("priceHigh")}>Price — High to Low</button>
                <button className={sortBy === "rating" ? "sort-tab active" : "sort-tab"} onClick={() => setSortBy("rating")}>Rating</button>
              </div>

              <div className="results-count">{filteredSorted.length} results</div>
            </div>

            {currentItems.map((p) => (
              <Link to={`/product/${p.id}`} key={p.id} className="product-row-link">
                <div className="product-row">
                  
                  <div className="product-image-wrap">
                    <img src={p.image} alt={p.name} />
                  </div>

                  <div className="product-info-block">
                    <h3 className="product-name">{p.name}</h3>
                    <div className="category-text">{p.category}</div>

                    <div className="rating-row">
                      <span className="rating-badge">{p.rating.toFixed(1)} ★</span>
                      <span className="rating-count">{p.ratingCount.toLocaleString()} Ratings</span>
                    </div>

                    <ul className="spec-list">
                      {p.highlights.map((h, idx) => (
                        <li key={idx}>{h}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="price-block">
                    <div className="current-price">₹{p.price.toLocaleString()}</div>
                    <div className="price-line">
                      <span className="old-price">₹{p.oldPrice.toLocaleString()}</span>
                      <span className="discount-text">{p.discount}% off</span>
                    </div>
                  </div>

                </div>
              </Link>
            ))}
          </div>

          <div className="pagination">
            <button disabled={currentPage === 1} onClick={() => setPage((p) => p - 1)} className="page-btn">Prev</button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button key={i} className={currentPage === i + 1 ? "page-btn active" : "page-btn"} onClick={() => setPage(i + 1)}>
                {i + 1}
              </button>
            ))}
            <button disabled={currentPage === totalPages} onClick={() => setPage((p) => p + 1)} className="page-btn">Next</button>
          </div>

        </div>
      </div>
    </div>
  );
}
