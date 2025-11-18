import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import products from "../data/products";
import products2 from "../data/products2";
import "./ProductDetail.css";
import CategoryBar from "../components/categorybar";
import { useDispatch } from "react-redux";
import { addToCart, setBuyNow } from "../redux/cartSlice";

export default function ProductDetails() {
  const { id } = useParams();
  const allProducts = [...products, ...products2];
  const product = allProducts.find((p) => p.id === parseInt(id));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!product) return <h2 style={{ padding: 30 }}>Product not found</h2>;

  const images = product.images || (product.image ? [product.image] : []);
  const [mainImg, setMainImg] = useState(images[0] || product.image || "");
  const [exchangeApplied, setExchangeApplied] = useState(false);
  const exchangeDeduction = 500;
  const finalPrice = exchangeApplied
    ? Number(product.price) - exchangeDeduction
    : Number(product.price);

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, price: finalPrice, quantity: 1 }));
  };

  const handleBuyNow = () => {
    dispatch(setBuyNow({ ...product, price: finalPrice, quantity: 1 }));
    navigate("/checkout");
  };

  return (
    <div className="product-page">
      <CategoryBar variant="product" showicons={false} />

      <div className="product-container">
        <div className="left-column">

          <div className="image-thumbnails">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="thumb"
                onClick={() => setMainImg(img)}
                className={`thumb-img ${mainImg === img ? "active-thumb" : ""}`}
              />
            ))}
          </div>

          <div className="main-image">
            <img src={mainImg} alt={product.name} />

            <div className="button-row">
              <button className="cart-btn" onClick={handleAddToCart}>
                🛒 ADD TO CART
              </button>
              <button className="buy-btn" onClick={handleBuyNow}>
                ⚡ BUY NOW
              </button>
            </div>
          </div>
        </div>

        <div className="right-column">

          <div className="title-row">
            <h2 className="product-title">{product.name}</h2>
            <button className="share-btn">➦ Share</button>
          </div>

          <div className="rating-section">
            <span className="rating">{product.rating.toFixed(1)} ★</span>
            <span className="reviews">{product.ratingCount.toLocaleString()} Ratings</span>
            {product.rating > 4 && (
              <img
                src="https://www.adgully.com/img/800/68264_fl.png.jpg"
                alt="assured"
                className="assured-logo"
              />
            )}
          </div>

          <div className="price-block2">
            <div className="product-price">₹{finalPrice.toLocaleString()}</div>
            <div className="old-price">₹{product.oldPrice.toLocaleString()}</div>
            <div className="discount-text">{product.discount}% off</div>
          </div>

          <div className="offers-section">
            <h4>Available offers</h4>
            <ul>
              <li>Bank Offer 5% cashback on Axis Bank Flipkart Debit Card up to ₹750 T&C</li>
              <li>Bank Offer 5% cashback on Flipkart SBI Credit Card upto ₹4,000 per calendar quarter T&C</li>
              <li>Bank Offer Flat ₹50 off on Flipkart Bajaj Finserv Insta EMI Card. Min Booking Amount: ₹2,500 T&C</li>
              <li>Bank Offer 10% off upto ₹1500 on Canara Bank Credit Card and Credit Card EMI. Min Txn Value: ₹4,990 T&C</li>
            </ul>
          </div>

          <div className="delivery-seller">
            <div className="delivery-block">
              <div className="delivery-label">Delivery</div>
              <div className="delivery">{product.delivery}</div>
            </div>

            <div className="seller-block">
              <div className="seller-label">Seller</div>
              <div className="seller-name">
                {product.seller}
                <span className="seller-rating">4.3★</span>
              </div>
              <div className="seller-details">
                7 Days Brand Support • GST invoice available
              </div>
            </div>
          </div>

          <div className="price-options">
            <div className="option">
              <input
                type="radio"
                name="buy"
                checked={!exchangeApplied}
                onChange={() => setExchangeApplied(false)}
              />
              Buy without Exchange ₹{product.price}
            </div>

            <div className="option">
              <input
                type="radio"
                name="buy"
                checked={exchangeApplied}
                onChange={() => setExchangeApplied(true)}
              />
              Buy with Exchange — ₹{finalPrice}
            </div>
          </div>

          <div className="highlights-section">
            <h4>Highlights</h4>
            <ul>
              {product.highlights.map((h, idx) => (
                <li key={idx}>{h}</li>
              ))}
            </ul>
          </div>

          <div className="description-section">
            <h4>Description</h4>
            <p>{product.description}</p>
          </div>

        </div>
      </div>
    </div>
  );
}
