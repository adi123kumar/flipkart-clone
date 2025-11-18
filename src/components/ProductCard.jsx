import "./ProductCard.css";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`}>
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <h3 className="product-name">{product.name}</h3>
      <p className="product-desc">{product.description}</p>
      <p className="product-price">₹{product.price}</p>
      <button className="add-btn">Add to Cart</button>
    </div>
    </Link>
  );
}
