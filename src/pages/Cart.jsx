import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity, saveForLater, moveToCart, removeSaved } from "../redux/cartSlice";
import { Link } from "react-router-dom";
import "./Cart.css";

export default function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items || []);
  const savedItems = useSelector((state) => state.cart.saved || []);

  const totalPrice = cartItems.reduce((sum, i) => sum + i.oldPrice * i.quantity, 0);
  const totalPayable = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const totalSavings = totalPrice - totalPayable;

  if (cartItems.length === 0 && savedItems.length === 0)
    return <h2 className="empty-cart">Your cart is empty</h2>;

  return (
    <div className="cart-page">
      <div className="cart-body">
        <div className="cart-left">
          <div className="cart-header">
            <h3>From Saved Addresses</h3>
            <button className="pincode-btn">Enter Delivery Pincode</button>
          </div>

          <div className="cart-items-section">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="product-image-section">
                  <img src={item.image} alt={item.name} className="product-image" />
                  <div className="quantity-controls">
                    <button
                      onClick={() =>
                        dispatch(updateQuantity({ id: item.id, qty: item.quantity - 1 }))
                      }
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        dispatch(updateQuantity({ id: item.id, qty: item.quantity + 1 }))
                      }
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="product-info-section">
                  <h4 className="product-name">
                    {item.name} <span className="delivery">{item.delivery}</span>
                  </h4>
                  <p className="seller">
                    Seller: {item.seller}
                    <img
                      src="https://www.adgully.com/img/800/68264_fl.png.jpg"
                      alt="assured"
                      className="assured-logo"
                    />
                  </p>
                  <p className="price-section">
                    <span className="old-price">₹{item.oldPrice.toLocaleString()}</span>
                    <span className="new-price">₹{item.price.toLocaleString()}</span>
                    <span className="discount">{item.discount}</span>
                  </p>
                  <div className="action-buttons">
                    <button onClick={() => dispatch(saveForLater(item.id))} className="save-btn">
                      Save for later
                    </button>
                    <button onClick={() => dispatch(removeFromCart(item.id))} className="remove-btn">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="place-order-container">
            <Link to={cartItems.length > 0 ? "/checkout" : "#"}>
              <button
                className="place-order-btn"
                disabled={cartItems.length === 0}
                style={cartItems.length === 0 ? { opacity: 0.5, cursor: "not-allowed" } : {}}
              >
                PLACE ORDER
              </button>
            </Link>
          </div>

          {savedItems.length > 0 && (
            <div className="saved-for-later">
              <h3>Saved for later</h3>
              {savedItems.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div className="product-image-section">
                    <img src={item.image} alt={item.name} className="product-image" />
                  </div>

                  <div className="product-info-section">
                    <h4 className="product-name">{item.name}</h4>
                    <p className="price-section">
                      <span className="old-price">₹{item.oldPrice.toLocaleString()}</span>
                      <span className="new-price">₹{item.price.toLocaleString()}</span>
                      <span className="discount">{item.discount}</span>
                    </p>

                    <div className="action-buttons">
                      <button
                        onClick={() => dispatch(moveToCart(item))}
                        className="save-btn"
                      >
                        Move to Cart
                      </button>

                      <button
                        onClick={() => dispatch(removeSaved(item.id))}
                        className="remove-btn"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="cart-right">
          <div className="price-box">
            <h3>PRICE DETAILS</h3>
            <div className="price-row">
              <span>Price</span>
              <span>₹{totalPrice.toLocaleString()}</span>
            </div>
            <div className="price-row">
              <span>Discount</span>
              <span className="discount">-₹{totalSavings.toLocaleString()}</span>
            </div>
            <div className="price-row">
              <span>Delivery</span>
              <span className="free">Free</span>
            </div>
            <hr />
            <div className="total-amount-row">
              <span>Total</span>
              <span>₹{totalPayable.toLocaleString()}</span>
            </div>
            <p className="savings">You saved ₹{totalSavings.toLocaleString()} on this order.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
