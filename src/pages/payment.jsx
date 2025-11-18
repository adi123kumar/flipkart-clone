import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Payment.css";
import { clearBuyNow } from "../redux/cartSlice";

export default function Payment() {
  const dispatch = useDispatch();

  const buyNowItem = useSelector((state) => state.cart.buyNow);
  const cartItemsRedux = useSelector((state) => state.cart.items || []);

  const items = buyNowItem ? [buyNowItem] : cartItemsRedux;

  const totalPrice = items.reduce(
    (s, i) => s + Number(i.oldPrice || i.price) * Number(i.quantity || 1),
    0
  );

  const totalPayable = items.reduce(
    (s, i) => s + Number(i.price) * Number(i.quantity || 1),
    0
  );

  const totalSavings = totalPrice - totalPayable;

  const [selectedMethod, setSelectedMethod] = useState("upi");
  const [selectedBank, setSelectedBank] = useState("");

  const banks = [
    "State Bank of India",
    "HDFC Bank",
    "ICICI Bank",
    "Kotak Mahindra Bank",
    "Axis Bank"
  ];

  const handlePay = () => {
    dispatch(clearBuyNow());
  };

  return (
    <div className="payment-page">
      <div className="payment-container">
        <div className="payment-left">
          <div className="gift-card-section">
            <div className="gift-left">
              <label>
                <input type="checkbox" /> Use Gift Card
              </label>
              <span>Available Balance ₹44</span>
            </div>
            <button className="add-gift-btn">Add Gift Card</button>
          </div>

          <div className="payment-main">
            <div className="method-list">
              <div
                className={`method-item ${selectedMethod === "upi" ? "active" : ""}`}
                onClick={() => setSelectedMethod("upi")}
              >
                <span>UPI</span>
                <p>Pay by any UPI app</p>
                <small>Get upto ₹50 cashback • 3 offers available</small>
              </div>

              <div
                className={`method-item ${selectedMethod === "card" ? "active" : ""}`}
                onClick={() => setSelectedMethod("card")}
              >
                <span>Credit / Debit / ATM Card</span>
                <p>Add and secure cards as per RBI guidelines</p>
                <small>Get upto 5% cashback • 2 offers available</small>
              </div>

              <div
                className={`method-item ${selectedMethod === "emi" ? "active" : ""}`}
                onClick={() => setSelectedMethod("emi")}
              >
                <span>EMI</span>
                <p>Get Debit and Cardless EMIs on HDFC Bank</p>
              </div>

              <div
                className={`method-item ${selectedMethod === "netbank" ? "active" : ""}`}
                onClick={() => setSelectedMethod("netbank")}
              >
                <span>Net Banking</span>
              </div>

              <div
                className={`method-item ${selectedMethod === "cod" ? "active" : ""}`}
                onClick={() => setSelectedMethod("cod")}
              >
                <span>Cash on Delivery</span>
              </div>
            </div>

            <div className="method-details">
              {selectedMethod === "upi" && (
                <div className="method-box">
                  <h4>Add new UPI ID</h4>
                  <label>UPI ID</label>
                  <div className="upi-input">
                    <input type="text" placeholder="example@upi" />
                    <button className="verify-btn">Verify</button>
                  </div>
                  <button className="pay-btn" onClick={handlePay}>
                    Pay ₹{totalPayable.toLocaleString()}
                  </button>
                </div>
              )}

              {selectedMethod === "card" && (
                <div className="method-box">
                  <p className="note">Note: Please ensure your card can be used for online transactions.</p>
                  <input type="text" placeholder="XXXX XXXX XXXX XXXX" className="card-input" />
                  <div className="card-row">
                    <input type="text" placeholder="MM / YY" />
                    <input type="text" placeholder="CVV" />
                  </div>
                  <button className="pay-btn" onClick={handlePay}>
                    Pay ₹{totalPayable.toLocaleString()}
                  </button>
                </div>
              )}

              {selectedMethod === "emi" && (
                <div className="method-box">
                  <p>Get flexible EMI plans based on your bank</p>
                  <button className="pay-btn" onClick={handlePay}>
                    Pay ₹{totalPayable.toLocaleString()}
                  </button>
                </div>
              )}

              {selectedMethod === "netbank" && (
                <div className="method-box">
                  <h4>Select Bank</h4>
                  <div className="bank-list">
                    {banks.map((bank) => (
                      <label key={bank} className="bank-item">
                        <input type="radio" name="bank" onChange={() => setSelectedBank(bank)} />
                        {bank}
                      </label>
                    ))}
                  </div>
                  {selectedBank && (
                    <button className="pay-btn" onClick={handlePay}>
                      Pay ₹{totalPayable.toLocaleString()}
                    </button>
                  )}
                </div>
              )}

              {selectedMethod === "cod" && (
                <div className="method-box">
                  <p>41,175 people used online payment options in the last hour. Pay online now for safe and contactless delivery.</p>
                  <button className="place-order-btn" onClick={handlePay}>
                    Place Order
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="payment-right">
          <div className="secure-text">100% Secure</div>
          <div className="price-box">
            <h3>Price Details</h3>

            <div className="price-row">
              <span>Price ({items.length} item)</span>
              <span>₹{totalPrice.toLocaleString()}</span>
            </div>

            <div className="price-row">
              <span>Discount</span>
              <span className="discount">-₹{totalSavings.toLocaleString()}</span>
            </div>

            <hr />

            <div className="price-row total">
              <span>Total Amount</span>
              <span>₹{totalPayable.toLocaleString()}</span>
            </div>
          </div>

          <div className="offer-box">
            <p>₹400 Off</p>
            <span>Claim now with payment offers</span>
          </div>

          <div className="timer-box">
            <span>2 h : 23 m</span>
          </div>
        </div>
      </div>
    </div>
  );
}
