import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import products from "../data/products";
import products2 from "../data/products2";
import "./ProductDetail.css";
import CategoryBar from "../components/categorybar";
import { useDispatch } from "react-redux";
import { addToCart, setBuyNow } from "../redux/cartSlice";
import { toast } from "react-toastify";

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
    toast.success("Added to Cart");
  };

  const handleBuyNow = () => {
    dispatch(setBuyNow({ ...product, price: finalPrice, quantity: 1 }));
    toast.success("Redirecting to Checkout");
    navigate("/checkout");
  };

  return (
    <div className="product-page">
      <CategoryBar variant="product" showicons={false} />

      <div className="product-container">
        <div className="thumb-column">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt="thumb"
              className={`thumb-img ${mainImg === img ? "active-thumb" : ""}`}
              onClick={() => setMainImg(img)}
            />
          ))}
        </div>

        <div className="image-column">
          <img src={mainImg} alt={product.name} className="main-image" />

          <div className="button-row">
            <button className="cart-btn" onClick={handleAddToCart}>
              🛒 ADD TO CART
            </button>
            <button className="buy-btn" onClick={handleBuyNow}>
              ⚡ BUY NOW
            </button>
          </div>
        </div>

        <div className="right-column">
          <div className="title-row">
            <h2 className="product-title">{product.name}</h2>
            <button className="share-btn">➦ Share</button>
          </div>

          <div className="rating-section">
            <span className="rating">{product.rating.toFixed(1)} ★</span>
            <span className="reviews">
              {product.ratingCount.toLocaleString()} Ratings
            </span>
            {product.rating > 4 && (
              <img
                src="https://www.adgully.com/img/800/68264_fl.png.jpg"
                alt="assured"
                className="assured-logo"
              />
            )}
          </div>

          <div className="price-block2">
            <div className="product-price">
              ₹{finalPrice.toLocaleString()}
            </div>
            <div className="old-price">
              ₹{product.oldPrice.toLocaleString()}
            </div>
            <div className="discount-text">{product.discount}% off</div>
          </div>

          <div className="fee-delivery-inline">
            <div className="protect-fee">+ ₹19 Protect Promise Fee <span className="learn-link">Learn more</span></div>
            <div className="secure-delivery">Secure delivery by {product.delivery}</div>
          </div>

          <div className="offers-section">
            <h4>Available offers</h4>
            <ul>
              <li>
                <span className="offer-icon" aria-hidden>✔</span>
                <span className="offer-text">Bank Offer5% cashback on Axis Bank Flipkart Debit Card up to ₹750</span>
                <span className="tc">T&C</span>
              </li>
              <li>
                <span className="offer-icon" aria-hidden>✔</span>
                <span className="offer-text">Bank Offer5% cashback on Flipkart SBI Credit Card upto ₹4,000 per calendar quarter</span>
                <span className="tc">T&C</span>
              </li>
              <li>
                <span className="offer-icon" aria-hidden>✔</span>
                <span className="offer-text">Bank OfferFlat ₹50 off on Flipkart Bajaj Finserv Insta EMI Card. Min Booking Amount: ₹2,500</span>
                <span className="tc">T&C</span>
              </li>
              <li>
                <span className="offer-icon" aria-hidden>✔</span>
                <span className="offer-text">Special PriceGet extra 90% off</span>
                <span className="tc">T&C</span>
              </li>
            </ul>
          </div>

          <div className="delivery-seller">
            <div className="delivery-block">
              <div className="delivery-label">Delivery</div>
              <div className="delivery">{product.delivery}</div>
            </div>

            <div className="seller-block">
              <div className="seller-label">Seller:</div>
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
